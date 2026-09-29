"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/Button";

const COUNTRY_CODE = "+263";

// Formats Zimbabwe numbers as "+263 776 382 111". A leading 0 typed after the
// code (the local format, 0776…) is dropped. Numbers with any other country
// code are left exactly as typed.
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits.startsWith("263")) return raw;
  // Let backspace remove the space after the code, so it can be cleared
  if (digits === "263") return raw.endsWith(" ") ? `${COUNTRY_CODE} ` : COUNTRY_CODE;
  const rest = digits.slice(3).replace(/^0/, "").slice(0, 9);
  return [COUNTRY_CODE, ...(rest.match(/.{1,3}/g) ?? [])].join(" ");
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState(`${COUNTRY_CODE} `);

  // TODO: send the enquiry to a backend or email service.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form
      className="enquiry"
      onSubmit={handleSubmit}
      // Runs alongside the heading rather than waiting for every card
      data-reveal="right"
      data-reveal-at="0.6"
    >
      {sent ? (
        <div className="enquiry-thanks">
          <div className="enquiry-thanks-title h4">Thank you.</div>
          <div className="enquiry-thanks-body">
            We’ll be in touch within one business day.
          </div>
        </div>
      ) : (
        <div className="enquiry-fields">
          <div className="enquiry-title h5">Send us an enquiry</div>
          {/* Labels are visually hidden (placeholders show instead) but kept for screen readers */}
          <label className="field">
            <span className="sr-only">Full name</span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Full name"
            />
          </label>
          <div className="field-row">
            <label className="field">
              <span className="sr-only">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email"
              />
            </label>
            <label className="field">
              <span className="sr-only">Phone</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onFocus={(e) => {
                  // Put the cursor after the country code, ready to type.
                  // Deferred so it runs after the click has placed the caret.
                  const input = e.currentTarget;
                  requestAnimationFrame(() => {
                    const end = input.value.length;
                    input.setSelectionRange(end, end);
                  });
                }}
              />
            </label>
          </div>
          <label className="field">
            <span className="sr-only">Area of interest</span>
            <select name="interest" required defaultValue="">
              <option value="" disabled>
                Area of interest
              </option>
              <option>Finance Services</option>
              <option>Actuarial Services</option>
              <option>IT Services</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="field">
            <span className="sr-only">How can we help?</span>
            <textarea name="message" rows={4} placeholder="How can we help?" />
          </label>
          <Button type="submit" className="enquiry-submit">
            Send enquiry
          </Button>
        </div>
      )}
    </form>
  );
}
