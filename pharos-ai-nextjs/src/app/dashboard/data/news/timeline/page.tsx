'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { RSS_FEEDS } from '@/data/rssFeeds';
import { NewsTimeline } from '@/components/news/NewsTimeline';
import Link from 'next/link';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  creator?: string;
  isoDate?: string;
  categories?: string[];
  imageUrl?: string;
}

const clientCache = new Map<string, { items: FeedItem[]; fetchedAt: number }>();
const CLIENT_FRESH_TTL = 5 * 60 * 1000;

export default function TimelinePage() {
  const [feedData, setFeedData] = useState<Map<string, FeedItem[]>>(new Map());
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchFeeds = useCallback(async () => {
    setRefreshing(true);
    try {
      const allIds = RSS_FEEDS.map(f => f.id);
      const staleIds = allIds.filter(id => {
        const cached = clientCache.get(id);
        return !cached || Date.now() - cached.fetchedAt > CLIENT_FRESH_TTL;
      });

      if (staleIds.length === 0) {
        const map = new Map<string, FeedItem[]>();
        allIds.forEach(id => {
          const cached = clientCache.get(id);
          if (cached) map.set(id, cached.items);
        });
        setFeedData(map);
        setRefreshing(false);
        return;
      }

      const res = await fetch('/api/rss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: staleIds }),
      });
      const data = await res.json();
      const now = Date.now();

      for (const feed of data.feeds ?? []) {
        if (feed.items?.length > 0) {
          clientCache.set(feed.feedId, { items: feed.items, fetchedAt: now });
        }
      }

      const map = new Map<string, FeedItem[]>();
      allIds.forEach(id => {
        const cached = clientCache.get(id);
        if (cached) map.set(id, cached.items);
      });
      setFeedData(map);
      setLastRefresh(now);
    } catch (err) {
      console.error('Feed fetch error:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchFeeds(); }, [fetchFeeds]);
  useEffect(() => {
    intervalRef.current = setInterval(() => fetchFeeds(), 5 * 60 * 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fetchFeeds]);

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2 border-b border-[var(--bd)] bg-[var(--bg-app)] shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/data/news"
            className="mono text-[10px] text-[var(--t4)] hover:text-[var(--t2)] no-underline transition-colors"
          >
            ← FEEDS
          </Link>
          <div className="w-px h-4 bg-[var(--bd)]" />
          <span className="mono text-[10px] font-bold text-[var(--t1)] tracking-wider">
            TIMELINE VIEW
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => fetchFeeds()}
            disabled={refreshing}
            className="flex items-center gap-2 px-2 py-1 rounded text-[9px] mono text-[var(--t4)] hover:text-[var(--t2)] transition-colors disabled:opacity-40"
          >
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
              className={refreshing ? 'animate-spin' : ''}
            >
              <path d="M1 6a5 5 0 0 1 9-3M11 6a5 5 0 0 1-9 3" />
              <path d="M1 1v4h4M11 11v-4h-4" />
            </svg>
            REFRESH
          </button>
          <div className="flex items-center gap-2">
            <div className={`dot ${refreshing ? 'dot-warn' : 'dot-live'}`} />
            <span className="mono text-[9px] text-[var(--t4)]">
              {refreshing ? 'loading...' : lastRefresh ? `${Math.floor((Date.now() - lastRefresh) / 1000)}s ago` : '...'}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <NewsTimeline feedData={feedData} />
    </div>
  );
}
