import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Compass, BookOpen, Mail } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The requested page on Tanzania Physiotherapy Initiative could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-6 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Emblem Badge */}
        <div className="w-24 h-24 rounded-3xl bg-[rgba(105,97,18,0.12)] border border-[rgba(105,97,18,0.25)] flex items-center justify-center p-3 mb-8 shadow-sm">
          <Image
            src="/images/tpi-emblem.png"
            alt="Tanzania Physiotherapy Initiative Emblem"
            width={72}
            height={72}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Status code & title */}
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#696112] px-3 py-1 rounded-full bg-[#f4f6ee] border border-[#d8decb] mb-4">
          Error 404 · Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1f241a] tracking-tight mb-4">
          Looking for a Pathway or Resource?
        </h1>

        <p className="text-base text-[#53594b] leading-relaxed mb-8 max-w-md">
          The link you followed may have changed, or the clinical document has been relocated to our updated repository.
        </p>

        {/* Helpful links */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-10">
          <Link
            href="/"
            className="button"
          >
            <Home size={16} aria-hidden="true" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/initiatives"
            className="button button-ghost"
          >
            <Compass size={16} aria-hidden="true" />
            <span>Strategic Initiatives</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-[#e2e7d5] w-full flex flex-wrap items-center justify-center gap-6 text-xs text-[#53594b]">
          <Link href="/resources" className="hover:text-[#696112] inline-flex items-center gap-1.5 font-medium">
            <BookOpen size={14} aria-hidden="true" />
            <span>Publications & Toolkits</span>
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-[#696112] inline-flex items-center gap-1.5 font-medium">
            <Mail size={14} aria-hidden="true" />
            <span>Contact Coordination Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
