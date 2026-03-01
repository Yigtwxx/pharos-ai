'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  ACTOR_META, PRIORITY_META, STATUS_META, LAYER_DISPLAY,
  FRIENDLY_ACTORS, HOSTILE_ACTORS, ALL_PRIORITIES, ALL_STATUSES,
} from '@/data/mapTokens';
import { STRIKE_ARCS, MISSILE_TRACKS, TARGETS, ALLIED_ASSETS, THREAT_ZONES } from '@/data/mapData';
import { ALL_LAYERS, LAYER_LABEL } from '@/hooks/use-map-filters';

import type { Actor, Priority, MarkerStatus } from '@/data/mapTokens';
import type { FilterState, LayerName } from '@/hooks/use-map-filters';

// ─── Item counts (static, from raw data) ─────────────────────────────────────

function useCounts() {
  return useMemo(() => {
    const all = [...STRIKE_ARCS, ...MISSILE_TRACKS, ...TARGETS, ...ALLIED_ASSETS, ...THREAT_ZONES];
    const byActor:    Partial<Record<Actor, number>>    = {};
    const byPriority: Partial<Record<Priority, number>> = {};
    for (const d of all) {
      byActor[d.actor]       = (byActor[d.actor] ?? 0) + 1;
      byPriority[d.priority] = (byPriority[d.priority] ?? 0) + 1;
    }
    return { byActor, byPriority };
  }, []);
}

// ─── Level 1 layer button — matches the old toolbar style exactly ─────────────

function LayerBtn({ name, isOn, onClick }: { name: LayerName; isOn: boolean; onClick: () => void }) {
  const m = LAYER_DISPLAY[name];
  return (
    <button onClick={onClick} className="mono" style={{
      padding:    '2px 7px',
      borderRadius: 2,
      fontSize:   8,
      fontWeight: 700,
      cursor:     'pointer',
      border:     `1px solid ${isOn ? m.border : 'var(--bd)'}`,
      background: isOn ? m.bg : 'var(--bg-1)',
      color:      isOn ? m.color : 'var(--t4)',
      whiteSpace: 'nowrap',
      letterSpacing: '0.05em',
    }}>
      {LAYER_LABEL[name]}
    </button>
  );
}

// ─── Chip for actor / priority / status ──────────────────────────────────────

function Chip({ label, count, color, isOn, onClick }: {
  label: string; count?: number; color: string; isOn: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="mono" style={{
      padding:    '2px 7px', borderRadius: 2, cursor: 'pointer',
      fontSize:   8, fontWeight: 700, letterSpacing: '0.05em',
      border:     `1px solid ${isOn ? `color-mix(in srgb, ${color} 40%, transparent)` : 'var(--bd-s)'}`,
      background: isOn ? `color-mix(in srgb, ${color} 14%, transparent)` : 'transparent',
      color:      isOn ? color : 'var(--t4)',
      display:    'inline-flex', alignItems: 'center', gap: 3,
      whiteSpace: 'nowrap',
    }}>
      {label}
      {count !== undefined && <span style={{ opacity: 0.6, fontWeight: 400, fontSize: 7 }}>{count}</span>}
    </button>
  );
}

// ─── Level 2: Actor groups ────────────────────────────────────────────────────

function ActorSection({ actors, counts, onToggle }: { actors: Set<Actor>; counts: Partial<Record<Actor, number>>; onToggle: (a: Actor) => void }) {
  return (
    <div style={{ padding: '8px 10px', borderTop: '1px solid var(--bd-s)' }}>
      <p className="label" style={{ color: 'var(--t4)', marginBottom: 5 }}>ACTOR</p>
      <div className="flex flex-wrap gap-1 mb-1">
        {FRIENDLY_ACTORS.map(a => (
          <Chip key={a} label={a} count={counts[a]} color={ACTOR_META[a].cssVar} isOn={actors.has(a)} onClick={() => onToggle(a)} />
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {HOSTILE_ACTORS.map(a => (
          <Chip key={a} label={a} count={counts[a]} color={ACTOR_META[a].cssVar} isOn={actors.has(a)} onClick={() => onToggle(a)} />
        ))}
      </div>
    </div>
  );
}

// ─── Level 3: Priority + Status ──────────────────────────────────────────────

function PrioritySection({ priorities, statuses, priorityCounts, onTogglePriority, onToggleStatus }: {
  priorities: Set<Priority>; statuses: Set<MarkerStatus>;
  priorityCounts: Partial<Record<Priority, number>>;
  onTogglePriority: (p: Priority) => void; onToggleStatus: (s: MarkerStatus) => void;
}) {
  return (
    <div style={{ padding: '8px 10px', borderTop: '1px solid var(--bd-s)' }}>
      <p className="label" style={{ color: 'var(--t4)', marginBottom: 5 }}>PRIORITY</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {ALL_PRIORITIES.map(p => (
          <Chip key={p} label={`${p} — ${PRIORITY_META[p].description.split(' — ')[0]}`}
            count={priorityCounts[p]} color={PRIORITY_META[p].cssVar}
            isOn={priorities.has(p)} onClick={() => onTogglePriority(p)} />
        ))}
      </div>
      <p className="label" style={{ color: 'var(--t4)', marginBottom: 5 }}>STATUS</p>
      <div className="flex flex-wrap gap-1">
        {ALL_STATUSES.map(s => (
          <Chip key={s} label={STATUS_META[s].label} color={STATUS_META[s].cssVar}
            isOn={statuses.has(s)} onClick={() => onToggleStatus(s)} />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = FilterState & {
  onToggleLayer:    (l: LayerName) => void;
  onToggleActor:    (a: Actor) => void;
  onTogglePriority: (p: Priority) => void;
  onToggleStatus:   (s: MarkerStatus) => void;
  onReset:          () => void;
  isFiltered:       boolean;
};

export default function MapFilterPanel(props: Props) {
  const { layers, actors, priorities, statuses, isFiltered } = props;
  const { onToggleLayer, onToggleActor, onTogglePriority, onToggleStatus, onReset } = props;
  const [level, setLevel] = useState(1);
  const counts = useCounts();

  const hasDeepFilter =
    actors.size < 6 || priorities.size < 3 || statuses.size < ALL_STATUSES.length;

  return (
    <div className="flex flex-col" style={{ alignItems: 'flex-end', gap: 4 }}>

      {/* ── Level 1: Layer row ────────────────────────────────────── */}
      <div className="flex items-center gap-1" style={{
        background:   'rgba(28,33,39,0.95)',
        border:       '1px solid var(--bd)',
        borderRadius: 2,
        padding:      '4px 6px',
      }}>
        {ALL_LAYERS.map(l => (
          <LayerBtn key={l} name={l} isOn={layers.has(l)} onClick={() => onToggleLayer(l)} />
        ))}

        {/* Separator */}
        <div style={{ width: 1, height: 14, background: 'var(--bd)', margin: '0 2px', flexShrink: 0 }} />

        {/* Expand toggle */}
        <button
          onClick={() => setLevel(l => l === 1 ? 2 : 1)}
          className="mono"
          style={{
            padding:    '2px 5px',
            borderRadius: 2,
            fontSize:   8,
            cursor:     'pointer',
            border:     `1px solid ${level > 1 || hasDeepFilter ? 'var(--blue)' : 'var(--bd)'}`,
            background: level > 1 || hasDeepFilter ? 'var(--blue-dim)' : 'var(--bg-1)',
            color:      level > 1 || hasDeepFilter ? 'var(--blue-l)' : 'var(--t4)',
            display:    'flex', alignItems: 'center', gap: 2,
          }}
        >
          {hasDeepFilter && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--blue-l)', flexShrink: 0 }} />}
          {level > 1
            ? <ChevronUp   size={9} strokeWidth={2.5} />
            : <ChevronDown size={9} strokeWidth={2.5} />}
        </button>

        {/* Reset — only when filtered */}
        {isFiltered && (
          <button onClick={onReset} className="mono" style={{
            padding: '2px 5px', borderRadius: 2, fontSize: 8, cursor: 'pointer',
            border: '1px solid var(--danger)', background: 'var(--danger-dim)', color: 'var(--danger)',
          }}>
            RESET
          </button>
        )}
      </div>

      {/* ── Level 2+: Dropdown panel ─────────────────────────────── */}
      {level >= 2 && (
        <div style={{ background: 'rgba(28,33,39,0.97)', border: '1px solid var(--bd)', borderRadius: 2, minWidth: 260 }}>

          <ActorSection actors={actors} counts={counts.byActor} onToggle={onToggleActor} />

          {/* Level 3 toggle row */}
          <div style={{ borderTop: '1px solid var(--bd-s)' }}>
            <button onClick={() => setLevel(l => l === 2 ? 3 : 2)}
              className="flex items-center w-full"
              style={{ padding: '5px 10px', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <span className="label" style={{ color: 'var(--t4)' }}>PRIORITY & STATUS</span>
              <span style={{ marginLeft: 'auto', color: 'var(--t4)', display: 'flex' }}>
                {level === 3 ? <ChevronUp size={9} strokeWidth={2.5} /> : <ChevronDown size={9} strokeWidth={2.5} />}
              </span>
            </button>
          </div>

          {level >= 3 && (
            <PrioritySection priorities={priorities} statuses={statuses}
              priorityCounts={counts.byPriority}
              onTogglePriority={onTogglePriority} onToggleStatus={onToggleStatus} />
          )}
        </div>
      )}
    </div>
  );
}
