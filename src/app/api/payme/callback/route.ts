import { NextRequest, NextResponse } from "next/server";
import { generatePaymeSignature, getPaymeConfig } from "@/lib/payme";

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    let body: Record<string, unknown> = {};
    try {
      body = JSON.parse(text);
    } catch {
      // not JSON
    }

    const config = getPaymeConfig();
    const signature =
      req.headers.get("x-middleware-signature") ||
      req.headers.get("x-signature");
    const timestamp = req.headers.get("x-timestamp");

    // Optional verification if signature headers are present
    if (signature && timestamp && config.appSecret) {
      const ts = parseInt(timestamp, 10);
      const expectedFromRaw = generatePaymeSignature(text, ts, config.appSecret);
      const expectedFromMinified = generatePaymeSignature(
        JSON.stringify(body),
        ts,
        config.appSecret
      );

      const isValid =
        signature === expectedFromRaw || signature === expectedFromMinified;

      if (!isValid) {
        console.warn("Payme webhook signature check mismatch:", {
          receivedSignature: signature,
          expectedFromRaw,
          expectedFromMinified,
        });
      }
    }

    const reference = body.reference || body.trans_id || body.order_id;
    const paymentStatus =
      body.payment_status || body.result || body.status || "UNKNOWN";

    console.log("Payme webhook notification received:", {
      reference,
      status: paymentStatus,
      transactionId: body.transid || body.transaction_id,
      amount: body.amount,
      msisdn: body.msisdn,
      providerMessage: body.provider_message || body.message,
    });

    return NextResponse.json({
      received: true,
      reference,
      status: paymentStatus,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error processing webhook";
    console.error("Error processing Payme webhook:", message);
    return NextResponse.json(
      { received: false, error: message },
      { status: 500 }
    );
  }
}
