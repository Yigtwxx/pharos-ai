'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchAvailableTopics } from '@/store/slices/dashboardSlice';

interface Props { selected: string; onSelect: (id: string) => void; }

const SEV_COLOR: Record<string, string> = {
  HIGH:   '#dc2626',
  MEDIUM: '#f97316',
  LOW:    '#64748b',
};

export function TopicSidebar({ selected, onSelect }: Props) {
  const dispatch = useAppDispatch();
  const { topics, loading } = useAppSelector(s => s.dashboard);

  useEffect(() => { dispatch(fetchAvailableTopics()); }, [dispatch]);

  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      background: '#f1f5f9',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px 10px',
        borderBottom: '1px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        <div className="news-meta" style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>
          Monitoring
        </div>
        <div className="news-headline" style={{ fontSize: 14, color: '#0f172a' }}>
          Active Topics
        </div>
      </div>

      {/* Topic list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {loading.topics && (
          <div style={{ padding: '16px', fontSize: 12, color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>
            Loading topics…
          </div>
        )}
        {topics.map(t => {
          const isActive = selected === t.id;
          const sevColor = SEV_COLOR[t.priority] || SEV_COLOR.LOW;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '10px 16px',
                borderLeft: `4px solid ${isActive ? sevColor : 'transparent'}`,
                background: isActive ? 'white' : 'transparent',
                borderTop: 'none', borderRight: 'none', borderBottom: '1px solid #e2e8f0',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.08s',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)'; }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                <span className="news-headline" style={{ fontSize: 12, color: '#0f172a' }}>
                  {t.name}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  fontFamily: 'Arial, sans-serif',
                  padding: '1px 6px',
                  background: isActive ? sevColor : '#e2e8f0',
                  color: isActive ? 'white' : '#64748b',
                  borderRadius: 2,
                }}>
                  {t.active_rss_feeds_count ?? 0}
                </span>
              </div>
              <div className="news-meta" style={{ fontSize: 10, color: sevColor }}>
                {t.priority ?? 'MONITORING'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Intelligence classification filter at bottom */}
      <div style={{
        borderTop: '2px solid #dd4545',
        padding: '12px 16px',
        background: '#f8fafc',
      }}>
        <div className="news-meta" style={{ fontSize: 10, color: '#64748b', marginBottom: 10 }}>
          Classification Filter
        </div>
        {[
          { key: '3', label: 'CRITICAL',  color: '#dc2626', bg: '#fef2f2' },
          { key: '2', label: 'HIGH',      color: '#f97316', bg: '#fff7ed' },
          { key: '1', label: 'STANDARD',  color: '#64748b', bg: '#f8fafc' },
        ].map(({ key, label, color, bg }) => (
          <div key={key} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '4px 0',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
            <span className="news-meta" style={{ fontSize: 10, color: '#374151', flex: 1 }}>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
