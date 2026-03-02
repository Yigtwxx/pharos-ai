'use client';

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { RSS_FEEDS, getFeedById, type RssFeed } from '@/data/rssFeeds';

// ─── Types ────────────────────────────────────────────────────

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  creator?: string;
  isoDate?: string;
  imageUrl?: string;
}

interface TimelineArticle {
  id: string;
  title: string;
  link: string;
  snippet: string;
  time: Date;
  feed: RssFeed;
  imageUrl?: string;
}

interface NewsTimelineProps {
  feedData: Map<string, FeedItem[]>;
}

// ─── Perspective colors ───────────────────────────────────────

const PERSPECTIVE_COLORS: Record<string, string> = {
  WESTERN: '#3b82f6',
  US_GOV: '#60a5fa',
  ISRAELI: '#a78bfa',
  IRANIAN: '#ef4444',
  ARAB: '#f59e0b',
  RUSSIAN: '#f97316',
  CHINESE: '#dc2626',
  INDEPENDENT: '#10b981',
};

// ─── Tier config — distance from spine ────────────────────────
// tier 1 = closest, tier 4 = furthest out

const TIER_OFFSET: Record<number, number> = {
  1: 24,   // wire services — right on the spine
  2: 100,  // major outlets
  3: 200,  // regional / specialist
  4: 310,  // state media / niche
};

const TIER_LABELS: Record<number, string> = {
  1: 'WIRE / PRIMARY',
  2: 'MAJOR GLOBAL',
  3: 'REGIONAL / SPECIALIST',
  4: 'STATE / NICHE',
};

// ─── Helpers ──────────────────────────────────────────────────

function formatHour(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatTimeAgo(d: Date): string {
  const ms = Date.now() - d.getTime();
  if (ms < 60000) return 'just now';
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

// ─── Component ────────────────────────────────────────────────

export function NewsTimeline({ feedData }: NewsTimelineProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTiers, setSelectedTiers] = useState<Set<number>>(new Set([1, 2, 3, 4]));
  const scrollRef = useRef<HTMLDivElement>(null);

  // Merge all feed items into timeline articles, sorted by time
  const articles = useMemo(() => {
    const items: TimelineArticle[] = [];
    feedData.forEach((feedItems, feedId) => {
      const feed = getFeedById(feedId);
      if (!feed) return;
      for (const item of feedItems) {
        const dateStr = item.isoDate ?? item.pubDate;
        if (!dateStr) continue;
        const time = new Date(dateStr);
        if (isNaN(time.getTime())) continue;
        items.push({
          id: `${feedId}-${item.link}-${time.getTime()}`,
          title: item.title,
          link: item.link,
          snippet: item.contentSnippet ?? '',
          time,
          feed,
          imageUrl: item.imageUrl,
        });
      }
    });
    // Sort newest first
    items.sort((a, b) => b.time.getTime() - a.time.getTime());
    return items;
  }, [feedData]);

  // Filter by selected tiers
  const filtered = useMemo(
    () => articles.filter(a => selectedTiers.has(a.feed.tier)),
    [articles, selectedTiers],
  );

  // Group articles into hour buckets for the time markers
  const hourBuckets = useMemo(() => {
    const buckets = new Map<string, { hour: Date; articles: TimelineArticle[] }>();
    for (const article of filtered) {
      const h = new Date(article.time);
      h.setMinutes(0, 0, 0);
      const key = h.toISOString();
      if (!buckets.has(key)) {
        buckets.set(key, { hour: h, articles: [] });
      }
      buckets.get(key)!.articles.push(article);
    }
    return Array.from(buckets.values()).sort((a, b) => b.hour.getTime() - a.hour.getTime());
  }, [filtered]);

  const toggleTier = useCallback((tier: number) => {
    setSelectedTiers(prev => {
      const next = new Set(prev);
      if (next.has(tier)) {
        if (next.size > 1) next.delete(tier); // don't allow empty
      } else {
        next.add(tier);
      }
      return next;
    });
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      {/* Header bar */}
      <div className="px-5 py-2 bg-[var(--bg-2)] border-b border-[var(--bd)] flex items-center gap-4 shrink-0">
        <span className="mono text-[10px] font-bold text-[var(--t2)] tracking-wider">TIMELINE</span>
        <div className="w-px h-4 bg-[var(--bd)]" />

        {/* Tier toggles */}
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(tier => (
            <button
              key={tier}
              onClick={() => toggleTier(tier)}
              className={`
                px-2 py-1 rounded text-[8px] mono font-bold tracking-wider transition-colors
                ${selectedTiers.has(tier)
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-[var(--t4)] border border-transparent hover:text-[var(--t2)]'
                }
              `}
            >
              T{tier} {TIER_LABELS[tier]}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="mono text-[8px] text-[var(--t4)]">
            {filtered.length} articles
          </span>
        </div>
      </div>

      {/* Tier distance legend */}
      <div className="px-5 py-1.5 bg-[var(--bg-1)] border-b border-[var(--bd)] flex items-center gap-6 shrink-0">
        <span className="text-[8px] mono text-[var(--t4)]">PROXIMITY KEY:</span>
        {[1, 2, 3, 4].map(tier => (
          <div key={tier} className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 - tier }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-white/40" />
              ))}
              {Array.from({ length: tier - 1 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-white/10" />
              ))}
            </div>
            <span className="text-[7px] mono text-[var(--t4)]">{TIER_LABELS[tier]}</span>
          </div>
        ))}
      </div>

      {/* Timeline scroll area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 relative">
        <div className="relative min-h-full" style={{ paddingLeft: '80px' }}>
          {/* Vertical spine */}
          <div
            className="absolute top-0 bottom-0 w-px bg-[var(--bd)]"
            style={{ left: '80px' }}
          />

          {/* Hour buckets */}
          {hourBuckets.map(({ hour, articles: bucketArticles }) => (
            <div key={hour.toISOString()} className="relative">
              {/* Hour marker */}
              <div className="sticky top-0 z-10 flex items-center" style={{ paddingLeft: '0' }}>
                <div className="absolute left-0 w-[80px] flex items-center justify-end pr-3">
                  <span className="mono text-[12px] font-bold text-[var(--t2)]">
                    {formatHour(hour)}
                  </span>
                </div>
                {/* Dot on spine */}
                <div
                  className="absolute w-2.5 h-2.5 rounded-full bg-[var(--bg-app)] border-2 border-[var(--t3)]"
                  style={{ left: '76px' }}
                />
                {/* Hour line */}
                <div
                  className="absolute h-px bg-[var(--bd)] opacity-30"
                  style={{ left: '90px', right: '0' }}
                />
              </div>

              {/* Articles in this hour */}
              <div className="py-1">
                {bucketArticles.map((article, idx) => {
                  const color = PERSPECTIVE_COLORS[article.feed.perspective] ?? '#6b7280';
                  const offset = TIER_OFFSET[article.feed.tier] ?? 200;
                  const isHovered = hoveredId === article.id;

                  // Alternate articles left/right of their tier offset to avoid overlap
                  // Each article at its tier's distance, with small vertical spacing
                  return (
                    <div
                      key={article.id}
                      className="relative"
                      style={{ paddingLeft: `${offset}px`, marginBottom: '2px' }}
                    >
                      {/* Connector line from spine to card */}
                      <div
                        className="absolute top-[16px] h-px opacity-20"
                        style={{
                          left: '80px',
                          width: `${offset - 80}px`,
                          backgroundColor: color,
                        }}
                      />

                      {/* Small dot at spine */}
                      <div
                        className="absolute w-1.5 h-1.5 rounded-full top-[14px]"
                        style={{ left: '77px', backgroundColor: color, opacity: 0.5 }}
                      />

                      {/* Article card */}
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block no-underline group"
                        onMouseEnter={() => setHoveredId(article.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <div
                          className={`
                            flex gap-3 px-3 py-2 rounded-md transition-all border
                            ${isHovered
                              ? 'bg-[var(--bg-2)] border-white/15 shadow-lg shadow-black/20'
                              : 'bg-transparent border-transparent hover:bg-[var(--bg-1)]'
                            }
                          `}
                          style={{ maxWidth: 'calc(100vw - 200px)' }}
                        >
                          {/* Source badge + time */}
                          <div className="flex flex-col items-center shrink-0 pt-0.5" style={{ minWidth: '48px' }}>
                            <div
                              className="px-1.5 py-0.5 rounded text-[7px] mono font-bold tracking-wider text-center leading-none"
                              style={{
                                backgroundColor: `${color}20`,
                                color,
                                border: `1px solid ${color}30`,
                              }}
                            >
                              {article.feed.name.length > 10
                                ? article.feed.id.toUpperCase()
                                : article.feed.name.toUpperCase()
                              }
                            </div>
                            <span className="text-[7px] mono text-[var(--t4)] mt-1">
                              {formatHour(article.time)}
                            </span>
                            <span className="text-[7px] mono text-[var(--t4)]">
                              {formatTimeAgo(article.time)}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] text-[var(--t1)] font-medium leading-tight group-hover:text-white line-clamp-2">
                              {article.title}
                            </h4>
                            {isHovered && article.snippet && (
                              <p className="text-[9px] text-[var(--t4)] mt-1 leading-relaxed line-clamp-2 animate-in fade-in duration-150">
                                {article.snippet}
                              </p>
                            )}
                            {/* Tier indicator */}
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 - article.feed.tier }).map((_, i) => (
                                  <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }} />
                                ))}
                              </div>
                              <span className="text-[7px] mono text-[var(--t4)]">
                                {article.feed.country}
                              </span>
                              {article.feed.stateFunded && (
                                <span className="text-[7px] mono text-amber-400/60">STATE</span>
                              )}
                            </div>
                          </div>

                          {/* Image */}
                          {article.imageUrl && (
                            <div className="w-[64px] h-[44px] rounded overflow-hidden shrink-0 bg-[var(--bg-2)] opacity-70 group-hover:opacity-100 transition-opacity">
                              <img
                                src={article.imageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                            </div>
                          )}
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {hourBuckets.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <span className="mono text-[11px] text-[var(--t4)]">No articles for selected tiers</span>
            </div>
          )}

          {/* Bottom spacer */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  );
}
