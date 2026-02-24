'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getMessages, MessageRecord } from '@/services/api';

export default function HistoryPage() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'email' | 'mobile' | 'sent' | 'failed'>('all');

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getMessages();
      if (result.success && result.data) {
        setMessages(result.data as MessageRecord[]);
      } else {
        setError(result.error || 'Failed to load messages.');
      }
    } catch {
      setError('Network error: Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filteredMessages = messages.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'email') return m.contactType === 'email';
    if (filter === 'mobile') return m.contactType === 'mobile';
    if (filter === 'sent') return m.status === 'sent';
    if (filter === 'failed') return m.status === 'failed';
    return true;
  });

  const sentCount = messages.filter((m) => m.status === 'sent').length;
  const failedCount = messages.filter((m) => m.status === 'failed').length;
  const emailCount = messages.filter((m) => m.contactType === 'email').length;
  const smsCount = messages.filter((m) => m.contactType === 'mobile').length;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Header */}
      <div className="history-header">
        <h1 className="history-title">
          Message{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #818cf8, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            History
          </span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {!loading && (
            <span className="history-count">{messages.length} total</span>
          )}
          <button
            onClick={fetchMessages}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            id="btn-refresh-history"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {!loading && messages.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem',
          }}
        >
          {[
            { label: 'Total', value: messages.length, icon: '📋', color: 'var(--primary-light)' },
            { label: 'Sent', value: sentCount, icon: '✅', color: '#6ee7b7' },
            { label: 'Failed', value: failedCount, icon: '❌', color: '#fca5a5' },
            { label: 'Emails', value: emailCount, icon: '📧', color: '#67e8f9' },
            { label: 'SMS', value: smsCount, icon: '📱', color: '#d8b4fe' },
          ].map(({ label, value, icon, color }) => (
            <div
              key={label}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter Tabs */}
      {!loading && messages.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {(['all', 'email', 'mobile', 'sent', 'failed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
                ...(filter === f
                  ? {
                      background: 'var(--primary)',
                      color: 'white',
                      borderColor: 'var(--primary)',
                      boxShadow: '0 2px 12px var(--primary-glow)',
                    }
                  : {
                      background: 'var(--surface)',
                      color: 'var(--text-secondary)',
                      borderColor: 'var(--border)',
                    }),
              }}
              id={`filter-${f}`}
            >
              {f === 'all' ? `All (${messages.length})` : f}
            </button>
          ))}
        </div>
      )}

      {/* States */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner" />
          <span>Loading messages...</span>
        </div>
      )}

      {!loading && error && (
        <div
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#fca5a5', marginBottom: '1rem' }}>⚠️ {error}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Make sure the backend server is running on{' '}
            <code style={{ fontFamily: 'monospace', color: 'var(--primary-light)' }}>
              {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}
            </code>
          </p>
        </div>
      )}

      {!loading && !error && messages.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">No messages yet</p>
          <p className="empty-state-sub">
            Go to the{' '}
            <Link
              href="/send"
              style={{ color: 'var(--primary-light)', fontWeight: 600 }}
            >
              Send page
            </Link>{' '}
            to send your first message.
          </p>
        </div>
      )}

      {!loading && !error && filteredMessages.length === 0 && messages.length > 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p className="empty-state-text">No matches for this filter</p>
          <p className="empty-state-sub">Try a different filter above.</p>
        </div>
      )}

      {/* Message List */}
      {!loading && !error && filteredMessages.length > 0 && (
        <div className="messages-list">
          {filteredMessages.map((msg) => (
            <div key={msg._id} className="message-row">
              {/* Type icon */}
              <div
                className={`message-type-icon ${
                  msg.contactType === 'email' ? 'type-icon-email' : 'type-icon-sms'
                }`}
              >
                {msg.contactType === 'email' ? '📧' : '📱'}
              </div>

              {/* Content */}
              <div style={{ minWidth: 0 }}>
                <div className="message-contact">{msg.contact}</div>
                <div className="message-body" title={msg.message}>
                  {msg.message}
                </div>
                <div className="message-time">{formatDate(msg.createdAt)}</div>
              </div>

              {/* Status */}
              <div className="message-status-col">
                <span
                  className={`status-pill ${
                    msg.status === 'sent' ? 'status-sent' : 'status-failed'
                  }`}
                >
                  {msg.status}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    textTransform: 'capitalize',
                  }}
                >
                  {msg.contactType}
                </span>
                {msg.status === 'failed' && msg.errorDetails && (
                  <span
                    title={msg.errorDetails}
                    style={{
                      fontSize: '0.7rem',
                      color: '#fca5a5',
                      cursor: 'help',
                      maxWidth: 120,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ⚠️ hover for details
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
