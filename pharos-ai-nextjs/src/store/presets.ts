// ─── Widget & layout types ──────────────────────────────────────────────────

export type WidgetKey =
  | 'situation' | 'latest' | 'actors' | 'signals' | 'map'
  | 'keyfacts' | 'casualties' | 'commanders' | 'predictions' | 'brief';

export type Column = {
  id: string;
  widgets: WidgetKey[];
};

export const ALL_WIDGET_KEYS: WidgetKey[] = [
  'situation', 'latest', 'actors', 'signals', 'map',
  'keyfacts', 'casualties', 'commanders', 'predictions', 'brief',
];

export const WIDGET_LABELS: Record<WidgetKey, string> = {
  situation:   'Situation Summary',
  latest:      'Latest Events',
  actors:      'Actor Positions',
  signals:     'Field Signals',
  map:         'Intel Map',
  keyfacts:    'Key Facts',
  casualties:  'Casualties',
  commanders:  'Commanders',
  predictions: 'Prediction Markets',
  brief:       'Daily Brief',
};

// ─── Presets ────────────────────────────────────────────────────────────────

export type PresetId = 'analyst' | 'commander' | 'executive';

export type WorkspaceLayout = { columns: Column[] };

export const PRESETS: Record<PresetId, { label: string; description: string; columns: Column[] }> = {
  analyst: {
    label: 'ANALYST',
    description: 'Balanced intelligence view with signals and actors',
    columns: [
      { id: 'col-a', widgets: ['situation', 'latest'] },
      { id: 'col-b', widgets: ['actors', 'signals'] },
      { id: 'col-c', widgets: ['predictions'] },
    ],
  },
  commander: {
    label: 'COMMANDER',
    description: 'Operational focus with map, casualties, and key leaders',
    columns: [
      { id: 'col-a', widgets: ['map'] },
      { id: 'col-b', widgets: ['latest', 'casualties'] },
      { id: 'col-c', widgets: ['commanders', 'keyfacts'] },
    ],
  },
  executive: {
    label: 'EXECUTIVE',
    description: 'High-level brief with predictions and key facts',
    columns: [
      { id: 'col-a', widgets: ['brief'] },
      { id: 'col-b', widgets: ['predictions', 'keyfacts'] },
      { id: 'col-c', widgets: ['situation'] },
    ],
  },
};
