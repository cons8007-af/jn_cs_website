// The enquiry and job-application forms.
//
// WHY THESE DO NOT POST ANYWHERE. The backend in this workspace
// (cons_backend) has no public enquiry or careers endpoint, and nothing it
// exposes could be made to serve as one:
//
//   - Every mounted router that could accept a message is behind
//     `router.use(requireAuth, ...)`. supportRoutes.js is the closest match
//     and is `requireAuth, requireRole("customer")` -- it needs a signed-in
//     MWAY account, which a visitor to this site does not have.
//   - The only routes reachable without a credential are POST /api/auth/*
//     (sign-in itself), GET /api/settings/public, and POST
//     /api/webhooks/razorpay (HMAC-verified). None of them take an enquiry.
//   - CORS would refuse this site anyway: server.js allows only its own
//     production origin, localhost, and whatever is listed in
//     ALLOWED_ORIGINS. This site's origin is not among them.
//   - There is no file-upload route at all, so a resume could not be posted
//     even if an endpoint existed.
//
// So rather than fake a submission -- which is what the old handlers did,
// `e.preventDefault(); setOk(true)` and a message claiming the enquiry had
// been "captured" -- these forms do the honest thing: they compose what the
// visitor typed into a message and hand it to a channel that really exists,
// the office email address and phone numbers already published on this site.
// Nothing is stored by this website, and the form says so.
//
// A resume cannot ride on a mailto: link, so the file input is gone. Asking
// for a file and then silently dropping it is worse than asking the
// applicant to attach it to the email that opens, which is what we now do.
//
// WHEN A BACKEND ENDPOINT EXISTS, this is the only file that changes:
// replace the body of `handoff()` with the fetch, keep the panel as the
// fallback for when it fails.

import React, { useState } from 'react';
import { Mail, Phone, Send, Copy, Check, Paperclip } from 'lucide-react';
import { CONTACT } from './policies.jsx';

/** Build a mailto: URL. Newlines become %0A, which mail clients honour. */
function mailtoUrl(subject, body) {
  return (
    'mailto:' +
    CONTACT.email +
    '?subject=' +
    encodeURIComponent(subject) +
    '&body=' +
    encodeURIComponent(body)
  );
}

/** "Label: value" for the filled-in fields only, so blanks are not sent. */
function composeBody(rows, trailer) {
  const lines = rows
    .filter(([, v]) => String(v || '').trim() !== '')
    .map(([k, v]) => k + ': ' + String(v).trim());
  return lines.join('\n') + (trailer ? '\n\n' + trailer : '') + '\n';
}

/**
 * What the visitor sees after submitting. It opens their mail app, and -- in
 * case no mail client is registered, which is common on a shared desktop --
 * it also shows the full text with a copy button and the phone numbers, so
 * the enquiry is never trapped inside a form that appears to have sent it.
 */
function ReadyToSend({ subject, body, attachNote }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = subject + '\n\n' + body;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard access is refused outside a secure context and in some
      // embedded browsers. The text is on screen either way, so this is a
      // convenience failing, not the message failing.
      setCopied(false);
    }
  }

  return (
    <div className="enquiryReady" role="status">
      <b>Your message is ready to send</b>
      <p>
        This website does not store enquiries. Send it to our office using
        either option below, or call us and read it out.
      </p>

      {attachNote && (
        <p className="enquiryAttach">
          <Paperclip aria-hidden="true" /> {attachNote}
        </p>
      )}

      <pre className="enquiryDraft">{body}</pre>

      <div className="enquiryActions">
        <a className="btn primary" href={mailtoUrl(subject, body)}>
          <Mail size={16} /> Open email app
        </a>
        <button type="button" className="btn secondary" onClick={copy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied' : 'Copy message'}
        </button>
      </div>

      <div className="enquiryReach">
        <a href={'mailto:' + CONTACT.email}>
          <Mail aria-hidden="true" /> {CONTACT.email}
        </a>
        <a href={'tel:' + CONTACT.phone}>
          <Phone aria-hidden="true" /> {CONTACT.phone}
        </a>
        <a href={'tel:' + CONTACT.altPhone}>
          <Phone aria-hidden="true" /> {CONTACT.altPhone}
        </a>
      </div>
    </div>
  );
}

const EMPTY_ENQUIRY = {
  name: '',
  phone: '',
  email: '',
  service: 'General enquiry',
  prefer: 'Phone',
  message: ''
};

/** The Contact page form. `services` is passed in so the list stays in one place. */
export function EnquiryForm({ services = [] }) {
  const [f, setF] = useState(EMPTY_ENQUIRY);
  const [draft, setDraft] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const subject = 'Website enquiry: ' + f.service;
    const body = composeBody([
      ['Name', f.name],
      ['Phone', f.phone],
      ['Email', f.email],
      ['Service', f.service],
      ['Preferred contact', f.prefer],
      ['Message', f.message]
    ]);
    setDraft({ subject, body });
    // Open the mail client straight away -- the panel stays up as the
    // fallback if nothing handles it.
    window.location.href = mailtoUrl(subject, body);
  }

  return (
    <form className="form" onSubmit={submit}>
      <h3>Send an enquiry</h3>
      <p>
        Fill this in and we will compose it as an email to our office. Nothing
        is submitted to this website.
      </p>

      <div className="two">
        <label>
          Name
          <input required value={f.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label>
          Phone
          <input
            required
            type="tel"
            value={f.phone}
            onChange={set('phone')}
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
      </div>

      <label>
        Email
        <input type="email" value={f.email} onChange={set('email')} autoComplete="email" />
      </label>

      <label>
        Service
        <select value={f.service} onChange={set('service')}>
          <option>General enquiry</option>
          {services.map((s) => (
            <option key={s.id}>{s.title}</option>
          ))}
        </select>
      </label>

      <label>
        Preferred contact
        <select value={f.prefer} onChange={set('prefer')}>
          <option>Phone</option>
          <option>WhatsApp</option>
          <option>Email</option>
        </select>
      </label>

      <label>
        Message
        <textarea required rows="6" value={f.message} onChange={set('message')} />
      </label>

      <button className="btn primary full" type="submit">
        Prepare Enquiry <Send size={16} />
      </button>

      {draft && <ReadyToSend subject={draft.subject} body={draft.body} />}
    </form>
  );
}

const EMPTY_APPLICATION = {
  position: '',
  name: '',
  phone: '',
  email: '',
  location: '',
  qualification: '',
  message: ''
};

/** The Careers page form. */
export function ApplicationForm({ positions = [] }) {
  const [f, setF] = useState(EMPTY_APPLICATION);
  const [draft, setDraft] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const subject = 'Job application: ' + f.position;
    const body = composeBody(
      [
        ['Position', f.position],
        ['Name', f.name],
        ['Phone', f.phone],
        ['Email', f.email],
        ['Location', f.location],
        ['Qualification', f.qualification],
        ['Message', f.message]
      ],
      'Resume attached.'
    );
    setDraft({ subject, body });
    window.location.href = mailtoUrl(subject, body);
  }

  return (
    <form className="form" onSubmit={submit}>
      <h3>Apply now</h3>
      <p>
        Fill in your details, then attach your resume to the email this
        prepares. We cannot receive a file through this website.
      </p>

      <label>
        Position
        <select required value={f.position} onChange={set('position')}>
          <option value="">Select position</option>
          {positions.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>

      <div className="two">
        <label>
          Name
          <input required value={f.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label>
          Phone
          <input
            required
            type="tel"
            value={f.phone}
            onChange={set('phone')}
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
      </div>

      <label>
        Email
        <input
          required
          type="email"
          value={f.email}
          onChange={set('email')}
          autoComplete="email"
        />
      </label>

      <label>
        Location
        <input value={f.location} onChange={set('location')} />
      </label>

      <label>
        Qualification
        <input value={f.qualification} onChange={set('qualification')} />
      </label>

      <label>
        Message
        <textarea rows="4" value={f.message} onChange={set('message')} />
      </label>

      <button className="btn primary full" type="submit">
        Prepare Application <Send size={16} />
      </button>

      {draft && (
        <ReadyToSend
          subject={draft.subject}
          body={draft.body}
          attachNote="Attach your resume to the email before you send it."
        />
      )}
    </form>
  );
}
