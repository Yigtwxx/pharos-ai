'use client';
import { useState } from 'react';
import { CheckCircle, MapPin, Clock } from 'lucide-react';
import mockEventsRaw from '@/data/mockEvents.json';

interface Event {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  importance: number;
  topic: string;
  region: string;
  verified: boolean;
  type?: string;
}

const flattenEvents = (raw: any): Event[] => {
  const map: Record<string, any[]> = raw.events || raw;
  const flat: Event[] = [];
  Object.entries(map).forEach(([topic, evs]) => {
    if (Array.isArray(evs)) evs.forEach((e: any) => flat.push({ ...e, topic: e.topic || topic }));
  });
  return flat.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const SEV: Record<number, { label: string; color: string; bg: string; border: string }> = {
  3: { label: 'CRITICAL', color: '#dc2626', bg: '#fef2f2', border: '#dc2626' },
  2: { label: 'HIGH',     color: '#f97316', bg: '#fff7ed', border: '#f97316' },
  1: { label: 'STANDARD', color: '#64748b', bg: '#f8fafc', border: '#64748b' },
};

const FILTER_PILLS = [
  { key: 'all', label: 'All' },
  { key: '3',   label: 'Critical' },
  { key: '2',   label: 'High' },
  { key: '1',   label: 'Standard' },
];

interface Props { selectedTopic: string; }

export const EventTimeline = ({ selectedTopic }: Props) => {
  const [impFilter, setImpFilter]   = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const all = flattenEvents(mockEventsRaw);
  const filtered = all.filter(e => {
    const topicOk = selectedTopic === 'all' || e.topic.toLowerCase().replace(/\s+/g, '-') === selectedTopic;
    const impOk   = impFilter === 'all' || String(e.importance) === impFilter;
    return topicOk && impOk;
  });
  const selected = filtered.find(e => e.id === selectedId) ?? null;

  return (
    <div style={{ display: 'flex', flex: 1, minWidth: 0, overflow: 'hidden' }}>

      {/* ── Event list ──────────────────────────────────────── */}
      <div style={{
        width: 360, minWidth: 360, flexShrink: 0,
        borderRight: '1px solid #e2e8f0',
        background: 'white',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* List header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '2px solid #dd4545',
          background: '#f8fafc',
        }}>
          <div className="news-headline" style={{ fontSize: 16, color: '#0f172a', marginBottom: 8 }}>
            EVENT TIMELINE
          </div>
          {/* Filter pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            {FILTER_PILLS.map(f => (
              <button
                key={f.key}
                onClick={() => setImpFilter(f.key)}
                className="news-meta"
                style={{
                  padding: '3px 10px', borderRadius: 2, fontSize: 10,
                  border: 'none', cursor: 'pointer', fontFamily: 'Arial, sans-serif',
                  background: impFilter === f.key ? '#0f172a' : '#e2e8f0',
                  color: impFilter === f.key ? 'white' : '#64748b',
                  transition: 'all 0.08s',
                }}
              >
                {f.label}
              </button>
            ))}
            <span className="news-meta" style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8' }}>
              {filtered.length} events
            </span>
          </div>
        </div>

        {/* Rows */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '32px 16px', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#94a3b8' }}>
              No events match filter
            </div>
          )}
          {filtered.map(event => {
            const isOn = selectedId === event.id;
            const sev  = SEV[event.importance] ?? SEV[1];
            const t    = new Date(event.timestamp);
            const timeStr = t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

            return (
              <button
                key={event.id}
                onClick={() => setSelectedId(isOn ? null : event.id)}
                style={{
                  width: '100%', textAlign: 'left', display: 'block',
                  padding: '12px 16px',
                  borderLeft: `4px solid ${isOn ? sev.color : 'transparent'}`,
                  borderTop: 'none', borderRight: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  background: isOn ? sev.bg : 'white',
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'background 0.08s',
                }}
                onMouseEnter={e => { if (!isOn) (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
                onMouseLeave={e => { if (!isOn) (e.currentTarget as HTMLElement).style.background = 'white'; }}
              >
                {/* Top row: severity badge + source + time */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <span className="news-meta" style={{
                    fontSize: 9, padding: '2px 5px', borderRadius: 2,
                    background: sev.color, color: 'white',
                  }}>
                    {sev.label}
                  </span>
                  {event.verified && (
                    <CheckCircle size={11} style={{ color: '#16a34a', flexShrink: 0 }} strokeWidth={2} />
                  )}
                  <span className="news-meta" style={{ fontSize: 10, color: '#64748b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {event.topic}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'Arial, sans-serif', color: '#94a3b8', flexShrink: 0 }}>
                    {timeStr}
                  </span>
                </div>

                {/* Title */}
                <p className="news-headline" style={{
                  fontSize: 13, color: '#0f172a', lineHeight: 1.35, marginBottom: 4,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {event.title}
                </p>

                {/* Preview */}
                <p className="news-body" style={{
                  fontSize: 12, color: '#475569',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {event.description?.slice(0, 100)}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Detail pane ─────────────────────────────────────── */}
      <div style={{
        flex: 1, minWidth: 0,
        background: 'white',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {!selected ? (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
          }}>
            <Clock size={40} style={{ color: '#cbd5e1' }} strokeWidth={1} />
            <p className="news-meta" style={{ fontSize: 11, color: '#94a3b8' }}>
              Select an event to read details
            </p>
          </div>
        ) : (
          <EventDetail event={selected} />
        )}
      </div>
    </div>
  );
};

function EventDetail({ event }: { event: Event }) {
  const sev = SEV[event.importance] ?? SEV[1];

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {/* Colored header band */}
      <div style={{
        borderLeft: `6px solid ${sev.color}`,
        borderBottom: '2px solid #e2e8f0',
        padding: '20px 28px',
        background: sev.bg,
      }}>
        {/* Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span className="news-meta" style={{
            fontSize: 10, padding: '3px 8px',
            background: sev.color, color: 'white', borderRadius: 2,
          }}>
            {sev.label}
          </span>
          {event.verified && (
            <span className="news-meta" style={{
              fontSize: 10, padding: '3px 8px',
              background: '#16a34a', color: 'white', borderRadius: 2,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <CheckCircle size={9} strokeWidth={2} />
              VERIFIED
            </span>
          )}
          <span className="news-meta" style={{
            fontSize: 10, padding: '3px 8px',
            background: 'rgba(0,0,0,0.08)', color: '#374151', borderRadius: 2,
          }}>
            {event.topic}
          </span>
        </div>

        {/* Title */}
        <h1 className="news-headline" style={{
          fontSize: 26, color: '#0f172a',
          lineHeight: 1.2, marginBottom: 12,
        }}>
          {event.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={12} style={{ color: '#64748b' }} strokeWidth={1.5} />
            <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Arial, sans-serif' }}>
              {new Date(event.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <MapPin size={12} style={{ color: '#64748b' }} strokeWidth={1.5} />
            <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Arial, sans-serif' }}>
              {event.region}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 28px' }}>

        {/* SUMMARY section */}
        <div className="news-meta" style={{ fontSize: 10, color: '#94a3b8', marginBottom: 10 }}>
          Summary
        </div>
        <div style={{
          borderLeft: `4px solid ${sev.color}`,
          paddingLeft: 16, marginBottom: 28,
        }}>
          <p className="news-body" style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.7 }}>
            {event.description}
          </p>
        </div>

        {/* Priority card */}
        <div className="news-meta" style={{ fontSize: 10, color: '#94a3b8', marginBottom: 10 }}>
          Intelligence Assessment
        </div>
        <div style={{
          border: `1px solid ${sev.color}`,
          borderRadius: 4,
          padding: '16px 20px',
          background: sev.bg,
          display: 'flex', alignItems: 'center', gap: 20,
          marginBottom: 28,
        }}>
          {/* Ring gauge */}
          <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
            <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
              <circle fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="6" cx="32" cy="32" r="26" />
              <circle
                fill="none" stroke={sev.color} strokeWidth="6" strokeLinecap="round"
                cx="32" cy="32" r="26"
                strokeDasharray={(2 * Math.PI * 26).toFixed(1)}
                strokeDashoffset={(2 * Math.PI * 26 * (1 - event.importance / 3)).toFixed(1)}
              />
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="news-headline" style={{ fontSize: 14, color: sev.color }}>
                {Math.round((event.importance / 3) * 100)}%
              </span>
            </div>
          </div>
          <div>
            <div className="news-headline" style={{ fontSize: 15, color: sev.color, marginBottom: 4 }}>
              {event.importance === 3 ? 'High Priority' : event.importance === 2 ? 'Elevated Priority' : 'Standard Priority'}
            </div>
            <p style={{ fontSize: 12, color: '#475569', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
              {event.verified ? 'Source verified.' : 'Source unverified.'}{' '}
              Importance level {event.importance}/3.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
