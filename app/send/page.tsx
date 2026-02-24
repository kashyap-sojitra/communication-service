import type { Metadata } from 'next';
import SendForm from '@/components/SendForm';

export const metadata: Metadata = {
  title: 'Send Message — Unified Communication Service',
  description:
    'Send an email or SMS from a single form. Enter an email address or phone number and your message — delivery is handled automatically.',
};

export default function SendPage() {
  return (
    <>
      {/* Page Header */}
      <div className="send-page-header">
        <h1 className="send-page-title">
          Send a{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #818cf8, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Message
          </span>
        </h1>
        <p className="send-page-subtitle">
          Enter an email or phone number — we'll route it to the right channel automatically.
        </p>
      </div>

      {/* Form */}
      <SendForm />
      <div
        style={{
          maxWidth: 580,
          margin: '2.5rem auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        {[
          { step: '1', label: 'Enter contact', icon: '✍️' },
          { step: '2', label: 'Type your message', icon: '💬' },
          { step: '3', label: 'Delivered & logged', icon: '✅' },
        ].map(({ step, label, icon }) => (
          <div
            key={step}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 0.75rem',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{icon}</div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--primary-light)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: 4,
              }}
            >
              Step {step}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
