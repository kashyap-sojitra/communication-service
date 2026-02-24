import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unified Communication Service — Home',
  description:
    'Send emails and SMS messages from one interface. Auto-detects contact type, saves all messages to MongoDB with delivery tracking.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Email & SMS · MongoDB · Real-time Status
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line1">One Platform.</span>
          <span className="hero-title-gradient">Every Channel.</span>
        </h1>

        <p className="hero-subtitle">
          Send emails and SMS messages from a single form. We automatically detect the contact
          type and route your message through the right channel — every delivery logged and tracked.
        </p>

        <div className="hero-actions">
          <Link href="/send" className="btn-hero-primary" id="cta-send-message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send a Message
          </Link>
          <Link href="/history" className="btn-hero-secondary" id="cta-view-history">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View History
          </Link>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="stats-strip">
        <div className="stat-item">
          <span className="stat-value">2</span>
          <span className="stat-label">Channels</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">&lt;2s</span>
          <span className="stat-label">Response Time</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">100%</span>
          <span className="stat-label">Logged</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">REST</span>
          <span className="stat-label">API</span>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="features-grid" style={{ marginTop: '3.5rem' }}>
        {/* Email */}
        <div className="feature-card" style={{ '--card-accent': 'linear-gradient(90deg, #06b6d4, #0891b2)' } as React.CSSProperties}>
          <div className="feature-card-icon" style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)' }}>
            📧
          </div>
          <h2 className="feature-card-title">Email Delivery</h2>
          <p className="feature-card-desc">
            Enter any email address and we'll send a beautifully formatted HTML email via SMTP
            using Nodemailer. Gmail-compatible with App Password support.
          </p>
        </div>

        {/* SMS */}
        <div className="feature-card" style={{ '--card-accent': 'linear-gradient(90deg, #a855f7, #7c3aed)' } as React.CSSProperties}>
          <div className="feature-card-icon" style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.2)' }}>
            📱
          </div>
          <h2 className="feature-card-title">SMS Delivery</h2>
          <p className="feature-card-desc">
            Enter a phone number and your message is routed to Twilio for global SMS delivery.
            Supports E.164 format with automatic normalization.
          </p>
        </div>

        {/* Auto Detection */}
        <div className="feature-card" style={{ '--card-accent': 'linear-gradient(90deg, #6366f1, #4f46e5)' } as React.CSSProperties}>
          <div className="feature-card-icon" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
            🔍
          </div>
          <h2 className="feature-card-title">Smart Detection</h2>
          <p className="feature-card-desc">
            No channel selection needed. The system auto-detects if your contact is an email
            or phone number and routes accordingly in real time.
          </p>
        </div>

        {/* MongoDB Logging */}
        <div className="feature-card" style={{ '--card-accent': 'linear-gradient(90deg, #10b981, #059669)' } as React.CSSProperties}>
          <div className="feature-card-icon" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}>
            🗄️
          </div>
          <h2 className="feature-card-title">MongoDB Logging</h2>
          <p className="feature-card-desc">
            Every message, sent or failed, is stored in MongoDB with full metadata: contact type,
            delivery status, timestamps, and error details.
          </p>
        </div>

        {/* Validation */}
        <div className="feature-card" style={{ '--card-accent': 'linear-gradient(90deg, #f59e0b, #d97706)' } as React.CSSProperties}>
          <div className="feature-card-icon" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
            ✅
          </div>
          <h2 className="feature-card-title">Full Validation</h2>
          <p className="feature-card-desc">
            Input is validated on both client and server. Email format checks, mobile length
            validation (10–15 digits), and clear error messages for each case.
          </p>
        </div>

        {/* REST API */}
        <div className="feature-card" style={{ '--card-accent': 'linear-gradient(90deg, #ef4444, #dc2626)' } as React.CSSProperties}>
          <div className="feature-card-icon" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}>
            🔌
          </div>
          <h2 className="feature-card-title">REST API</h2>
          <p className="feature-card-desc">
            Clean REST API with <code style={{ fontFamily: 'monospace', fontSize: '0.85em' }}>POST /api/send</code> and{' '}
            <code style={{ fontFamily: 'monospace', fontSize: '0.85em' }}>GET /api/messages</code> endpoints. JSON responses, CORS-enabled.
          </p>
        </div>
      </div>
    </>
  );
}
