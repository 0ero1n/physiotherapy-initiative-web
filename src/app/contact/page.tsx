"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import { APP_INFO } from "@/data/content";

export default function Contact() {
  return (
    <Suspense
      fallback={<div className="frame section text-center py-20">Loading contact form…</div>}
    >
      <ContactContent />
    </Suspense>
  );
}

function ContactContent() {
  const params = useSearchParams();
  const [subject, setSubject] = useState(
    params.get("subject") || "General inquiry"
  );
  const [prepared, setPrepared] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Hello Tanzania Physiotherapy Initiative,\n\n${data.get("message")}\n\n${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "Not provided"}`;
    window.location.href = `mailto:${APP_INFO.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }

  return (
    <>
      <Hero
        title="Let’s Start a Conversation."
        description="Interested in clinical training, community outreach collaborations, or supporting our work? Connect with our team in Dar es Salaam."
        actionHref="#message"
        actionLabel="Send a Direct Message"
        secondaryHref="https://wa.me/255765359305"
        secondaryLabel="Chat on WhatsApp"
      />
      <section className="frame section contact-layout">
        <div className="contact-info">
          <h2>Talk to us</h2>
          <p>Connect with our team in Dar es Salaam.</p>
          <dl>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${APP_INFO.contact.email}`}>
                {APP_INFO.contact.email}
              </a>
            </dd>
            <dt>Phone</dt>
            <dd>
              <a href="tel:+255765359305">{APP_INFO.contact.phone}</a>
            </dd>
            <dt>Find us</dt>
            <dd>{APP_INFO.contact.address}</dd>
            <dt>Office hours</dt>
            <dd>{APP_INFO.contact.hours}</dd>
          </dl>
          <a
            className="text-link inline-flex items-center gap-1.5"
            href="https://wa.me/255765359305"
            target="_blank"
            rel="noreferrer"
          >
            <span>Chat on WhatsApp</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <form id="message" className="form-panel" onSubmit={submit}>
          <div>
            <h2>Your message</h2>
            <p>We’ll prepare an email draft in your messaging app ready to send.</p>
          </div>

          <div className="form-pair">
            <div className="minimal-field-group">
              <label htmlFor="name" className="minimal-field-label">
                <span>Full name</span>
                <span className="required-dot">*</span>
              </label>
              <div className="minimal-input-wrapper">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Amani Mhando"
                  required
                />
              </div>
            </div>

            <div className="minimal-field-group">
              <label htmlFor="email" className="minimal-field-label">
                <span>Email address</span>
                <span className="required-dot">*</span>
              </label>
              <div className="minimal-input-wrapper">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="e.g. amani@example.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="minimal-field-group">
            <label htmlFor="phone" className="minimal-field-label">
              <span>Phone number (optional)</span>
            </label>
            <div className="minimal-input-wrapper">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. +255 765 359 305"
              />
            </div>
          </div>

          <div className="minimal-field-group">
            <label htmlFor="subject" className="minimal-field-label">
              <span>Subject</span>
              <span className="required-dot">*</span>
            </label>
            <div className="minimal-input-wrapper">
              <input
                id="subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Workshop participation inquiry"
                required
              />
            </div>
          </div>

          <div className="minimal-field-group">
            <label htmlFor="message-body" className="minimal-field-label">
              <span>How can we help?</span>
              <span className="required-dot">*</span>
            </label>
            <div className="minimal-input-wrapper">
              <textarea
                id="message-body"
                name="message"
                rows={5}
                placeholder="Share your questions, clinical partnership proposal, or collaboration ideas..."
                required
              />
            </div>
          </div>

          <button className="button" type="submit">
            <span>Open email draft</span>
            <Send size={16} aria-hidden="true" />
          </button>

          {prepared && (
            <div className="p-4 bg-[#f4f6ee] border border-[#d8decb] rounded-lg text-xs text-[#292e20] flex items-start gap-2.5" role="status">
              <CheckCircle2 size={18} className="text-[#696112] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>Draft opened in your email client.</strong> If it didn’t open automatically, write directly to{" "}
                <a href={`mailto:${APP_INFO.contact.email}`} className="font-semibold underline">
                  {APP_INFO.contact.email}
                </a>.
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
