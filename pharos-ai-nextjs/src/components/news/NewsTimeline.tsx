'use client';

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { getFeedById, type RssFeed } from '@/data/rssFeeds';

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

// ─── Colors ───────────────────────────────────────────────────

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

// ─── Tier → vertical distance from spine (px) ────────────────
// Lower tier = closer to the center line

const TIER_Y_OFFSET: Record<number, number> = {
  1: 8,    // wire — right on the spine
  2: 60,   // major global
  3: 130,  // regional
  4: 200,  // state / niche
};

const TIER_LABELS: Record<number, string> = {
  1: 'WIRE / PRIMARY',
  2: 'MAJOR GLOBAL',
  3: 'REGIONAL',
  4: 'STATE / NICHE',
};

// Card dimensions
const CARD_W = 220;
const CARD_GAP = 12; // horizontal gap between cards at same time
const HOUR_MARKER_W = 60;
const TIME_SLOT_W = CARD_W + CARD_GAP;
const SPINE_Y = 320; // vertical center of the spine in the scrollable area

// ─── Helpers ──────────────────────────────────────────────────

function formatHour(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatTimeAgo(d: Date): string {
  const ms = Date.now() - d.getTime();
  if (ms < 60000) return 'now';
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

  // Merge all feed items into timeline articles, sorted by time (newest first)
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
          id: `${feedId}-${time.getTime()}-${item.link}`,
          title: item.title,
          link: item.link,
          snippet: item.contentSnippet ?? '',
          time,
          feed,
          imageUrl: item.imageUrl,
        });
      }
    });
    items.sort((a, b) => b.time.getTime() - a.time.getTime());
    return items;
  }, [feedData]);

  // Filter by tiers
  const filtered = useMemo(
    () => articles.filter(a => selectedTiers.has(a.feed.tier)),
    [articles, selectedTiers],
  );

  // Layout: assign each article an x position and above/below the spine
  // We place articles left-to-right (newest = leftmost).
  // Alternate above/below, using tier to set distance from spine.
  const layout = useMemo(() => {
    // Track the next available X per "lane" (above-tier, below-tier) to avoid overlap
    const laneNextX: Record<string, number> = {};
    const positioned: {
      article: TimelineArticle;
      x: number;
      above: boolean;
      yOffset: number; // distance from spine
    }[] = [];

    // Also place hour markers
    const hourMarkers: { hour: Date; x: number }[] = [];
    let lastHourStr = '';

    let globalIdx = 0;

    for (const article of filtered) {
      const tier = article.feed.tier;
      const yOffset = TIER_Y_OFFSET[tier] ?? 130;

      // Alternate above/below: even index = above, odd = below
      const above = globalIdx % 2 === 0;
      const laneKey = `${above ? 'a' : 'b'}-${tier}`;

      // Find x: max of global position and lane availability
      const globalX = globalIdx * TIME_SLOT_W;
      const laneX = laneNextX[laneKey] ?? 0;
      const x = Math.max(globalX, laneX);

      laneNextX[laneKey] = x + CARD_W + CARD_GAP;

      // Hour marker
      const hourStr = formatHour(article.time).slice(0, 2); // just the hour
      if (hourStr !== lastHourStr) {
        hourMarkers.push({ hour: new Date(article.time), x });
        lastHourStr = hourStr;
      }

      positioned.push({ article, x, above, yOffset });
      globalIdx++;
    }

    const totalWidth = Math.max(
      (globalIdx + 1) * TIME_SLOT_W,
      800, // minimum
    );

    return { positioned, hourMarkers, totalWidth };
  }, [filtered]);

  const toggleTier = useCallback((tier: number) => {
    setSelectedTiers(prev => {
      const next = new Set(prev);
      if (next.has(tier)) {
        if (next.size > 1) next.delete(tier);
      } else {
        next.add(tier);
      }
      return next;
    });
  }, []);

  // Scroll to left (newest) on mount
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, []);

  // Calculate total height needed
  const maxAbove = SPINE_Y;
  const maxBelow = SPINE_Y;
  const totalHeight = maxAbove + maxBelow + 40;

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
          <span className="mono text-[8px] text-[var(--t4)]">{filtered.length} articles</span>
          <span className="mono text-[7px] text-[var(--t4)]">← newest · oldest →</span>
        </div>
      </div>

      {/* Scrollable timeline area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-auto min-h-0"
      >
        <div
          className="relative"
          style={{
            width: `${layout.totalWidth + 100}px`,
            height: `${totalHeight}px`,
            minHeight: '100%',
          }}
        >
          {/* ─── Horizontal spine ─── */}
          <div
            className="absolute left-0 right-0 h-px bg-[var(--t4)]"
            style={{ top: `${SPINE_Y}px`, opacity: 0.3 }}
          />
          {/* Spine glow */}
          <div
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${SPINE_Y}px`,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent)',
            }}
          />

          {/* ─── "IMPORTANT" / "NICHE" labels ─── */}
          <div
            className="absolute mono text-[8px] text-[var(--t4)] tracking-widest"
            style={{ top: `${SPINE_Y - 20}px`, left: '12px', opacity: 0.3 }}
          >
            ▲ IMPORTANT
          </div>
          <div
            className="absolute mono text-[8px] text-[var(--t4)] tracking-widest"
            style={{ top: `${SPINE_Y + 10}px`, left: '12px', opacity: 0.3 }}
          >
            ▼ NICHE
          </div>

          {/* ─── Hour markers on spine ─── */}
          {layout.hourMarkers.map(({ hour, x }) => (
            <div key={hour.toISOString()} className="absolute" style={{ left: `${x + 50}px`, top: `${SPINE_Y - 10}px` }}>
              {/* Marker line */}
              <div className="absolute w-px h-5 bg-[var(--t4)]" style={{ left: '0', top: '0', opacity: 0.4 }} />
              {/* Label */}
              <div
                className="absolute mono text-[10px] font-bold text-[var(--t3)] whitespace-nowrap"
                style={{ left: '-16px', top: '22px' }}
              >
                {formatHour(hour)}
              </div>
              {/* Dot */}
              <div
                className="absolute w-2 h-2 rounded-full bg-[var(--bg-app)] border border-[var(--t3)]"
                style={{ left: '-3px', top: '7px' }}
              />
            </div>
          ))}

          {/* ─── Article cards ─── */}
          {layout.positioned.map(({ article, x, above, yOffset }) => {
            const color = PERSPECTIVE_COLORS[article.feed.perspective] ?? '#6b7280';
            const isHovered = hoveredId === article.id;

            // Card position: above spine = spine - offset - cardHeight, below = spine + offset
            // We estimate card height as ~110px (with image ~130px)
            const estimatedCardH = article.imageUrl ? 140 : 100;
            const cardTop = above
              ? SPINE_Y - yOffset - estimatedCardH
              : SPINE_Y + yOffset + 16;

            // Connector line: from card edge to spine
            const connectorTop = above ? cardTop + estimatedCardH : SPINE_Y;
            const connectorH = above
              ? SPINE_Y - (cardTop + estimatedCardH)
              : cardTop - SPINE_Y;

            return (
              <div key={article.id}>
                {/* Connector line */}
                <div
                  className="absolute transition-opacity"
                  style={{
                    left: `${x + CARD_W / 2 + 50}px`,
                    top: `${connectorTop}px`,
                    width: '1px',
                    height: `${Math.max(connectorH, 0)}px`,
                    backgroundColor: color,
                    opacity: isHovered ? 0.5 : 0.15,
                  }}
                />
                {/* Dot on spine */}
                <div
                  className="absolute w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    left: `${x + CARD_W / 2 + 50 - 3}px`,
                    top: `${SPINE_Y - 3}px`,
                    backgroundColor: color,
                    opacity: isHovered ? 0.9 : 0.4,
                    transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                  }}
                />

                {/* Card */}
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute block no-underline group"
                  style={{
                    left: `${x + 50}px`,
                    top: `${cardTop}px`,
                    width: `${CARD_W}px`,
                  }}
                  onMouseEnter={() => setHoveredId(article.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className={`
                      rounded-md border transition-all overflow-hidden
                      ${isHovered
                        ? 'bg-[var(--bg-2)] border-white/20 shadow-xl shadow-black/30 scale-[1.02]'
                        : 'bg-[var(--bg-1)] border-[var(--bd)] hover:border-white/10'
                      }
                    `}
                  >
                    {/* Image */}
                    {article.imageUrl && (
                      <div className="w-full h-[72px] overflow-hidden bg-[var(--bg-2)]">
                        <img
                          src={article.imageUrl}
                          alt=""
                          className={`w-full h-full object-cover transition-opacity ${isHovered ? 'opacity-100' : 'opacity-60'}`}
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                        />
                      </div>
                    )}

                    <div className="px-2.5 py-2">
                      {/* Source + time row */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <div
                          className="px-1 py-0 rounded text-[7px] mono font-bold leading-tight"
                          style={{
                            backgroundColor: `${color}20`,
                            color,
                            border: `1px solid ${color}30`,
                          }}
                        >
                          {article.feed.name.length > 12
                            ? article.feed.id.toUpperCase()
                            : article.feed.name.toUpperCase()
                          }
                        </div>
                        {article.feed.stateFunded && (
                          <span className="text-[6px] mono font-bold text-amber-400/70">STATE</span>
                        )}
                        <span className="text-[7px] mono text-[var(--t4)] ml-auto">
                          {formatHour(article.time)} · {formatTimeAgo(article.time)}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-[10px] text-[var(--t1)] font-medium leading-tight group-hover:text-white line-clamp-2">
                        {article.title}
                      </h4>

                      {/* Snippet on hover */}
                      {isHovered && article.snippet && (
                        <p className="text-[8px] text-[var(--t4)] mt-1 leading-relaxed line-clamp-2">
                          {article.snippet}
                        </p>
                      )}

                      {/* Tier dots */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 - article.feed.tier }).map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }} />
                          ))}
                          {Array.from({ length: article.feed.tier - 1 }).map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full bg-white/10" />
                          ))}
                        </div>
                        <span className="text-[7px] mono text-[var(--t4)]">{article.feed.country}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div
              className="absolute flex items-center justify-center"
              style={{ top: `${SPINE_Y - 20}px`, left: '100px' }}
            >
              <span className="mono text-[11px] text-[var(--t4)]">No articles for selected tiers</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
