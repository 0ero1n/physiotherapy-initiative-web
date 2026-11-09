"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Printer,
  RotateCcw,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { APP_INFO } from "../../../data/content";

type ReceiptStage = "processing" | "printing" | "complete";

// Generate mathematically precise sawtooth serrated receipt teeth for authentic thermal paper tear-off
function generateReceiptClipPath(teethCount = 34, toothDepth = 5): string {
  const points: string[] = [];
  const total = teethCount * 2;
  for (let i = 0; i <= total; i++) {
    const x = (100 - (i * 100) / total).toFixed(2);
    const y = i % 2 === 0 ? `calc(100% - ${toothDepth}px)` : "100%";
    points.push(`${x}% ${y}`);
  }
  return `polygon(0% 0%, 100% 0%, ${points.join(", ")})`;
}

// Crisp SVG Barcode generator for thermal paper look
function ThermalBarcode({ code }: { code: string }) {
  // Deterministic bar widths based on char codes
  const bars = useMemo(() => {
    const list: Array<{ width: number; space: number }> = [];
    const seed = code || "TPI_VOUCHER_2026";
    for (let i = 0; i < 44; i++) {
      const charCode = seed.charCodeAt(i % seed.length) + i;
      const width = (charCode % 3) + 1; // 1, 2, or 3px
      const space = ((charCode >> 1) % 2) + 2; // 2 or 3px
      list.push({ width, space });
    }
    return list;
  }, [code]);

  let currentX = 8;
  return (
    <div className="w-full text-center my-3">
      <svg
        viewBox="0 0 240 38"
        className="w-full h-8 mx-auto"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {bars.map((bar, idx) => {
          const x = currentX;
          currentX += bar.width + bar.space;
          if (x > 232) return null;
          return (
            <rect
              key={idx}
              x={x}
              y={0}
              width={bar.width}
              height={38}
              fill="#1a1e16"
            />
          );
        })}
      </svg>
      <div className="text-[10px] tracking-[0.28em] font-mono text-[#444] mt-1 uppercase select-none">
        * {code || "TPI-OFFICIAL-RECEIPT"} *
      </div>
    </div>
  );
}

export default function ReceiptContent() {
  const searchParams = useSearchParams();
  const rawReference = searchParams.get("reference") || "";
  const isSimulated = searchParams.get("simulated") === "1";
  const isSample =
    searchParams.get("sample") === "1" ||
    isSimulated ||
    rawReference === "SAMPLE" ||
    rawReference.startsWith("SAMPLE_") ||
    !rawReference;

  const reference = rawReference || (isSample ? "TPI_SAMPLE_78942" : "");

  // URL fallbacks
  const donorFromUrl = searchParams.get("donor") || "";
  const causeFromUrl = searchParams.get("cause") || "";
  const methodFromUrl = searchParams.get("method") || "";
  const amountFromUrl = searchParams.get("amount") || "";
  const currFromUrl = searchParams.get("curr") || "TZS";

  const [loading, setLoading] = useState<boolean>(() => Boolean(rawReference) && !isSample);
  const [status, setStatus] = useState<string>(isSample ? "COMPLETED" : "PENDING");
  const [stage, setStage] = useState<ReceiptStage>(isSample ? "complete" : "processing");
  const [isFeeding, setIsFeeding] = useState<boolean>(false);

  const [txDetails, setTxDetails] = useState<{
    amount?: number | string;
    currency?: string;
    transactionId?: string;
    donor?: string;
    cause?: string;
    method?: string;
    issuedAt?: string;
  }>({
    donor: donorFromUrl || (isSample ? "Dr. Alexander Tillya" : "Valued Supporter"),
    cause: causeFromUrl || (isSample ? "Pediatric Mobility & Rehabilitation Care" : "General Fund"),
    method:
      methodFromUrl ||
      (isSample
        ? "Mobile Money (Vodacom M-Pesa)"
        : "Encrypted Electronic Transfer"),
    amount: amountFromUrl || (isSample ? "50,000" : undefined),
    currency: currFromUrl || "TZS",
    transactionId: isSample ? "SEL_DEMO_0911" : undefined,
    issuedAt: new Date().toLocaleDateString("en-TZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  // Pull local session data if available (only if real transaction)
  useEffect(() => {
    if (typeof window !== "undefined" && rawReference && !isSample) {
      try {
        const stored = sessionStorage.getItem(`tpi_receipt_${rawReference}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          setTxDetails((prev) => ({
            ...prev,
            donor: parsed.donor || prev.donor,
            cause: parsed.cause || prev.cause,
            method:
              parsed.method === "mobile"
                ? "Mobile Money (M-Pesa / Tigo / Airtel)"
                : parsed.method === "card"
                ? "Visa / Mastercard 3D-Secure"
                : prev.method,
            amount: parsed.amount || prev.amount,
            currency: parsed.currency || prev.currency,
          }));
        }
      } catch {
        // ignore
      }
    }
  }, [rawReference, isSample]);

  // Query live payment status from Payme Africa only for real references
  useEffect(() => {
    if (!rawReference || isSample) {
      setLoading(false);
      setStage("complete");
      setStatus("COMPLETED");
      return;
    }

    async function checkStatus() {
      try {
        const res = await fetch(
          `/api/payme/query?reference=${encodeURIComponent(rawReference)}`
        );
        const data = await res.json();
        if (data.success) {
          setStatus(data.status);
          if (data.status === "COMPLETED" || data.status === "SUCCESS") {
            setStage("printing");
            setTimeout(() => setStage("complete"), 1200);
          }
          setTxDetails((prev) => ({
            ...prev,
            amount: data.amount ?? prev.amount,
            currency: data.currency || prev.currency,
            transactionId: data.transactionId || prev.transactionId,
          }));
        }
      } catch (err) {
        console.error("Error querying receipt status:", err);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();

    // Poll if still pending
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      if (attempts > 25) {
        clearInterval(interval);
        return;
      }

      try {
        const res = await fetch(
          `/api/payme/query?reference=${encodeURIComponent(rawReference)}`
        );
        const data = await res.json();
        if (data.success) {
          setStatus(data.status);
          if (data.amount || data.transactionId) {
            setTxDetails((prev) => ({
              ...prev,
              amount: data.amount ?? prev.amount,
              currency: data.currency || prev.currency,
              transactionId: data.transactionId || prev.transactionId,
            }));
          }
          if (data.status === "COMPLETED" || data.status === "FAILED") {
            clearInterval(interval);
            if (data.status === "COMPLETED") {
              setStage("printing");
              setTimeout(() => setStage("complete"), 1200);
            }
          }
        }
      } catch {
        // ignore
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [rawReference, isSample]);

  const isComplete =
    status === "COMPLETED" ||
    status === "SUCCESS" ||
    isSimulated ||
    isSample;

  const clipPathStyle = useMemo(() => generateReceiptClipPath(32, 5), []);

  const handleReprintAnimation = () => {
    setIsFeeding(true);
    setTimeout(() => setIsFeeding(false), 900);
  };

  const formattedAmount = useMemo(() => {
    const val = Number(txDetails.amount);
    if (!val || isNaN(val)) return isSample ? "50,000" : "490";
    return val.toLocaleString();
  }, [txDetails.amount, isSample]);

  return (
    <div className="receipt-page section frame py-8 md:py-16">
      <div className="receipt-printer-root">
        {isSample && (
          <div className="no-print mb-4 p-2.5 rounded-xl bg-[#22281b] text-[#e4eca5] text-xs font-mono flex items-center justify-between border border-[#3e4832] shadow-sm">
            <span className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              DEMO SAMPLE PREVIEW
            </span>
            <span className="text-[10.5px] text-[#a4b574]">
              Click &quot;Print / Save PDF&quot; below to test 1-page layout
            </span>
          </div>
        )}
        {/* ==============================================================================
            THE RECEIPT PRINTER MACHINE (CHASSIS & TERMINAL SCREEN)
            ============================================================================== */}
        <div className="receipt-machine no-print">
          {/* Machine Header */}
          <div className="receipt-machine-header">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#2e3725] border border-[#445137] flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/our-logo.jpeg"
                  alt="TPI"
                  width={24}
                  height={24}
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-wider uppercase text-neutral-200">
                  TPI TERMINAL POS-01
                </div>
                <div className="text-[9px] text-[#8e9882] font-mono">
                  OFFICIAL DONATION VERIFIER
                </div>
              </div>
            </div>

            {/* LED Status Pill */}
            <div className="flex items-center gap-2 bg-[#12160f] px-2.5 py-1 rounded-full border border-[#2b3323]">
              <span
                className={`w-2 h-2 rounded-full ${
                  loading || status === "PENDING"
                    ? "bg-amber-400 animate-ping"
                    : "bg-emerald-400 animate-pulse"
                }`}
              />
              <span className="text-[10px] font-mono tracking-wider font-semibold text-[#c5d888] uppercase">
                {loading || status === "PENDING" ? "PROCESSING" : "ONLINE · CONFIRMED"}
              </span>
            </div>
          </div>

          {/* Machine Screen (LCD/OLED Display) */}
          <div className="receipt-screen">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#8e9882]">
                  Status
                </div>
                <div className="text-sm font-bold text-[#e4eca5] flex items-center gap-1.5 mt-0.5">
                  {loading ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-[#e4eca5] border-t-transparent rounded-full animate-spin" />
                      Checking...
                    </>
                  ) : isComplete ? (
                    <>
                      <CheckCircle2 size={15} className="text-emerald-400" />
                      Payment Confirmed
                    </>
                  ) : (
                    <>
                      <AlertCircle size={15} className="text-amber-400" />
                      Pending PIN
                    </>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#8e9882]">
                  Total Paid
                </div>
                <div className="text-sm font-bold text-white tracking-tight mt-0.5">
                  {formattedAmount} {txDetails.currency || "TZS"}
                </div>
              </div>
            </div>
          </div>

          {/* The Printer Mouth Slot */}
          <div className="receipt-slot" aria-hidden="true" />
        </div>

        {/* ==============================================================================
            THE THERMAL RECEIPT PAPER (CLEAN & MINIMAL)
            ============================================================================== */}
        <div className="receipt-output-container">
          <article
            className={`thermal-paper ${isFeeding ? "receipt-paper-animate" : ""}`}
            style={{ clipPath: clipPathStyle }}
          >
            {/* Top Paper Header */}
            <div className="text-center pb-1">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-neutral-300 p-0.5 bg-white shadow-xs flex items-center justify-center">
                <Image
                  src="/images/our-logo.jpeg"
                  alt="TPI Logo"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              </div>

              <h1 className="font-bold text-sm tracking-wider uppercase text-[#1a1e16] font-mono leading-tight">
                {APP_INFO.name}
              </h1>

              <div className="text-xs font-mono text-[#666] mt-0.5">
                Receipt
              </div>
            </div>

            {/* Clean Divider */}
            <div className="receipt-dashed-line my-2.5" aria-hidden="true">
              ------------------------------------------------
            </div>

            {/* Core Details */}
            <div className="space-y-1.5 text-xs font-mono text-[#222]">
              <div className="flex justify-between">
                <span className="text-[#777]">Receipt</span>
                <span className="font-semibold">{reference || "TPI_GIFT_001"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#777]">Date</span>
                <span>{txDetails.issuedAt}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#777]">Donor</span>
                <span className="font-medium uppercase truncate max-w-[200px]">
                  {txDetails.donor}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#777]">Cause</span>
                <span className="truncate max-w-[200px] text-right">
                  {txDetails.cause}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#777]">Method</span>
                <span className="truncate max-w-[200px] text-right">
                  {txDetails.method?.toLowerCase().includes("mobile")
                    ? "Mobile Money"
                    : txDetails.method?.toLowerCase().includes("card")
                    ? "Card Payment"
                    : txDetails.method || "Direct Transfer"}
                </span>
              </div>
            </div>

            {/* Clean Divider */}
            <div className="receipt-dashed-line my-2.5" aria-hidden="true">
              ------------------------------------------------
            </div>

            {/* Total Paid Row */}
            <div className="py-1">
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-xs uppercase text-[#555] font-semibold">Total paid</span>
                <span className="text-2xl font-bold text-[#111] tracking-tight">
                  {formattedAmount}{" "}
                  <span className="text-sm font-semibold">{txDetails.currency || "TZS"}</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-[#777] mt-1">
                <span>Status</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ {isComplete ? "Completed" : "Pending"}
                </span>
              </div>
            </div>

            {/* Clean Divider */}
            <div className="receipt-dashed-line my-2.5" aria-hidden="true">
              ------------------------------------------------
            </div>

            {/* Clean Barcode */}
            <ThermalBarcode code={reference || "TPI1794238661911"} />

            {/* Minimal Footer */}
            <div className="text-center pt-2 font-mono text-xs text-[#555] pb-2">
              <p>Thanks for your support.</p>
              <p className="text-[10px] text-[#888] mt-1">physioinitiativetz.org</p>
            </div>
          </article>
        </div>

        {/* ==============================================================================
            SCREEN ACTION CONTROLS (PRINT / DOWNLOAD / NAVIGATE) - HIDDEN IN PRINT
            ============================================================================== */}
        <div className="receipt-actions-panel no-print mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full py-3.5 px-6 rounded-xl bg-[#696112] hover:bg-[#524c0e] active:scale-[0.99] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer size={17} /> Print / Save PDF (Clean 1 Page)
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleReprintAnimation}
              className="py-2.5 px-4 rounded-xl border border-[#d2d7c5] hover:bg-[#eef2e1] text-[#292e20] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white"
            >
              <RotateCcw size={14} /> Re-Feed Receipt
            </button>

            <Link
              href="/donate"
              className="py-2.5 px-4 rounded-xl border border-[#d2d7c5] hover:bg-[#eef2e1] text-[#292e20] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 bg-white text-center"
            >
              <Heart size={14} className="text-[#696112]" /> Donate Again
            </Link>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/initiatives"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#53594b] hover:text-[#696112] transition-colors"
            >
              Explore the initiatives your gift supports <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
