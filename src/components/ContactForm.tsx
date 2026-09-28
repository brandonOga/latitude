"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // TODO: send the enquiry to a backend or email service.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form className="enquiry" onSubmit={handleSubmit}>
      {sent ? (
        <div className="enquiry-thanks">
          <div className="enquiry-thanks-title">Thank you.</div>
          <div className="enquiry-thanks-body">
            We’ll be in touch within one business day.
          </div>
        </div>
      ) : (
        <div className="enquiry-fields">
          <div className="enquiry-title">Send us an enquiry</div>
          <label className="field">
            Full name
            <input name="name" required autoComplete="name" />
          </label>
          <label className="field">
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label className="field">
            Area of interest
            <select name="interest">
              <option>Finance Services</option>
              <option>Actuarial Services</option>
              <option>IT Services</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="field">
            How can we help?
            <textarea name="message" rows={4} />
          </label>
          <button type="submit" className="btn-submit">
            Send enquiry
          </button>
        </div>
      )}
    </form>
  );
}
