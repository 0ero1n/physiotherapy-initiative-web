import type { Metadata } from "next";
import { Suspense } from "react";
import ReceiptContent from "./ReceiptContent";

export const metadata: Metadata = {
  title: "Donation Receipt | Tanzania Physiotherapy Initiative",
  description: "Official donation receipt and confirmation for Tanzania Physiotherapy Initiative.",
};

export default function ReceiptPage() {
  return (
    <Suspense
      fallback={
        <div className="frame section text-center py-24">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-[#696112] border-t-transparent rounded-full mb-4" />
          <p>Loading donation receipt...</p>
        </div>
      }
    >
      <ReceiptContent />
    </Suspense>
  );
}
