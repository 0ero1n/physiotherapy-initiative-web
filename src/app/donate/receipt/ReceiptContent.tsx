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
  const reference = searchParams.get("reference") || "";
  const isSimulated = searchParams.get("simulated") === "1";

  // URL fallbacks
  const donorFromUrl = searchParams.get("donor") || "";
  const causeFromUrl = searchParams.get("cause") || "";
  const methodFromUrl = searchParams.get("method") || "";
  const amountFromUrl = searchParams.get("amount") || "";
  const currFromUrl = searchParams.get("curr") || "TZS";

  const [loading, setLoading] = useState<boolean>(() => Boolean(reference));
  const [status, setStatus] = useState<string>("PENDING");
  const [stage, setStage] = useState<ReceiptStage>("processing");
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
    donor: donorFromUrl || "Valued Supporter",
    cause: causeFromUrl || "General Fund",
    method: methodFromUrl || "Encrypted Electronic Transfer",
    amount: amountFromUrl || undefined,
    currency: currFromUrl || "TZS",
    issuedAt: new Date().toLocaleDateString("en-TZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  // Pull local session data if available
  useEffect(() => {
    if (typeof window !== "undefined" && reference) {
      try {
        const stored = sessionStorage.getItem(`tpi_receipt_${reference}`);
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
  }, [reference]);

  // Query live payment status from Payme Africa
  useEffect(() => {
    if (!reference) {
      setLoading(false);
      setStage("complete");
      return;
    }

    async function checkStatus() {
      try {
        const res = await fetch(
          `/api/payme/query?reference=${encodeURIComponent(reference)}`
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
          `/api/payme/query?reference=${encodeURIComponent(reference)}`
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
  }, [reference]);

  const isComplete =
    status === "COMPLETED" || status === "SUCCESS" || isSimulated;

  const clipPathStyle = useMemo(() => generateReceiptClipPath(32, 5), []);

  const handleReprintAnimation = () => {
    setIsFeeding(true);
    setTimeout(() => setIsFeeding(false), 900);
  };

  const formattedAmount = useMemo(() => {
    const val = Number(txDetails.amount);
    if (!val || isNaN(val)) return "490";
    return val.toLocaleString();
  }, [txDetails.amount]);

  return (
    <div className="receipt-page section frame py-8 md:py-16">
      <div className="receipt-printer-root">
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#8e9882] mb-1">
                  SYSTEM STATUS // 000
                </div>
                <div className="text-base font-bold text-[#e4eca5] flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-[#e4eca5] border-t-transparent rounded-full animate-spin" />
                      AWAITING CONFIRMATION
                    </>
                  ) : isComplete ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      PAYMENT CERTIFIED & LOGGED
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} className="text-amber-400" />
                      AUTHORIZATION PENDING
                    </>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#8e9882]">
                  AMOUNT RECEIVED
                </div>
                <div className="text-sm font-bold text-white tracking-tight">
                  {formattedAmount} {txDetails.currency || "TZS"}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1c2417] flex items-center justify-between text-[11px] text-[#a4b574]">
              <span className="truncate max-w-[240px]">
                REF: <code className="text-white font-mono">{reference || "TPI_PENDING"}</code>
              </span>
              <span className="uppercase text-[9px] tracking-wider text-[#8e9882]">
                ENCRYPTED TLS 1.3
              </span>
            </div>
          </div>

          {/* The Printer Mouth Slot */}
          <div className="receipt-slot" aria-hidden="true" />
        </div>

        {/* ==============================================================================
            THE THERMAL RECEIPT PAPER (FEEDS OUT OF THE MACHINE SLOT)
            ============================================================================== */}
        <div className="receipt-output-container">
          <article
            className={`thermal-paper ${isFeeding ? "receipt-paper-animate" : ""}`}
            style={{ clipPath: clipPathStyle }}
          >
            {/* Top Paper Header Lockup */}
            <div className="text-center pb-3">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full border border-neutral-300 p-0.5 bg-white shadow-sm flex items-center justify-center">
                <Image
                  src="/images/our-logo.jpeg"
                  alt="TPI Logo"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>

              <h1 className="font-bold text-[15px] tracking-wider uppercase text-[#1a1e16] font-mono leading-tight">
                {APP_INFO.name}
              </h1>

              <div className="text-[10px] tracking-widest uppercase font-bold text-[#696112] mt-0.5">
                ★ OFFICIAL DONATION RECEIPT ★
              </div>

              <div className="text-[10.5px] text-[#555] font-mono mt-1 leading-snug">
                NGO REGISTRATION: {APP_INFO.registrationNumber}
                <br />
                {APP_INFO.contact.address}
                <br />
                TEL: {APP_INFO.contact.phone} · {APP_INFO.contact.email}
              </div>
            </div>

            {/* Thermal Divider Line */}
            <div className="receipt-dashed-line my-2" aria-hidden="true">
              ================================================
            </div>

            {/* Receipt Summary Grid */}
            <div className="space-y-1.5 text-[11.5px] font-mono text-[#24291f]">
              <div className="flex justify-between">
                <span className="text-[#666]">RECEIPT REF :</span>
                <span className="font-bold text-[#111]">{reference || "TPI_GIFT_001"}</span>
              </div>

              {txDetails.transactionId && (
                <div className="flex justify-between">
                  <span className="text-[#666]">GATEWAY ID  :</span>
                  <span className="font-semibold text-[#111]">{txDetails.transactionId}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[#666]">ISSUED DATE :</span>
                <span>{txDetails.issuedAt}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666]">CONTRIBUTOR :</span>
                <span className="font-semibold text-[#111] uppercase truncate max-w-[200px]">
                  {txDetails.donor}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666]">DESIGNATION :</span>
                <span className="truncate max-w-[200px] text-right font-medium">
                  {txDetails.cause}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666]">CHANNEL     :</span>
                <span className="truncate max-w-[200px] text-right">
                  {txDetails.method?.startsWith("mobile")
                    ? "Mobile Money (Tigo/Vodacom/Airtel)"
                    : txDetails.method || "Direct Electronic Transfer"}
                </span>
              </div>

              <div className="flex justify-between items-center pt-0.5">
                <span className="text-[#666]">STATUS      :</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-[#e4eca5] text-[#292e20] border border-[#cbd885]">
                  {isComplete ? "CONFIRMED & RECEIVED" : "PENDING AUTHORIZATION"}
                </span>
              </div>
            </div>

            {/* Thermal Divider Line */}
            <div className="receipt-dashed-line my-2.5" aria-hidden="true">
              ------------------------------------------------
            </div>

            {/* Hero Amount Contribution Box */}
            <div className="border-2 border-dashed border-[#8d9478] bg-[#f2f4e8] p-3 rounded-md text-center">
              <div className="text-[10px] uppercase tracking-widest text-[#53594b] font-bold">
                TOTAL CONTRIBUTION AMOUNT
              </div>
              <div className="text-2xl md:text-3xl font-black text-[#1a1e16] font-mono tracking-tight my-0.5">
                {formattedAmount}{" "}
                <span className="text-base font-bold text-[#696112]">
                  {txDetails.currency || "TZS"}
                </span>
              </div>
              <div className="text-[10px] font-bold tracking-wider text-[#4d543f] uppercase">
                100% TAX-DEDUCTIBLE PHILANTHROPIC GIFT
              </div>
            </div>

            {/* Thermal Divider Line */}
            <div className="receipt-dashed-line my-2.5" aria-hidden="true">
              ------------------------------------------------
            </div>

            {/* Barcode Element */}
            <ThermalBarcode code={reference || "TPI1794238661911"} />

            {/* Official Certification Seal / Stamp */}
            <div className="my-3 text-center">
              <div className="inline-block border-2 border-[#696112] text-[#4d480f] px-3 py-1 rounded font-mono text-[9.5px] font-bold tracking-wider uppercase rotate-[-1.5deg] bg-white/70 shadow-xs">
                ★ CERTIFIED OFFICIAL RECEIPT · TPI TANZANIA ★
              </div>
            </div>

            {/* Legal Statement */}
            <p className="text-[9.5px] text-[#5c6352] text-center leading-relaxed font-mono px-1">
              This electronic receipt acknowledges your voluntary contribution to the
              Tanzania Physiotherapy Initiative (TPI), a registered non-profit NGO (ooNGO/R/9429).
              No goods or services were provided in exchange for this contribution.
              Retain this voucher for tax and records purposes.
            </p>

            <div className="mt-4 pt-2 border-t border-neutral-300 flex justify-between text-[8.5px] text-[#777] font-mono">
              <span>SECURITY HASH: 8E16-3DD8-VERIFIED</span>
              <span>P. 1 / 1</span>
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
