"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  CreditCard,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import Hero from "../../components/Hero";
import { APP_INFO } from "../../data/content";

type Currency = "TZS" | "USD";
type PaymentMethod = "mobile" | "card";

const presetAmounts: Record<Currency, number[]> = {
  TZS: [10000, 25000, 50000, 100000, 250000],
  USD: [10, 25, 50, 100, 250],
};

const USD_TO_TZS_RATE = 2650;

const causes = [
  {
    id: "assistive-devices",
    label: "Assistive Devices (Move for Disability 2026)",
    impact: "Sponsors wheelchairs, prosthetics, white canes, and crutches",
  },
  {
    id: "education",
    label: "Physiotherapy Education & Academy Training",
    impact: "Funds clinical workshops and student clinician sponsorships",
  },
  {
    id: "community-outreach",
    label: "Community Clinical Outreach & Rural Screening",
    impact: "Brings certified physiotherapists to underserved health posts",
  },
  {
    id: "general",
    label: "Where Most Needed (General Fund)",
    impact: "Supports ongoing operational and clinical development",
  },
];

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="frame section text-center py-24">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-[#696112] border-t-transparent rounded-full mb-4" />
          <p>Loading donation checkout...</p>
        </div>
      }
    >
      <DonateForm />
    </Suspense>
  );
}

function DonateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCause = searchParams.get("cause") || "general";

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile");
  const [currency, setCurrency] = useState<Currency>("TZS");
  const [amount, setAmount] = useState<string>("50000");
  const [customAmountActive, setCustomAmountActive] = useState<boolean>(false);
  const [cause, setCause] = useState<string>(
    causes.some((c) => c.id === initialCause) ? initialCause : "general"
  );

  // Form Fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("Dar es Salaam");
  const [billingCity, setBillingCity] = useState<string>("Dar es Salaam");

  // Submission & Polling State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeReference, setActiveReference] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<
    "IDLE" | "AWAITING_PIN" | "COMPLETED" | "FAILED"
  >("IDLE");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Update preset amount when currency changes
  const handleCurrencyChange = (newCurr: Currency) => {
    setCurrency(newCurr);
    setAmount(newCurr === "USD" ? "25" : "50000");
    setCustomAmountActive(false);
  };

  // Calculate equivalent in the other currency
  const numAmount = parseFloat(amount) || 0;
  const equivalentAmount =
    currency === "USD"
      ? `${(numAmount * USD_TO_TZS_RATE).toLocaleString()} TZS`
      : `$${(numAmount / USD_TO_TZS_RATE).toFixed(2)} USD`;

  // Poll for Mobile Money status when AWAITING_PIN
  useEffect(() => {
    if (paymentStatus !== "AWAITING_PIN" || !activeReference) return;

    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      if (attempts > 30) {
        // 90 seconds timeout
        clearInterval(interval);
        setPaymentStatus("FAILED");
        setStatusMessage(
          "Payment request timed out. If you authorized on your handset, check your SMS receipt or contact our team."
        );
        return;
      }

      try {
        const res = await fetch(
          `/api/payme/query?reference=${encodeURIComponent(activeReference)}`
        );
        const data = await res.json();

        if (data.status === "COMPLETED" || data.status === "SUCCESS") {
          clearInterval(interval);
          setPaymentStatus("COMPLETED");
          setStatusMessage("Payment received successfully! Thank you for your support.");
          setTimeout(() => {
            router.push(`/donate/receipt?reference=${encodeURIComponent(activeReference)}`);
          }, 1800);
        } else if (data.status === "FAILED" || data.status === "CANCELLED") {
          clearInterval(interval);
          setPaymentStatus("FAILED");
          setStatusMessage(
            data.message || "The transaction was declined or cancelled on your handset."
          );
        }
      } catch (err) {
        console.error("Status polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentStatus, activeReference, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please choose or enter a valid contribution amount.");
      return;
    }

    if (!name || !email) {
      setErrorMessage("Please provide your full name and email address.");
      return;
    }

    if (paymentMethod === "mobile" && !phone) {
      setErrorMessage("Please provide your mobile money phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/payme/transact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: paymentMethod,
          amount: parseFloat(amount),
          currency,
          name,
          email,
          phone,
          cause: causes.find((c) => c.id === cause)?.label || "General Fund",
          billingAddress,
          billingCity,
          billingCountry: "TZ",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsSubmitting(false);
        setErrorMessage(
          data.message || "Could not initiate payment. Please verify your details."
        );
        return;
      }

      setActiveReference(data.reference);

      if (paymentMethod === "mobile") {
        setPaymentStatus("AWAITING_PIN");
        setStatusMessage(
          data.message ||
            "Payment prompt sent to your handset. Please enter your mobile money PIN to confirm."
        );
      } else if (paymentMethod === "card") {
        if (data.paymentGatewayUrl) {
          window.location.href = data.paymentGatewayUrl;
        } else {
          router.push(`/donate/receipt?reference=${encodeURIComponent(data.reference)}`);
        }
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Network error communicating with payment gateway."
      );
    }
  }

  return (
    <>
      <Hero
        title="Invest in care & mobility."
        description="Support practical learning, donate assistive devices for Move for Disability 2026, and help strengthen physiotherapy across Tanzania."
      />

      <section className="frame section donation-layout">
        {/* Left Informational Column */}
        <div>
          <figure>
            <Image
              src="/images/training/training_7.jpeg"
              alt="Physiotherapy training and clinical collaboration in Tanzania"
              width={900}
              height={800}
              priority
              className="w-full object-cover"
            />
          </figure>

          <h2>Every contribution creates movement</h2>
          <p>
            Your gift provides direct mobility devices for children and adults with disabilities,
            funds clinical skill laboratories, and trains compassionate physiotherapists to serve
            underserved communities across Tanzania.
          </p>

          <div className="mt-8 pt-6 border-t border-[#dfe3d3]">
            <p className="text-sm text-[#53594b] mb-2">
              Looking to discuss corporate partnerships, CSR funding, or large grants?
            </p>
            <a
              className="text-link text-sm font-semibold inline-flex items-center gap-1.5"
              href={`mailto:${APP_INFO.contact.email}?subject=Institutional%20Sponsorship`}
            >
              <span>Contact our leadership team</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Payment Form Column with Cool Minimal UI */}
        <div className="donation-form-container bg-[#fcfdfa] p-6 sm:p-8 md:p-10 border border-[#e2e7d5] rounded-xl shadow-xs">
          {paymentStatus === "AWAITING_PIN" ? (
            /* Live Mobile Money USSD Prompt State */
            <div className="text-center py-6">
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#e4eca5] rounded-full animate-ping opacity-75" />
                <div className="relative w-16 h-16 bg-[#696112] text-white rounded-full flex items-center justify-center shadow-md">
                  <Smartphone size={32} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1b2116] mb-2">
                Check Your Mobile Handset
              </h3>
              <p className="text-sm text-[#53594b] max-w-md mx-auto mb-6">
                A USSD payment prompt has been sent to{" "}
                <strong className="text-[#1b2116]">{phone}</strong> for{" "}
                <strong className="text-[#1b2116]">
                  {currency === "USD"
                    ? `${amount} USD (~${equivalentAmount})`
                    : `${parseInt(amount).toLocaleString()} TZS`}
                </strong>
                .
              </p>

              <div className="p-4 bg-white border border-[#dfe3d3] rounded-lg text-left text-xs space-y-2 mb-6 shadow-xs">
                <div className="flex justify-between">
                  <span className="text-[#53594b]">Transaction Ref:</span>
                  <span className="font-mono font-semibold text-[#1b2116]">
                    {activeReference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#53594b]">Status:</span>
                  <span className="font-semibold text-[#696112] flex items-center gap-1">
                    <RefreshCw size={12} className="animate-spin" /> Awaiting PIN Authorization
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#53594b]">Designated Cause:</span>
                  <span className="text-[#1b2116] font-medium">
                    {causes.find((c) => c.id === cause)?.label}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#53594b] italic mb-6">
                Please enter your PIN on your mobile screen within 60 seconds to approve. This window will automatically confirm once authorized.
              </p>

              <button
                type="button"
                onClick={() => {
                  setPaymentStatus("IDLE");
                  setIsSubmitting(false);
                }}
                className="button button-outline text-xs"
              >
                Cancel or try another method
              </button>
            </div>
          ) : paymentStatus === "COMPLETED" ? (
            /* Instant Success Confirmation */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#e4eca5] text-[#696112] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#1b2116] mb-2 font-display">
                Payment Received!
              </h3>
              <p className="text-sm text-[#53594b] mb-6">
                {statusMessage || "Thank you for empowering physiotherapy and mobility in Tanzania."}
              </p>
              <div className="p-4 bg-white border border-[#dfe3d3] rounded-lg text-xs font-mono mb-6">
                Ref: {activeReference}
              </div>
              <button
                type="button"
                onClick={() =>
                  router.push(`/donate/receipt?reference=${encodeURIComponent(activeReference)}`)
                }
                className="button"
              >
                View official receipt <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            /* Standard Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1b2116] mb-1">
                  Make a contribution
                </h3>
                <p className="text-sm text-[#53594b]">
                  Choose your payment method and designate your cause.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-[#fdf2e9] border border-[#f5c6cb] text-[#c0392b] text-xs flex items-center gap-2 rounded-lg">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Payment Method: 2 Options (Mobile Money & Card) */}
              <div className="minimal-field-group">
                <span className="minimal-field-label">Payment Method</span>
                <div className="payment-method-toggle-2col">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile")}
                    className={`method-card-btn ${paymentMethod === "mobile" ? "active" : ""}`}
                  >
                    <div className="method-card-header">
                      <div className="method-card-icon">
                        <Smartphone size={16} aria-hidden="true" />
                      </div>
                      <span className="method-card-title">Mobile Money</span>
                    </div>
                    <span className="method-card-sub">M-Pesa · Tigo · Airtel · Halo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`method-card-btn ${paymentMethod === "card" ? "active" : ""}`}
                  >
                    <div className="method-card-header">
                      <div className="method-card-icon">
                        <CreditCard size={16} aria-hidden="true" />
                      </div>
                      <span className="method-card-title">Card Checkout</span>
                    </div>
                    <span className="method-card-sub">Visa & Mastercard worldwide</span>
                  </button>
                </div>
              </div>

              {/* 2. Cause Designation */}
              <div className="minimal-field-group">
                <label htmlFor="cause-select" className="minimal-field-label">
                  <span>Designate Your Impact</span>
                </label>
                <div className="minimal-input-wrapper">
                  <select
                    id="cause-select"
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                  >
                    {causes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="minimal-select-chevron" aria-hidden="true" />
                </div>
                <span className="text-[11.5px] text-[#696112] font-medium pl-1">
                  {causes.find((c) => c.id === cause)?.impact}
                </span>
              </div>

              {/* 3. Currency & Amount Selection */}
              <div className="minimal-field-group">
                <div className="flex items-center justify-between mb-1">
                  <span className="minimal-field-label">Select Amount</span>
                  <div className="inline-flex rounded-full bg-[#f4f6ee] p-0.5 border border-[rgba(105,97,18,0.18)]">
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange("TZS")}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                        currency === "TZS"
                          ? "bg-[#696112] text-white shadow-xs"
                          : "text-[#555d4c] hover:text-[#1b2116]"
                      }`}
                    >
                      TZS
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange("USD")}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                        currency === "USD"
                          ? "bg-[#696112] text-white shadow-xs"
                          : "text-[#555d4c] hover:text-[#1b2116]"
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="preset-amount-row mb-2">
                  {presetAmounts[currency].map((val) => {
                    const isSelected = !customAmountActive && amount === String(val);
                    return (
                      <button
                        type="button"
                        key={val}
                        onClick={() => {
                          setAmount(String(val));
                          setCustomAmountActive(false);
                        }}
                        className={`preset-amount-pill ${isSelected ? "active" : ""}`}
                      >
                        {currency === "USD" ? `$${val}` : val.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="minimal-input-wrapper">
                  <span className="minimal-currency-tag">
                    {currency === "USD" ? "$" : "TZS"}
                  </span>
                  <input
                    type="number"
                    min={currency === "USD" ? "1" : "500"}
                    step={currency === "USD" ? "1" : "500"}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setCustomAmountActive(true);
                    }}
                    placeholder="Enter custom amount"
                    aria-label="Custom contribution amount"
                  />
                </div>
                <span className="text-[11.5px] text-[#555d4c] pl-1">
                  Approximate conversion: <strong className="text-[#1b2116]">{equivalentAmount}</strong>
                </span>
              </div>

              {/* 4. Donor Information with Cool Minimal Inputs */}
              <div className="space-y-3.5 pt-3 border-t border-[#e2e7d5]">
                <span className="minimal-field-label">Donor Details</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="minimal-field-group">
                    <label htmlFor="donor-name" className="minimal-field-label">
                      <span>Full Name</span>
                      <span className="required-dot">*</span>
                    </label>
                    <div className="minimal-input-wrapper">
                      <input
                        id="donor-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Amani Mhando"
                      />
                    </div>
                  </div>

                  <div className="minimal-field-group">
                    <label htmlFor="donor-email" className="minimal-field-label">
                      <span>Email Address (for receipt)</span>
                      <span className="required-dot">*</span>
                    </label>
                    <div className="minimal-input-wrapper">
                      <input
                        id="donor-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. amani@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Money Phone Input (Only shown/required for Mobile Money) */}
                {paymentMethod === "mobile" && (
                  <div className="minimal-field-group">
                    <label htmlFor="donor-phone" className="minimal-field-label">
                      <span>Mobile Money Phone Number (receives PIN prompt)</span>
                      <span className="required-dot">*</span>
                    </label>
                    <div className="minimal-input-wrapper">
                      <input
                        id="donor-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0765 359 305"
                      />
                    </div>
                    <span className="text-[11.5px] text-[#555d4c] pl-1">
                      Enter your mobile number to receive the network PIN prompt.
                    </span>
                  </div>
                )}

                {/* Card Billing Address Fields (Only shown for Card Payment) */}
                {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="minimal-field-group">
                      <label htmlFor="billing-city" className="minimal-field-label">
                        <span>Billing City</span>
                      </label>
                      <div className="minimal-input-wrapper">
                        <input
                          id="billing-city"
                          type="text"
                          value={billingCity}
                          onChange={(e) => setBillingCity(e.target.value)}
                          placeholder="Dar es Salaam"
                        />
                      </div>
                    </div>

                    <div className="minimal-field-group">
                      <label htmlFor="billing-address" className="minimal-field-label">
                        <span>Billing Address / Country</span>
                      </label>
                      <div className="minimal-input-wrapper">
                        <input
                          id="billing-address"
                          type="text"
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          placeholder="Tanzania"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full button flex items-center justify-center gap-2 py-4 text-sm font-semibold rounded-lg transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Connecting to secure checkout...</span>
                    </>
                  ) : paymentMethod === "mobile" ? (
                    <>
                      <span>Donate via Mobile Money ({currency === "USD" ? `$${amount}` : `${parseInt(amount || "0").toLocaleString()} TZS`})</span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <span>Proceed to Card Checkout</span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
