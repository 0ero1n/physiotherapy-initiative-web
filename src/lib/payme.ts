import crypto from "crypto";

export interface PaymeConfig {
  appId: string;
  appSecret: string;
  baseUrl: string;
  isSandbox: boolean;
  callbackUrl?: string;
}

export interface CollectionParams {
  amount: number; // in TZS integer
  msisdn: string; // international format (e.g. 2557XXXXXXXX)
  reference: string; // unique reference
  callbackUrl?: string;
}

export interface CardCheckoutParams {
  amount: number; // in TZS integer
  reference: string;
  callbackUrl?: string;
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingPhone: string;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingPostcode?: string;
  billingCountry?: string;
}

export interface QueryParams {
  reference: string;
}

export const RATES_TO_TZS: Record<string, number> = {
  TZS: 1,
  USD: 2650,
  EUR: 2850,
  GBP: 3350,
};

export interface PaymeResponse {
  success: boolean;
  reference: string;
  status: "PENDING" | "COMPLETED" | "SUCCESS" | "FAILED" | "CANCELLED" | "ERROR";
  paymentGatewayUrl?: string;
  transactionId?: string;
  amount?: number;
  currency?: string;
  message?: string;
  raw?: unknown;
}

// In-memory simulation cache for local testing / demo when real keys are not provided
const simulatedTransactions: Map<
  string,
  {
    status: "PENDING" | "COMPLETED" | "FAILED";
    createdAt: number;
    amount: number;
    currency: string;
    method: "mobile" | "card";
    msisdn?: string;
    donorName: string;
    cause: string;
  }
> = new Map();

/**
 * Normalizes phone numbers to standard international format without leading '+'
 * e.g. 0765 359 305 -> 255765359305
 */
export function formatPhoneNumber(phone: string, defaultCountryCode = "255"): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("0")) {
    return defaultCountryCode + digits.slice(1);
  }
  if (digits.startsWith(defaultCountryCode)) {
    return digits;
  }
  return digits;
}

/**
 * Gets the current Payme Africa environment configuration
 */
export function getPaymeConfig(): PaymeConfig {
  const appId = process.env.PAYME_APP_ID || "TPI-DONATIONS";
  const appSecret =
    process.env.PAYME_APP_SECRET ||
    "BSdusQLePNilotTrTuuOaZyISC5ZLtwXpMmOWCLLgPo=";
  const baseUrl =
    process.env.PAYME_BASE_URL || "https://portal.paymeafrica.com/api/v1";
  const isSandbox =
    process.env.PAYME_SANDBOX === "1" || process.env.PAYME_SANDBOX === "true";

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "https://physiotherapy-initiative-web--physiotherapy-initiative.us-east4.hosted.app";
  const callbackUrl = `${appUrl.replace(/\/$/, "")}/api/payme/callback`;

  return {
    appId,
    appSecret,
    baseUrl: baseUrl.replace(/\/$/, ""),
    isSandbox,
    callbackUrl,
  };
}

/**
 * Generates HMAC-SHA256 Base64 signature as specified by Payme Africa:
 * Base64(HMAC-SHA256(AppSecret, MinifiedJSONBody + Timestamp))
 */
export function generatePaymeSignature(
  minifiedJsonBody: string,
  timestamp: number,
  secret: string
): string {
  const message = minifiedJsonBody + String(timestamp);
  return crypto.createHmac("sha256", secret).update(message).digest("base64");
}

export interface RawPaymeData {
  status?: string | number;
  payment_status?: string;
  transaction_id?: string;
  id?: string;
  transid?: string;
  amount?: number | string;
  currency?: string;
  message?: string;
  error?: string | number;
  payment_gateway_url?: string;
  checkout_url?: string;
  url?: string;
  provider_message?: string;
  provider_response?: {
    result?: string;
    resultcode?: string;
    message?: string;
    data?: Array<{ payment_gateway_url?: string; [key: string]: unknown }>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Executes an authenticated request to Payme Africa
 */
async function sendPaymeRequest(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<{ status: number; data: RawPaymeData }> {
  const config = getPaymeConfig();
  const url = `${config.baseUrl}${endpoint}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const minifiedBody = JSON.stringify(payload);
  const signature = generatePaymeSignature(
    minifiedBody,
    timestamp,
    config.appSecret
  );

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-App-ID": config.appId,
    "X-Timestamp": String(timestamp),
    "X-Signature": signature,
  };

  if (config.isSandbox) {
    headers["X-Sandbox"] = "1";
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: minifiedBody,
    cache: "no-store",
  });

  const text = await response.text();
  let data: RawPaymeData;
  try {
    data = JSON.parse(text) as RawPaymeData;
  } catch {
    data = { message: text };
  }

  return { status: response.status, data };
}

/**
 * Initiates a Mobile Money collection (M-Pesa, Tigo, Airtel, Halopesa)
 */
export async function initiateMobileCollection(
  params: CollectionParams,
  meta?: { donorName: string; cause: string }
): Promise<PaymeResponse> {
  const config = getPaymeConfig();

  // If live keys are not provided yet, run interactive simulation mode
  if (!config.appId || !config.appSecret) {
    simulatedTransactions.set(params.reference, {
      status: "PENDING",
      createdAt: Date.now(),
      amount: params.amount,
      currency: "TZS",
      method: "mobile",
      msisdn: params.msisdn,
      donorName: meta?.donorName || "Supporter",
      cause: meta?.cause || "General Fund",
    });

    return {
      success: true,
      reference: params.reference,
      status: "PENDING",
      message:
        "USSD prompt initiated. Enter your mobile money PIN on your phone to complete your donation.",
    };
  }

  const payload: Record<string, unknown> = {
    action: "collection",
    amount: Math.round(params.amount),
    msisdn: params.msisdn,
    reference: params.reference,
    callback_url: params.callbackUrl || config.callbackUrl,
  };

  try {
    const { status, data } = await sendPaymeRequest("/transact", payload);

    if (status >= 200 && status < 300) {
      const rawPaymentStatus = String(
        data.payment_status ||
        data.status ||
        "PENDING"
      ).toUpperCase();

      let normalizedStatus: PaymeResponse["status"] = "PENDING";
      if (rawPaymentStatus === "COMPLETED" || rawPaymentStatus === "SUCCESSFUL") {
        normalizedStatus = "COMPLETED";
      } else if (
        rawPaymentStatus === "FAILED" ||
        rawPaymentStatus === "CANCELLED" ||
        rawPaymentStatus === "REJECTED"
      ) {
        normalizedStatus = "FAILED";
      } else {
        normalizedStatus = "PENDING";
      }

      const providerMsg = (data.provider_response as { message?: string })?.message;

      return {
        success: true,
        reference: params.reference,
        status: normalizedStatus,
        transactionId: data.transaction_id || data.id,
        message:
          providerMsg ||
          data.message ||
          "Payment push initiated. Please check your handset to authorize with your PIN.",
        raw: data,
      };
    }

    return {
      success: false,
      reference: params.reference,
      status: "ERROR",
      message:
        data.message ||
        (data.error ? String(data.error) : undefined) ||
        "Could not initiate mobile payment with gateway.",
      raw: data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      reference: params.reference,
      status: "ERROR",
      message:
        error instanceof Error
          ? error.message
          : "Network error connecting to payment gateway.",
    };
  }
}

/**
 * Initiates a Hosted Card Checkout session (Visa, Mastercard)
 */
export async function initiateCardCheckout(
  params: CardCheckoutParams,
  meta?: { donorName: string; cause: string }
): Promise<PaymeResponse> {
  const config = getPaymeConfig();

  // If live keys are not provided yet, run interactive simulation mode
  if (!config.appId || !config.appSecret) {
    simulatedTransactions.set(params.reference, {
      status: "PENDING",
      createdAt: Date.now(),
      amount: params.amount,
      currency: "TZS",
      method: "card",
      donorName: meta?.donorName || "Supporter",
      cause: meta?.cause || "General Fund",
    });

    // Provide simulated test card redirect URL
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "";
    const simulatedGatewayUrl = `${appUrl}/donate/receipt?reference=${encodeURIComponent(
      params.reference
    )}&simulated=1`;

    return {
      success: true,
      reference: params.reference,
      status: "PENDING",
      paymentGatewayUrl: simulatedGatewayUrl,
      message: "Card checkout session prepared.",
    };
  }

  const appUrl =
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://physiotherapy-initiative-web--physiotherapy-initiative.us-east4.hosted.app";

  const redirectUrl = `${appUrl.replace(/\/$/, "")}/donate/receipt?reference=${encodeURIComponent(
    params.reference
  )}`;
  const cancelUrl = `${appUrl.replace(/\/$/, "")}/donate?cancelled=1`;

  const payload: Record<string, unknown> = {
    action: "checkout",
    amount: Math.round(params.amount),
    reference: params.reference,
    callback_url: params.callbackUrl || config.callbackUrl,
    redirect_url: redirectUrl,
    cancel_url: cancelUrl,
    billing_firstname: params.billingFirstName,
    billing_lastname: params.billingLastName,
    billing_email: params.billingEmail,
    billing_phone: params.billingPhone,
    billing_address: params.billingAddress || "Dar es Salaam",
    billing_address_1: params.billingAddress || "Dar es Salaam",
    billing_city: params.billingCity || "Dar es Salaam",
    billing_state_or_region: params.billingState || "Dar es Salaam",
    billing_postcode_or_pobox: params.billingPostcode || "11101",
    billing_country: params.billingCountry || "TZ",
  };

  try {
    const { status, data } = await sendPaymeRequest("/transact", payload);

    if (status >= 200 && status < 300) {
      const rawPaymentStatus = String(
        data.payment_status ||
        data.status ||
        "PENDING"
      ).toUpperCase();

      let normalizedStatus: PaymeResponse["status"] = "PENDING";
      if (rawPaymentStatus === "COMPLETED" || rawPaymentStatus === "SUCCESSFUL") {
        normalizedStatus = "COMPLETED";
      } else if (
        rawPaymentStatus === "FAILED" ||
        rawPaymentStatus === "CANCELLED"
      ) {
        normalizedStatus = "FAILED";
      }

      // Selcom Hosted Checkout returns checkout_url / payment_gateway_url
      const providerData = (
        data.provider_response as {
          data?: Array<{ payment_gateway_url?: string }>;
        }
      )?.data?.[0];

      const gatewayUrl =
        data.checkout_url ||
        data.payment_gateway_url ||
        providerData?.payment_gateway_url ||
        data.url;

      return {
        success: true,
        reference: params.reference,
        status: normalizedStatus,
        paymentGatewayUrl: gatewayUrl,
        transactionId: (data.transaction_id || data.id) as string | undefined,
        message: data.message || "Card checkout initialized.",
        raw: data,
      };
    }

    return {
      success: false,
      reference: params.reference,
      status: "ERROR",
      message:
        data.message ||
        (data.error ? String(data.error) : undefined) ||
        "Could not initialize card checkout.",
      raw: data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      reference: params.reference,
      status: "ERROR",
      message:
        error instanceof Error
          ? error.message
          : "Network error connecting to payment gateway.",
    };
  }
}

/**
 * Queries transaction status via Payme Africa `/api/v1/query`
 */
export async function queryTransactionStatus(
  reference: string
): Promise<PaymeResponse> {
  const config = getPaymeConfig();

  // If running simulation
  if (!config.appId || !config.appSecret) {
    const simulated = simulatedTransactions.get(reference);
    if (!simulated) {
      return {
        success: false,
        reference,
        status: "ERROR",
        message: "Transaction not found.",
      };
    }

    // After 6 seconds, automatically transition from PENDING to COMPLETED for realistic live testing
    const elapsed = Date.now() - simulated.createdAt;
    if (elapsed > 6000 && simulated.status === "PENDING") {
      simulated.status = "COMPLETED";
    }

    return {
      success: true,
      reference,
      status: simulated.status,
      transactionId: `SIM_${reference}`,
      message:
        simulated.status === "COMPLETED"
          ? "Payment received successfully. Thank you for your contribution!"
          : "Waiting for customer authorization on handset...",
      raw: simulated,
    };
  }

  try {
    const { status, data } = await sendPaymeRequest("/query", { reference });

    if (status >= 200 && status < 300) {
      // Prioritize payment_status over HTTP status
      const paymentStatus = String(
        data.payment_status ||
        (data.status !== "SUCCESS" ? data.status : "") ||
        "PENDING"
      ).toUpperCase();

      let normalizedStatus: PaymeResponse["status"] = "PENDING";

      if (
        paymentStatus === "COMPLETED" ||
        paymentStatus === "SUCCESS" ||
        paymentStatus === "SUCCESSFUL"
      ) {
        normalizedStatus = "COMPLETED";
      } else if (
        paymentStatus === "FAILED" ||
        paymentStatus === "REJECTED" ||
        paymentStatus === "EXPIRED"
      ) {
        normalizedStatus = "FAILED";
      } else if (paymentStatus === "CANCELLED") {
        normalizedStatus = "CANCELLED";
      } else {
        normalizedStatus = "PENDING";
      }

      return {
        success: true,
        reference,
        status: normalizedStatus,
        transactionId: (data.transaction_id || data.id || data.transid) as
          | string
          | undefined,
        amount:
          typeof data.amount === "number"
            ? data.amount
            : data.amount
            ? parseFloat(String(data.amount))
            : undefined,
        currency: (data.currency as string) || "TZS",
        message:
          data.provider_message ||
          data.message ||
          (normalizedStatus === "COMPLETED"
            ? "Payment completed successfully."
            : normalizedStatus === "PENDING"
            ? "Awaiting authorization on handset..."
            : `Transaction ${normalizedStatus.toLowerCase()}.`),
        raw: data,
      };
    }

    return {
      success: false,
      reference,
      status: "ERROR",
      message: data.message || "Failed to query transaction status.",
      raw: data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      reference,
      status: "ERROR",
      message:
        error instanceof Error
          ? error.message
          : "Network error querying transaction status.",
    };
  }
}
