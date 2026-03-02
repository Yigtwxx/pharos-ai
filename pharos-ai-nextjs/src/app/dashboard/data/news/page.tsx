'use client';

import { useState } from 'react';
import { CONFLICT_COLLECTIONS } from '@/data/rssFeeds';
import { ConflictBanner } from '@/components/news/ConflictBanner';
import { ChannelView } from '@/components/news/ChannelView';
import { AllFeedsView } from '@/components/news/AllFeedsView';

type ViewMode = 'conflict' | 'all';

export default function NewsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('conflict');
  const [activeChannel, setActiveChannel] = useState(0);
  const [showImages, setShowImages] = useState(false);

  const collection = CONFLICT_COLLECTIONS[0]; // Iran-Israel-US
  const channel = collection.channels[activeChannel];

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Mode toggle + controls */}
      <div className="flex items-center justify-between px-5 py-2 border-b border-[var(--bd)] bg-[var(--bg-app)] shrink-0">
        <div className="flex items-center gap-3">
          <span className="mono text-[10px] font-bold text-[var(--t3)] tracking-wider">
            RSS MONITOR
          </span>
          <div className="w-px h-4 bg-[var(--bd)]" />
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('conflict')}
              className={`px-3 py-1 rounded text-[9px] mono font-bold tracking-wider transition-colors ${
                viewMode === 'conflict'
                  ? 'bg-[var(--danger-dim)] text-[var(--danger)] border border-[var(--danger-bd)]'
                  : 'text-[var(--t4)] hover:text-[var(--t2)]'
              }`}
            >
              CONFLICTS
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1 rounded text-[9px] mono font-bold tracking-wider transition-colors ${
                viewMode === 'all'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-[var(--t4)] hover:text-[var(--t2)]'
              }`}
            >
              ALL FEEDS
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Image toggle */}
          <button
            onClick={() => setShowImages(v => !v)}
            className={`flex items-center gap-2 px-2.5 py-1 rounded text-[9px] mono tracking-wider transition-colors ${
              showImages
                ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                : 'text-[var(--t4)] hover:text-[var(--t2)] border border-transparent'
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="1" y="2" width="10" height="8" rx="1" />
              <circle cx="4" cy="5" r="1" />
              <path d="M1 9 L4 6 L6 8 L8 5 L11 9" />
            </svg>
            IMAGES {showImages ? 'ON' : 'OFF'}
          </button>

          <div className="flex items-center gap-2">
            <div className="dot dot-live" />
            <span className="mono text-[9px] text-[var(--t4)]">Auto-refresh 5min</span>
          </div>
        </div>
      </div>

      {/* Conflict collections */}
      {viewMode === 'conflict' && (
        <>
          <ConflictBanner
            collection={collection}
            activeChannel={activeChannel}
            onChannelChange={setActiveChannel}
          />
          <ChannelView channel={channel} showImages={showImages} />
        </>
      )}

      {/* All feeds view */}
      {viewMode === 'all' && <AllFeedsView showImages={showImages} />}
    </div>
  );
}
