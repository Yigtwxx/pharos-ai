import type {
  Actor,
  Priority,
  MarkerCategory,
  KineticType,
  KineticStatus,
  InstallationType,
  InstallationStatus,
  ZoneType,
} from './mapTokens';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export type { Actor };

export type StrikeArc = {
  id:       string;
  actor:    Actor;
  priority: Priority;
  category: Extract<MarkerCategory, 'KINETIC'>;
  type:     Extract<KineticType, 'AIRSTRIKE' | 'NAVAL_STRIKE'>;
  status:   Extract<KineticStatus, 'COMPLETE'>;
  from:     [number, number];        // [lon, lat]
  to:       [number, number];
  label:    string;
  severity: 'CRITICAL' | 'HIGH';
};

export type MissileTrack = {
  id:       string;
  actor:    Actor;
  priority: Priority;
  category: Extract<MarkerCategory, 'KINETIC'>;
  type:     Extract<KineticType, 'BALLISTIC' | 'CRUISE' | 'DRONE'>;
  status:   Extract<KineticStatus, 'INTERCEPTED' | 'IMPACTED'>;
  from:     [number, number];
  to:       [number, number];
  label:    string;
  severity: 'CRITICAL' | 'HIGH';
};

export type Target = {
  id:          string;
  actor:       Actor;
  priority:    Priority;
  category:    Extract<MarkerCategory, 'INSTALLATION'>;
  type:        InstallationType;
  status:      InstallationStatus;
  name:        string;
  position:    [number, number];     // [lon, lat]
  description: string;
};

export type Asset = {
  id:          string;
  actor:       Actor;
  priority:    Priority;
  category:    Extract<MarkerCategory, 'INSTALLATION'>;
  type:        Extract<InstallationType, 'CARRIER' | 'AIR_BASE' | 'NAVAL_BASE' | 'ARMY_BASE'>;
  status:      InstallationStatus;
  name:        string;
  position:    [number, number];
  description?: string;
};

export type ThreatZone = {
  id:          string;
  actor:       Actor;
  priority:    Priority;
  category:    Extract<MarkerCategory, 'ZONE'>;
  type:        ZoneType;
  name:        string;
  coordinates: [number, number][];
  color:       [number, number, number, number];
};

export type HeatPoint = {
  position: [number, number];
  weight:   number;
};

// ─── Strike arcs ─────────────────────────────────────────────────────────────

export const STRIKE_ARCS: StrikeArc[] = [
  { id: 's1',  actor: 'US',     priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [50.5719, 34.8846], label: 'B-2 Strike: Diego Garcia → Fordow',             severity: 'CRITICAL' },
  { id: 's2',  actor: 'US',     priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [51.7260, 33.7243], label: 'B-2 Strike: Diego Garcia → Natanz',             severity: 'CRITICAL' },
  { id: 's3',  actor: 'US',     priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [51.6625, 32.4355], label: 'B-2 Strike: Diego Garcia → Isfahan',            severity: 'CRITICAL' },
  { id: 's4',  actor: 'US',     priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [51.7757, 35.5194], label: 'B-2 Strike: Diego Garcia → Parchin',            severity: 'CRITICAL' },
  { id: 's5',  actor: 'US',     priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [51.3347, 35.7219], label: 'B-2 Strike: Diego Garcia → IRGC HQ Tehran',     severity: 'CRITICAL' },
  { id: 's6',  actor: 'ISRAEL', priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [50.5719, 34.8846], label: 'IDF Strike: Nevatim → Fordow',                  severity: 'CRITICAL' },
  { id: 's7',  actor: 'ISRAEL', priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [51.7260, 33.7243], label: 'IDF Strike: Nevatim → Natanz',                  severity: 'CRITICAL' },
  { id: 's8',  actor: 'ISRAEL', priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [51.6625, 32.4355], label: 'IDF Strike: Nevatim → Isfahan',                 severity: 'HIGH'     },
  { id: 's9',  actor: 'ISRAEL', priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [49.2310, 34.1902], label: 'IDF Strike: Nevatim → Arak Reactor',            severity: 'HIGH'     },
  { id: 's10', actor: 'ISRAEL', priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [50.8858, 28.8308], label: 'IDF Strike: Nevatim → Bushehr',                 severity: 'HIGH'     },
  { id: 's11', actor: 'ISRAEL', priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.6667, 30.7761], to: [46.3600, 38.0800], label: 'IDF Strike: Ramon → Tabriz Missile Facility',   severity: 'HIGH'     },
  { id: 's12', actor: 'ISRAEL', priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.6667, 30.7761], to: [48.6534, 35.2105], label: 'IDF Strike: Ramon → Shahid Nojeh AFB',          severity: 'HIGH'     },
  { id: 's13', actor: 'US',     priority: 'P2', category: 'KINETIC', type: 'NAVAL_STRIKE', status: 'COMPLETE', from: [58.0,    25.5   ], to: [56.2666, 27.1832], label: 'Naval Strike: USS Ford → IRGC Bandar Abbas',    severity: 'HIGH'     },
  { id: 's14', actor: 'US',     priority: 'P2', category: 'KINETIC', type: 'NAVAL_STRIKE', status: 'COMPLETE', from: [58.0,    25.5   ], to: [50.3248, 29.2352], label: 'Naval Strike: USS Ford → Kharg Island',         severity: 'HIGH'     },
  { id: 's15', actor: 'US',     priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [51.3149, 25.1175], to: [51.4,    35.7   ], label: 'USAF Strike: Al Udeid → Tehran Radar',          severity: 'HIGH'     },
  { id: 's16', actor: 'US',     priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [54.5477, 24.2483], to: [51.5059, 35.7607], label: 'USAF Strike: Al Dhafra → Lavizan Complex',      severity: 'HIGH'     },

  // ── Day 2 strike arcs (March 1) ───────────────────────────────────────────
  { id: 's17', actor: 'US',       priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [50.5719, 34.8846], label: 'B-2 Day 2: Diego Garcia → Fordow (follow-up)',      severity: 'CRITICAL' },
  { id: 's18', actor: 'US',       priority: 'P1', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [51.7260, 33.7243], label: 'B-2 Day 2: Diego Garcia → Natanz (follow-up)',      severity: 'CRITICAL' },
  { id: 's19', actor: 'US',       priority: 'P2', category: 'KINETIC', type: 'NAVAL_STRIKE', status: 'COMPLETE', from: [58.0,    25.5   ], to: [56.2666, 27.1832], label: 'Naval Day 2: USS Ford → IRGC Bandar Abbas (40 TLAMs)', severity: 'CRITICAL' },
  { id: 's20', actor: 'US',       priority: 'P2', category: 'KINETIC', type: 'NAVAL_STRIKE', status: 'COMPLETE', from: [58.0,    25.5   ], to: [60.6223, 25.3467], label: 'Naval Day 2: USS Ford → IRGC Chabahar (destroyed)',  severity: 'HIGH'     },
  { id: 's21', actor: 'US',       priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [51.3149, 25.1175], to: [44.2700, 33.3000], label: 'USAF Day 2: Al Udeid → Kata\'ib Hezbollah Depot Iraq', severity: 'HIGH'     },
  { id: 's22', actor: 'US',       priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [72.4232, -7.3195], to: [44.2066, 15.3694], label: 'B-52 Day 2: Diego Garcia → Houthi Al-Dailami AB',   severity: 'HIGH'     },
  { id: 's23', actor: 'US',       priority: 'P2', category: 'KINETIC', type: 'NAVAL_STRIKE', status: 'COMPLETE', from: [44.0,    12.5   ], to: [42.9541, 14.7969], label: 'Naval Day 2: USS Eisenhower → Houthi Hodeidah',     severity: 'HIGH'     },
  { id: 's24', actor: 'ISRAEL',   priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [35.5184, 33.8706], label: 'IDF NShield: Nevatim → Hezbollah Dahieh, Beirut',   severity: 'HIGH'     },
  { id: 's25', actor: 'ISRAEL',   priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [35.5461, 33.2711], label: 'IDF NShield: Nevatim → Hezbollah S.Lebanon storage', severity: 'HIGH'     },
  { id: 's26', actor: 'ISRAEL',   priority: 'P2', category: 'KINETIC', type: 'AIRSTRIKE',    status: 'COMPLETE', from: [34.9408, 31.2083], to: [36.2165, 34.0042], label: 'IDF NShield: Nevatim → Hezbollah Baalbek HQ',       severity: 'HIGH'     },
];

// ─── Missile tracks ───────────────────────────────────────────────────────────

export const MISSILE_TRACKS: MissileTrack[] = [
  { id: 'm1',  actor: 'IRGC',   priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [51.4,    35.7   ], to: [34.7818, 32.0853], label: 'IRGC Ballistic: Tehran → Tel Aviv (Wave 1)',            severity: 'CRITICAL' },
  { id: 'm2',  actor: 'IRGC',   priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [51.4,    35.7   ], to: [34.8854, 31.9999], label: 'IRGC Ballistic: Tehran → Ben Gurion Airport',           severity: 'CRITICAL' },
  { id: 'm3',  actor: 'IRGC',   priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [51.4,    35.7   ], to: [35.1551, 30.9977], label: 'IRGC Ballistic: Tehran → Dimona (intercepted)',         severity: 'CRITICAL' },
  { id: 'm4',  actor: 'IRGC',   priority: 'P1', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [48.6799, 31.3342], to: [50.5860, 26.2285], label: 'IRGC Ballistic: Ahvaz → NSA Bahrain (HIT)',             severity: 'CRITICAL' },
  { id: 'm5',  actor: 'IRGC',   priority: 'P1', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [56.2666, 27.1832], to: [51.3149, 25.1175], label: 'IRGC Ballistic: Bandar Abbas → Al Udeid Qatar (HIT)',   severity: 'CRITICAL' },
  { id: 'm6',  actor: 'IRGC',   priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [56.2666, 27.1832], to: [54.5477, 24.2483], label: 'IRGC Ballistic: Bandar Abbas → Al Dhafra UAE (HIT)',    severity: 'HIGH'     },
  { id: 'm7',  actor: 'IRGC',   priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [48.6799, 31.3342], to: [47.5186, 29.3467], label: 'IRGC Ballistic: Ahvaz → Ali Al Salem Kuwait (HIT)',    severity: 'HIGH'     },
  { id: 'm8',  actor: 'HOUTHI', priority: 'P3', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [44.2066, 15.3694], to: [34.9408, 31.2083], label: 'Houthi Ballistic: Sanaa → Nevatim AFB (intercepted)',   severity: 'HIGH'     },
  { id: 'm9',  actor: 'HOUTHI', priority: 'P3', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [42.9541, 14.7969], to: [44.0,    12.5   ], label: 'Houthi: Hodeidah → USS Eisenhower (intercepted)',       severity: 'HIGH'     },
  { id: 'm10', actor: 'IRGC',   priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [51.3890, 35.6840], to: [34.7818, 32.0853], label: 'IRGC Ballistic: Imam Ali Base → Tel Aviv (Wave 2)',     severity: 'CRITICAL' },
  { id: 'm11', actor: 'IRGC',   priority: 'P3', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [46.3600, 38.0800], to: [35.0018, 32.7940], label: 'IRGC Ballistic: Tabriz → Haifa (intercepted)',          severity: 'HIGH'     },
  { id: 'm12', actor: 'IRGC',   priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [48.6799, 31.3342], to: [47.5804, 24.0621], label: 'IRGC Ballistic: Ahvaz → Prince Sultan AB Saudi (HIT)', severity: 'HIGH'     },

  // ── Day 2 missile tracks (March 1) ───────────────────────────────────────
  { id: 'm13', actor: 'IRGC',      priority: 'P1', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [48.6799, 31.3342], to: [50.5860, 26.2285], label: 'IRGC Day 2: Ahvaz → NSA Bahrain (HIT — 2 US KIA)',          severity: 'CRITICAL' },
  { id: 'm14', actor: 'IRGC',      priority: 'P1', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [51.3890, 35.6840], to: [51.3149, 25.1175], label: 'IRGC Day 2: Imam Ali Base → Al Udeid Qatar (HIT)',          severity: 'CRITICAL' },
  { id: 'm15', actor: 'IRGC',      priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [51.4,    35.7   ], to: [34.7818, 32.0853], label: 'IRGC Day 2: Tehran → Tel Aviv Wave 2 (intercepted)',        severity: 'CRITICAL' },
  { id: 'm16', actor: 'IRGC',      priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [51.4,    35.7   ], to: [35.1551, 30.9977], label: 'IRGC Day 2: Tehran → Dimona reactor (intercepted)',         severity: 'CRITICAL' },
  { id: 'm17', actor: 'IRGC',      priority: 'P2', category: 'KINETIC', type: 'DRONE',     status: 'INTERCEPTED', from: [51.4,    35.7   ], to: [34.7818, 32.0853], label: 'IRGC Day 2: Shahed swarm Wave 3 → Israel (97/110 down)',  severity: 'HIGH'     },
  { id: 'm18', actor: 'HEZBOLLAH', priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [35.5,    33.2   ], to: [35.0000, 32.7940], label: 'Hezbollah Day 2: S.Lebanon → Haifa (HIT — 4 civilians KIA)', severity: 'HIGH'     },
  { id: 'm19', actor: 'HEZBOLLAH', priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [35.5,    33.3   ], to: [35.5695, 33.2701], label: 'Hezbollah Day 2: S.Lebanon → Kiryat Shmona (intercepted)',  severity: 'HIGH'     },
  { id: 'm20', actor: 'HOUTHI',    priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'INTERCEPTED', from: [44.2066, 15.3694], to: [44.0,    12.5   ], label: 'Houthi Day 2: Sanaa → USS Eisenhower (SM-3 intercept)',    severity: 'HIGH'     },
  { id: 'm21', actor: 'PMF',       priority: 'P2', category: 'KINETIC', type: 'BALLISTIC', status: 'IMPACTED',    from: [44.2700, 33.3000], to: [42.4412, 33.7856], label: 'PMF Day 2: S.Baghdad → Ayn al-Asad Iraq (HIT — 2 US KIA)', severity: 'HIGH'     },
  { id: 'm22', actor: 'HEZBOLLAH', priority: 'P3', category: 'KINETIC', type: 'DRONE',     status: 'INTERCEPTED', from: [35.5184, 33.8706], to: [34.9408, 31.2083], label: 'Hezbollah: Anti-aircraft drone → Nevatim (intercepted)',   severity: 'HIGH'     },
];

// ─── Targets (Iranian installations) ─────────────────────────────────────────

export const TARGETS: Target[] = [
  { id: 't1',  actor: 'IRAN', priority: 'P1', category: 'INSTALLATION', type: 'NUCLEAR_SITE',   status: 'DESTROYED', name: 'Fordow',              position: [50.5719, 34.8846], description: 'Underground U-235 enrichment, 14× GBU-57 MOPs' },
  { id: 't2',  actor: 'IRAN', priority: 'P1', category: 'INSTALLATION', type: 'NUCLEAR_SITE',   status: 'DESTROYED', name: 'Natanz',              position: [51.7260, 33.7243], description: 'Primary enrichment complex, centrifuge halls collapsed' },
  { id: 't3',  actor: 'IRAN', priority: 'P2', category: 'INSTALLATION', type: 'NUCLEAR_SITE',   status: 'DAMAGED',   name: 'Isfahan Nuclear',     position: [51.6625, 32.4355], description: 'UCF and research reactors, partial structural damage' },
  { id: 't4',  actor: 'IRAN', priority: 'P2', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DESTROYED', name: 'Parchin',             position: [51.7757, 35.5194], description: 'High explosive testing, suspected weaponization research' },
  { id: 't5',  actor: 'IRAN', priority: 'P2', category: 'INSTALLATION', type: 'NUCLEAR_SITE',   status: 'DESTROYED', name: 'Arak IR-40',          position: [49.2310, 34.1902], description: 'Heavy water reactor, rendered inoperable' },
  { id: 't6',  actor: 'IRAN', priority: 'P3', category: 'INSTALLATION', type: 'NUCLEAR_SITE',   status: 'DAMAGED',   name: 'Bushehr Plant',       position: [50.8858, 28.8308], description: 'Power plant reactor damaged, IAEA inspection pending' },
  { id: 't7',  actor: 'IRGC', priority: 'P1', category: 'INSTALLATION', type: 'COMMAND',        status: 'DESTROYED', name: 'IRGC HQ Tehran',      position: [51.3347, 35.7219], description: 'Supreme leader compound vicinity, Khamenei KIA confirmed' },
  { id: 't8',  actor: 'IRGC', priority: 'P1', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DESTROYED', name: 'Imam Ali Missile Base', position: [51.3890, 35.6840], description: 'Primary IRBM storage and launch facility' },
  { id: 't9',  actor: 'IRAN', priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',       status: 'DAMAGED',   name: 'Shahid Nojeh AFB',   position: [48.6534, 35.2105], description: 'Iranian Air Force base, runways cratered' },
  { id: 't10', actor: 'IRGC', priority: 'P2', category: 'INSTALLATION', type: 'NAVAL_BASE',     status: 'DAMAGED',   name: 'IRGC Bandar Abbas',   position: [56.2666, 27.1832], description: 'Fast boat fleet, 40% capacity degraded' },
  { id: 't11', actor: 'IRAN', priority: 'P2', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DAMAGED',   name: 'Kharg Island',        position: [50.3248, 29.2352], description: '85% Iranian oil export capacity offline' },
  { id: 't12', actor: 'IRGC', priority: 'P2', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DAMAGED',   name: 'Tabriz Missile Facility', position: [46.3600, 38.0800], description: 'Long-range missile production facility' },
  { id: 't13', actor: 'IRAN', priority: 'P3', category: 'INSTALLATION', type: 'COMMAND',        status: 'STRUCK',    name: 'Lavizan-Shian',       position: [51.5059, 35.7607], description: 'Suspected covert nuclear research complex' },
  { id: 't14', actor: 'IRAN', priority: 'P3', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'STRUCK',    name: 'Imam Khomeini Airport', position: [51.1522, 35.4161], description: 'Partial closure, military logistics disrupted' },
  { id: 't15', actor: 'IRGC', priority: 'P3', category: 'INSTALLATION', type: 'COMMAND',        status: 'DAMAGED',   name: 'IRGC Ahvaz',          position: [48.6799, 31.3342], description: 'Regional IRGC command, missile operations degraded' },
  { id: 't16', actor: 'IRAN', priority: 'P3', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DESTROYED', name: 'Isfahan Drone Base',  position: [51.5,    32.5   ], description: 'Shahid drone production and storage' },
  { id: 't17', actor: 'IRAN', priority: 'P1', category: 'INSTALLATION', type: 'COMMAND',        status: 'DESTROYED', name: 'Khamenei Compound',   position: [51.4,    35.76  ], description: 'Supreme Leader compound — confirmed KIA site' },

  // ── Day 2 targets (March 1) ───────────────────────────────────────────────
  { id: 't18', actor: 'IRGC',      priority: 'P2', category: 'INSTALLATION', type: 'NAVAL_BASE',     status: 'DESTROYED', name: 'IRGC Chabahar Naval Base',           position: [60.6223, 25.3467], description: 'IRGC strategic reserve fleet — 12 Tomahawks, IRIS Damavand frigate destroyed' },
  { id: 't19', actor: 'HEZBOLLAH', priority: 'P2', category: 'INSTALLATION', type: 'COMMAND',        status: 'STRUCK',    name: 'Hezbollah Dahieh HQ, Beirut',        position: [35.5184, 33.8706], description: 'Radwan Force command infrastructure, Haret Hreik district — IDF Op Northern Shield' },
  { id: 't20', actor: 'HEZBOLLAH', priority: 'P2', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DESTROYED', name: 'Hezbollah Baalbek Complex',          position: [36.2165, 34.0042], description: 'Primary Bekaa Valley weapons storage — 5+ buildings destroyed per satellite BDA' },
  { id: 't21', actor: 'HEZBOLLAH', priority: 'P2', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DESTROYED', name: 'Hezbollah S.Lebanon Missile Storage', position: [35.5461, 33.2711], description: 'Falaq-2 and Katyusha rocket storage south of Litani River — 12 strike signatures confirmed' },
  { id: 't22', actor: 'HOUTHI',    priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',       status: 'DESTROYED', name: 'Houthi Al-Dailami AB, Sanaa',        position: [44.2200, 15.4780], description: 'Primary Houthi ballistic missile storage/launch complex — B-52 JASSM-ER strike' },
  { id: 't23', actor: 'HOUTHI',    priority: 'P2', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DESTROYED', name: 'Houthi Drone Factory, Sanaa',        position: [44.1800, 15.3500], description: 'Shahed-136 clone production facility — IRGC-built, destroyed by USAF strike' },
  { id: 't24', actor: 'PMF',       priority: 'P2', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'DESTROYED', name: 'Kata\'ib Hezbollah Depot, Jurf al-Sakhar', position: [44.2700, 33.3000], description: 'Primary weapons and ammunition depot — F-15E precision strike' },
  { id: 't25', actor: 'PMF',       priority: 'P3', category: 'INSTALLATION', type: 'COMMAND',        status: 'STRUCK',    name: 'Kata\'ib Hezbollah Command, Abu Ghraib', position: [44.0600, 33.3800], description: 'KH command node — struck in CENTCOM retaliation for Ayn al-Asad attack' },
  { id: 't26', actor: 'IRAN',      priority: 'P3', category: 'INSTALLATION', type: 'INFRASTRUCTURE', status: 'STRUCK',    name: 'Iranian Early-Warning Radar Network',  position: [46.0,    34.0   ], description: 'SEAD operations Day 2 — IDF and USAF destroyed remaining Bavar-373 and SA-20 coverage across western Iran' },
];

// ─── Allied assets ────────────────────────────────────────────────────────────

export const ALLIED_ASSETS: Asset[] = [
  // ── Carrier Strike Groups — P1 ─────────────────────────────────────────────
  { id: 'a1',  actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'CARRIER',    status: 'ACTIVE', name: 'USS Ford CVN-78',        position: [58.0,    25.5   ], description: 'CSG-12 · Gulf of Oman · F/A-18 sorties ongoing' },
  { id: 'a2',  actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'CARRIER',    status: 'ACTIVE', name: 'USS Eisenhower CVN-69',  position: [44.0,    12.5   ], description: 'CSG-2 · Red Sea / Gulf of Aden · Iron Dome maritime support' },
  { id: 'a3',  actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'CARRIER',    status: 'ACTIVE', name: 'USS Roosevelt CVN-71',   position: [65.0,    21.0   ], description: 'CSG-9 · North Arabian Sea · QRF posture' },
  { id: 'a33', actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'CARRIER',    status: 'ACTIVE', name: 'USS Truman CVN-75',      position: [28.0,    34.5   ], description: 'CSG-8 · Eastern Mediterranean · F/A-18 SEAD/DEAD · Aegis BMD' },

  // ── IDF Air Bases — P1/P2 ─────────────────────────────────────────────────
  { id: 'a4',  actor: 'ISRAEL', priority: 'P1', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Nevatim AFB',            position: [34.9408, 31.2083] },
  { id: 'a5',  actor: 'ISRAEL', priority: 'P1', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Ramon AFB',              position: [34.6667, 30.7761] },
  { id: 'a6',  actor: 'ISRAEL', priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Palmachim AB',           position: [34.6894, 31.8969] },
  { id: 'a7',  actor: 'ISRAEL', priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Tel Nof AB',             position: [34.8219, 31.8394] },
  { id: 'a31', actor: 'ISRAEL', priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Ramat David AFB',        position: [35.1795, 32.6653], description: 'F-16I Sufa · Haifa air defense corridor' },
  { id: 'a32', actor: 'ISRAEL', priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Hatzor AFB',             position: [34.7231, 31.7605], description: 'F-16C/D · Strike and QRA mission' },

  // ── US Bases — Gulf (P1 = struck HQs, P2 = major, P3 = peripheral) ────────
  { id: 'a8',  actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'STRUCK', name: 'Al Udeid AB Qatar',      position: [51.3149, 25.1175], description: 'USAF CENTCOM FWD HQ · 10,000 personnel · Struck — 1 US KIA' },
  { id: 'a9',  actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'STRUCK', name: 'Al Dhafra AB UAE',       position: [54.5477, 24.2483], description: 'F-35A / F-22 operations · Struck by IRGC cruise missile · 1 US KIA' },
  { id: 'a10', actor: 'US',     priority: 'P2', category: 'INSTALLATION', type: 'ARMY_BASE',  status: 'STRUCK', name: 'Ali Al Salem AB Kuwait',  position: [47.5186, 29.3467] },
  { id: 'a11', actor: 'US',     priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'STRUCK', name: 'Prince Sultan AB',       position: [47.5804, 24.0621] },
  { id: 'a12', actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'NAVAL_BASE', status: 'STRUCK', name: 'NSA Bahrain (5th Fleet)', position: [50.5860, 26.2285], description: 'US 5th Fleet HQ · Struck — 2 US KIA' },
  { id: 'a13', actor: 'US',     priority: 'P1', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Diego Garcia',           position: [72.4232, -7.3195], description: 'USAF/USN BIOT · B-2 Spirit launch origin · ~7,000km from targets' },
  { id: 'a14', actor: 'US',     priority: 'P3', category: 'INSTALLATION', type: 'ARMY_BASE',  status: 'ACTIVE', name: 'Al-Tanf Base Syria',     position: [38.6,    33.5   ] },
  { id: 'a15', actor: 'US',     priority: 'P2', category: 'INSTALLATION', type: 'ARMY_BASE',  status: 'ACTIVE', name: 'Ayn al-Asad Iraq',       position: [42.4412, 33.7856] },
  { id: 'a16', actor: 'US',     priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Erbil Air Base',         position: [44.0901, 36.2337], description: 'USAF FOL · Iraqi Kurdistan · F-15E/AWACS ops' },
  { id: 'a17', actor: 'US',     priority: 'P2', category: 'INSTALLATION', type: 'ARMY_BASE',  status: 'ACTIVE', name: 'Camp Arifjan',           position: [48.0400, 29.2000], description: '1st TSC HQ · Kuwait · ~20,000 US troops' },
  { id: 'a18', actor: 'US',     priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Al Jaber AB',            position: [47.7886, 29.0925], description: 'USAF/KUAF joint · A-10C / F-16 rotational' },
  { id: 'a19', actor: 'US',     priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Thumrait AB',            position: [54.0247, 17.6694], description: 'USAF FOL · Oman · B-52H staging, KC-135 tankers' },
  { id: 'a20', actor: 'US',     priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Masirah Island AB',      position: [58.9033, 20.6681], description: 'USAF/USN · Oman · P-8A Poseidon maritime patrol' },
  { id: 'a21', actor: 'US',     priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Camp Lemonnier',         position: [43.1471, 11.5466], description: 'AFRICOM primary · Djibouti · ~4,000 personnel · JSOC hub' },
  { id: 'a22', actor: 'US',     priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Muwaffaq Salti AB',      position: [36.7922, 32.3566], description: 'USAF FOL · Jordan · F-22 / F-16 rotational' },
  { id: 'a23', actor: 'US',     priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'King Faisal AB Tabuk',   position: [36.6189, 28.3654], description: 'USAF rotational · NW Saudi Arabia' },
  { id: 'a24', actor: 'US',     priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'King Khalid AB Khamis',  position: [42.8000, 18.3000], description: 'USAF · Patriot battery + F-15C air defense cover' },
  { id: 'a25', actor: 'US',     priority: 'P3', category: 'INSTALLATION', type: 'NAVAL_BASE', status: 'ACTIVE', name: 'Fujairah Naval Facility', position: [56.3394, 25.1217], description: 'USN fueling · Outside Strait of Hormuz' },

  // ── NATO Bases — P2/P3 ────────────────────────────────────────────────────
  { id: 'a26', actor: 'NATO',   priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Incirlik AB',            position: [35.4259, 37.0021], description: 'USAF/NATO · Turkey · B61 nuclear store · ~1,500 US personnel' },
  { id: 'a27', actor: 'NATO',   priority: 'P2', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'RAF Akrotiri',           position: [32.9883, 34.5903], description: 'UK sovereign base · Cyprus · Typhoon FGR4 · Sentinel R1 ISR' },
  { id: 'a28', actor: 'NATO',   priority: 'P3', category: 'INSTALLATION', type: 'NAVAL_BASE', status: 'ACTIVE', name: 'Souda Bay Naval Base',   position: [24.0739, 35.4935], description: 'US/NATO · Crete · DDG/CG port calls · P-8 Poseidon' },
  { id: 'a29', actor: 'NATO',   priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'NAS Sigonella',          position: [14.9228, 37.4017], description: 'USAF/USN · Sicily · P-8A, MQ-4C Triton, C-17 logistics' },
  { id: 'a30', actor: 'NATO',   priority: 'P3', category: 'INSTALLATION', type: 'AIR_BASE',   status: 'ACTIVE', name: 'Aviano AB',              position: [12.5978, 46.0313], description: 'USAF 31st FW · NE Italy · F-16C/D · Nuclear sharing DCA' },
];

// ─── Threat zones ─────────────────────────────────────────────────────────────

export const THREAT_ZONES: ThreatZone[] = [
  {
    id: 'z1', actor: 'IRGC', priority: 'P1', category: 'ZONE', type: 'CLOSURE',
    name: 'Strait of Hormuz Closure',
    coordinates: [[56.0, 26.7], [57.0, 26.5], [57.5, 26.0], [57.0, 25.5], [56.5, 25.6], [56.0, 26.0], [56.0, 26.7]],
    color: [220, 50, 50, 80],
  },
  {
    id: 'z2', actor: 'IRGC', priority: 'P2', category: 'ZONE', type: 'PATROL',
    name: 'IRGC Persian Gulf Patrol',
    coordinates: [[50.0, 26.0], [56.0, 26.5], [57.5, 24.5], [55.0, 23.5], [51.0, 24.0], [50.0, 26.0]],
    color: [220, 150, 50, 60],
  },
  {
    id: 'z3', actor: 'IRAN', priority: 'P2', category: 'ZONE', type: 'NFZ',
    name: 'Iran Declared NFZ',
    coordinates: [[44.0, 38.0], [48.0, 38.5], [52.0, 37.0], [54.0, 33.0], [52.0, 30.0], [48.0, 30.5], [44.0, 34.0], [44.0, 38.0]],
    color: [220, 200, 50, 40],
  },
  {
    id: 'z4', actor: 'HOUTHI', priority: 'P3', category: 'ZONE', type: 'THREAT_CORRIDOR',
    name: 'Houthi Threat Corridor',
    coordinates: [[38.0, 28.0], [44.0, 28.0], [46.0, 20.0], [43.0, 11.0], [39.0, 12.0], [37.0, 18.0], [38.0, 28.0]],
    color: [200, 50, 50, 50],
  },
];

// ─── Heat points (strike intensity overlay) ───────────────────────────────────

export const HEAT_POINTS: HeatPoint[] = [
  // Fordow cluster
  { position: [50.5719, 34.8846], weight: 1.0 }, { position: [50.6219, 34.9146], weight: 1.0 },
  { position: [50.5219, 34.8546], weight: 0.9 }, { position: [50.6019, 34.8546], weight: 0.95 },
  { position: [50.5419, 34.9246], weight: 0.85 }, { position: [50.5919, 34.8246], weight: 0.9 },
  // Natanz cluster
  { position: [51.7260, 33.7243], weight: 1.0 }, { position: [51.7760, 33.7743], weight: 0.95 },
  { position: [51.6760, 33.6743], weight: 0.9 }, { position: [51.7560, 33.6943], weight: 0.85 },
  { position: [51.6960, 33.7743], weight: 0.95 }, { position: [51.7460, 33.7543], weight: 0.9 },
  // Isfahan cluster
  { position: [51.6625, 32.4355], weight: 0.8 }, { position: [51.7125, 32.4855], weight: 0.75 },
  { position: [51.6125, 32.3855], weight: 0.7 }, { position: [51.6925, 32.4155], weight: 0.75 },
  { position: [51.6325, 32.4655], weight: 0.7 },
  // Tehran IRGC cluster
  { position: [51.3347, 35.7219], weight: 0.7 }, { position: [51.3847, 35.7719], weight: 0.65 },
  { position: [51.2847, 35.6719], weight: 0.6 }, { position: [51.3647, 35.6919], weight: 0.65 },
  { position: [51.3047, 35.7419], weight: 0.6 },
  // Parchin cluster
  { position: [51.7757, 35.5194], weight: 0.9 }, { position: [51.8257, 35.5694], weight: 0.85 },
  { position: [51.7257, 35.4694], weight: 0.8 }, { position: [51.8057, 35.4994], weight: 0.85 },
  { position: [51.7457, 35.5494], weight: 0.8 }, { position: [51.7957, 35.5294], weight: 0.85 },
  // Bahrain NSA cluster
  { position: [50.5860, 26.2285], weight: 0.5 }, { position: [50.6360, 26.2785], weight: 0.45 },
  { position: [50.5360, 26.1785], weight: 0.4 }, { position: [50.6060, 26.1985], weight: 0.45 },
  { position: [50.5660, 26.2585], weight: 0.4 },
  // Al Udeid cluster
  { position: [51.3149, 25.1175], weight: 0.4 }, { position: [51.3649, 25.1675], weight: 0.35 },
  { position: [51.2649, 25.0675], weight: 0.3 }, { position: [51.3349, 25.0975], weight: 0.35 },
  // Bandar Abbas cluster
  { position: [56.2666, 27.1832], weight: 0.6 }, { position: [56.3166, 27.2332], weight: 0.55 },
  { position: [56.2166, 27.1332], weight: 0.5 }, { position: [56.2966, 27.1532], weight: 0.55 },
  { position: [56.2466, 27.2132], weight: 0.5 },
  // Ahvaz cluster
  { position: [48.6799, 31.3342], weight: 0.6 }, { position: [48.7299, 31.3842], weight: 0.55 },
  { position: [48.6299, 31.2842], weight: 0.5 }, { position: [48.7099, 31.3142], weight: 0.55 },
  { position: [48.6599, 31.3642], weight: 0.5 },
  // Chabahar IRGC naval cluster (Day 2)
  { position: [60.6223, 25.3467], weight: 0.8 }, { position: [60.6723, 25.3967], weight: 0.75 },
  { position: [60.5723, 25.2967], weight: 0.7 }, { position: [60.6523, 25.3167], weight: 0.75 },
  { position: [60.5923, 25.3767], weight: 0.7 },
  // Hezbollah Dahieh Beirut cluster (Day 2)
  { position: [35.5184, 33.8706], weight: 0.65 }, { position: [35.5684, 33.9206], weight: 0.6 },
  { position: [35.4684, 33.8206], weight: 0.55 }, { position: [35.5484, 33.8406], weight: 0.6 },
  { position: [35.4984, 33.9006], weight: 0.55 },
  // Hezbollah Baalbek cluster (Day 2)
  { position: [36.2165, 34.0042], weight: 0.7 }, { position: [36.2665, 34.0542], weight: 0.65 },
  { position: [36.1665, 33.9542], weight: 0.6 }, { position: [36.2465, 33.9742], weight: 0.65 },
  { position: [36.1965, 34.0342], weight: 0.6 },
  // Houthi Sanaa cluster (Day 2)
  { position: [44.2066, 15.3694], weight: 0.6 }, { position: [44.2566, 15.4194], weight: 0.55 },
  { position: [44.1566, 15.3194], weight: 0.5 }, { position: [44.2266, 15.3494], weight: 0.55 },
  { position: [44.1766, 15.3894], weight: 0.5 },
  // PMF Iraq cluster (Day 2)
  { position: [44.2700, 33.3000], weight: 0.5 }, { position: [44.3200, 33.3500], weight: 0.45 },
  { position: [44.2200, 33.2500], weight: 0.4 }, { position: [44.3000, 33.2800], weight: 0.45 },
  { position: [44.2500, 33.3300], weight: 0.4 },
];
