'use client';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { Clock, Globe, FileText, ArrowRight, BookOpen } from 'lucide-react';

interface Props { itemId: string | null; }

const TOPIC_COLORS: Record<string, { color: string; bg: string }> = {
  'middle-east':  { color: '#dc2626', bg: '#fef2f2' },
  'ukraine':      { color: '#2563eb', bg: '#eff6ff' },
  'china-taiwan': { color: '#dc2626', bg: '#fef2f2' },
  'nato':         { color: '#7c3aed', bg: '#f5f3ff' },
  'cyber':        { color: '#16a34a', bg: '#f0fdf4' },
  'default':      { color: '#64748b', bg: '#f8fafc' },
};
function slugify(name: string) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function topicStyle(slug: string) { return TOPIC_COLORS[slug] || TOPIC_COLORS.default; }

export function DetailPane({ itemId }: Props) {
  const router = useRouter();
  const { latestOutlooks } = useAppSelector(s => s.dashboard);
  const item = itemId ? latestOutlooks.find(o => o.topic_id === itemId) : null;
  const outlook = item?.latest_outlook ?? null;

  if (!itemId || !item) {
    return (
      <div style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 12,
        background: 'white',
      }}>
        <FileText size={44} style={{ color: '#cbd5e1' }} strokeWidth={1} />
        <p className="news-meta" style={{ fontSize: 11, color: '#94a3b8' }}>Select a topic to read</p>
        <p style={{ fontSize: 12, color: '#cbd5e1', fontFamily: 'Arial, sans-serif' }}>Choose from the list on the left</p>
      </div>
    );
  }

  const slug = slugify(item.topic_name);
  const ts   = topicStyle(slug);

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'white' }}>
      {/* Toolbar */}
      <div style={{
        padding: '10px 20px',
        borderBottom: '1px solid #e2e8f0',
        background: '#f8fafc',
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0,
      }}>
        <span className="news-meta" style={{
          fontSize: 10, padding: '3px 8px', borderRadius: 2,
          background: ts.color, color: 'white',
        }}>
          {item.topic_name}
        </span>
        {outlook?.date && (
          <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>{outlook.date}</span>
        )}
        <div style={{ marginLeft: 'auto' }}>
          {outlook && (
            <button
              onClick={() => router.push(`/outlook/${outlook.id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 2,
                background: '#0f172a', border: 'none',
                fontSize: 11, fontFamily: 'Arial, sans-serif', fontWeight: 600,
                color: 'white', cursor: 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}
            >
              Full Briefing <ArrowRight size={12} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {!outlook ? (
          <div style={{ padding: '64px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <BookOpen size={40} style={{ color: '#cbd5e1' }} strokeWidth={1} />
            <p style={{ fontSize: 14, color: '#94a3b8', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>No recent outlook</p>
            <p style={{ fontSize: 12, color: '#cbd5e1', fontFamily: 'Arial, sans-serif', textAlign: 'center', maxWidth: 280 }}>
              No intelligence briefing has been generated for {item.topic_name} yet.
            </p>
          </div>
        ) : (
          <div>
            {/* Colored top band */}
            <div style={{
              borderLeft: `6px solid ${ts.color}`,
              borderBottom: '2px solid #e2e8f0',
              padding: '20px 28px',
              background: ts.bg,
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span className="news-meta" style={{ fontSize: 10, padding: '3px 8px', borderRadius: 2, background: ts.color, color: 'white' }}>
                  {item.topic_name}
                </span>
                {outlook.confidenceScore != null && (
                  <span className="news-meta" style={{ fontSize: 10, padding: '3px 8px', borderRadius: 2, background: '#16a34a', color: 'white' }}>
                    {Math.round(outlook.confidenceScore * 100)}% CONFIDENCE
                  </span>
                )}
              </div>

              <h1 className="news-headline" style={{ fontSize: 24, color: '#0f172a', lineHeight: 1.25, marginBottom: 12 }}>
                {outlook.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={12} style={{ color: '#64748b' }} strokeWidth={1.5} />
                  <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Arial, sans-serif' }}>
                    {outlook.date} · {outlook.readTime}
                  </span>
                </div>
                {outlook.regions?.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Globe size={12} style={{ color: '#64748b' }} strokeWidth={1.5} />
                    <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Arial, sans-serif' }}>
                      {outlook.regions.join(', ')}
                    </span>
                  </div>
                )}
                {outlook.sourceCount != null && (
                  <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Arial, sans-serif' }}>
                    {outlook.sourceCount} sources
                  </span>
                )}
              </div>
            </div>

            {/* Content body */}
            <div style={{ padding: '24px 28px' }}>
              <div className="news-meta" style={{ fontSize: 10, color: '#94a3b8', marginBottom: 10 }}>
                Executive Summary
              </div>
              <div style={{
                borderLeft: `4px solid ${ts.color}`,
                paddingLeft: 16, marginBottom: 28,
              }}>
                <p className="news-body" style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.7 }}>
                  {outlook.summary}
                </p>
              </div>

              <button
                onClick={() => router.push(`/outlook/${outlook.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '12px 16px', borderRadius: 2,
                  background: '#0f172a', border: 'none',
                  fontSize: 12, fontFamily: 'Arial, sans-serif', fontWeight: 700,
                  color: 'white', cursor: 'pointer',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}
              >
                Read Full Intelligence Briefing
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
