'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchDashboardOutlooks } from '@/store/slices/dashboardSlice';
import { Clock, FileText } from 'lucide-react';

interface Props { topicId: string; selectedItem: string | null; onSelect: (id: string) => void; }

const TOPIC_COLORS: Record<string, { color: string; bg: string }> = {
  'middle-east':  { color: '#dc2626', bg: '#fef2f2' },
  'ukraine':      { color: '#2563eb', bg: '#eff6ff' },
  'china-taiwan': { color: '#dc2626', bg: '#fef2f2' },
  'nato':         { color: '#7c3aed', bg: '#f5f3ff' },
  'cyber':        { color: '#16a34a', bg: '#f0fdf4' },
  'default':      { color: '#64748b', bg: '#f8fafc' },
};
function topicStyle(slug: string) { return TOPIC_COLORS[slug] || TOPIC_COLORS.default; }
function slugify(name: string) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

export function FeedPane({ topicId, selectedItem, onSelect }: Props) {
  const dispatch = useAppDispatch();
  const { latestOutlooks, loading } = useAppSelector(s => s.dashboard);

  useEffect(() => { dispatch(fetchDashboardOutlooks()); }, [dispatch]);

  const items = topicId === 'all'
    ? latestOutlooks
    : latestOutlooks.filter(o => o.topic_id === topicId || slugify(o.topic_name) === topicId);

  const title = topicId === 'all'
    ? 'All Topics'
    : (latestOutlooks.find(o => o.topic_id === topicId)?.topic_name ?? 'Topic');

  return (
    <div style={{
      width: 340, minWidth: 340, flexShrink: 0,
      borderRight: '1px solid #e2e8f0',
      background: 'white',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '2px solid #dd4545',
        background: '#f8fafc',
      }}>
        <div className="news-meta" style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>
          Intelligence Briefings
        </div>
        <div className="news-headline" style={{ fontSize: 16, color: '#0f172a' }}>
          {title.toUpperCase()}
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>
          {items.length} topic{items.length !== 1 ? 's' : ''} monitored
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading.outlooks && (
          <div style={{ padding: '24px 16px', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#94a3b8' }}>Loading…</div>
        )}
        {!loading.outlooks && items.length === 0 && (
          <div style={{ padding: '48px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <FileText size={32} style={{ color: '#cbd5e1' }} strokeWidth={1} />
            <p style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>No outlooks available</p>
          </div>
        )}
        {items.map(item => {
          const isSelected = selectedItem === item.topic_id;
          const slug = slugify(item.topic_name);
          const ts = topicStyle(slug);
          const outlook = item.latest_outlook;

          return (
            <button
              key={item.topic_id}
              onClick={() => onSelect(item.topic_id)}
              style={{
                width: '100%', textAlign: 'left', display: 'block',
                padding: '14px 16px',
                borderLeft: `4px solid ${isSelected ? ts.color : 'transparent'}`,
                borderTop: 'none', borderRight: 'none',
                borderBottom: '1px solid #e2e8f0',
                background: isSelected ? ts.bg : 'white',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background 0.08s',
              }}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
              onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'white'; }}
            >
              {/* Topic pill + date */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="news-meta" style={{
                  fontSize: 9, padding: '2px 6px', borderRadius: 2,
                  background: ts.color, color: 'white',
                }}>
                  {item.topic_name}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>
                  {outlook?.date ?? '—'}
                </span>
              </div>

              {/* Title */}
              <p className="news-headline" style={{
                fontSize: 13, color: '#0f172a', lineHeight: 1.35, marginBottom: 5,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {outlook?.title ?? 'No outlook yet'}
              </p>

              {/* Summary */}
              <p className="news-body" style={{
                fontSize: 12, color: '#64748b', lineHeight: 1.4,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {outlook?.summary ?? 'No recent intelligence briefing.'}
              </p>

              {/* Meta */}
              {outlook && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>
                    <Clock size={10} strokeWidth={1.5} />
                    {outlook.readTime}
                  </span>
                  {outlook.sourceCount != null && (
                    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>
                      {outlook.sourceCount} sources
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
