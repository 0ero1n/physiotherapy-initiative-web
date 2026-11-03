"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowUpRight, Printer } from "lucide-react";
import { APP_INFO } from "../../../data/content";

export default function ReceiptContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || "";
  const isSimulated = searchParams.get("simulated") === "1";

  // Derive initial loading directly without triggering synchronous setState in effect
  const [loading, setLoading] = useState<boolean>(() => Boolean(reference));
  const [status, setStatus] = useState<string>("PENDING");

  useEffect(() => {
    if (!reference) {
      return;
    }

    async function checkStatus() {
      try {
        const res = await fetch(`/api/payme/query?reference=${encodeURIComponent(reference)}`);
        const data = await res.json();
        if (data.success) {
          setStatus(data.status);
        }
      } catch (err) {
        console.error("Error querying receipt status:", err);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();

    // If still pending, poll every 3 seconds up to 6 times
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      if (attempts > 6) {
        clearInterval(interval);
        return;
      }

      try {
        const res = await fetch(`/api/payme/query?reference=${encodeURIComponent(reference)}`);
        const data = await res.json();
        if (data.success) {
          setStatus(data.status);
          if (data.status === "COMPLETED" || data.status === "FAILED") {
            clearInterval(interval);
          }
        }
      } catch {
        // ignore
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [reference]);

  const isComplete = status === "COMPLETED" || status === "SUCCESS" || isSimulated;

  return (
    <div className="receipt-page section frame">
      <div className="receipt-card max-w-2xl mx-auto bg-white p-8 md:p-12 border border-[#eceee2] shadow-sm">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#696112] border-t-transparent rounded-full mb-4" />
            <p className="text-[#53594b]">Verifying donation status...</p>
          </div>
        ) : isComplete ? (
          <>
            <div className="text-center pb-8 border-b border-[#eceee2]">
              <div className="w-16 h-16 bg-[#e4eca5] text-[#292e20] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} className="text-[#696112]" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#696112]">
                Official Payment Receipt
              </span>
              <h1 className="text-3xl font-bold text-[#292e20] mt-1 font-serif">
                Thank you for your support!
              </h1>
              <p className="text-sm text-[#53594b] mt-2">
                Your donation directly advances mobility care, assistive device distribution, and physiotherapy education in Tanzania.
              </p>
            </div>

            <div className="py-6 space-y-4 text-sm border-b border-[#eceee2]">
              <div className="flex justify-between py-1">
                <span className="text-[#53594b]">Transaction Reference</span>
                <span className="font-mono font-semibold text-[#292e20]">
                  {reference || "TPI_ONLINE_PLEDGE"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#53594b]">Payment Channel</span>
                <span className="font-medium text-[#292e20]">
                  Encrypted Direct Electronic Transfer
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#53594b]">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e4eca5] text-[#292e20]">
                  Confirmed & Received
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#53594b]">Date & Time</span>
                <span className="text-[#292e20]">
                  {new Date().toLocaleDateString("en-TZ", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#53594b]">Beneficiary</span>
                <span className="text-[#292e20] font-medium">
                  {APP_INFO.name}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="button button-outline text-xs inline-flex items-center gap-2"
              >
                <Printer size={15} /> Print / Save PDF
              </button>
              <Link href="/get-involved" className="button text-xs">
                Explore our active initiatives <ArrowUpRight size={15} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#fae8cc] text-[#4d480f] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={36} />
            </div>
            <h2 className="text-2xl font-bold text-[#292e20]">Payment Pending Authorization</h2>
            <p className="text-sm text-[#53594b] mt-2 max-w-md mx-auto">
              Reference: <code className="font-mono font-bold">{reference}</code>. If you initiated a Mobile Money payment, please authorize the prompt on your phone with your PIN.
            </p>
            <div className="mt-6">
              <Link href="/donate" className="button text-xs">
                Return to Donation Form
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
