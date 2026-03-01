import type { Severity, EventType, Source, ActorResponse, IntelEvent } from '@/types/domain';
export type { Severity, EventType, Source, ActorResponse, IntelEvent };

export const EVENTS: IntelEvent[] = [
  {
    id:        'evt-001',
    timestamp: '2026-02-28T04:32:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'First strikes hit Tehran — Khamenei compound targeted',
    location:  'Tehran, Iran',
    summary:   'US B-2 Spirit bombers and Israeli F-35I aircraft launched the opening wave of Operation Epic Fury / Roaring Lion, striking Khamenei\'s residential compound and IRGC headquarters in Tehran. Multiple large explosions reported across the capital. Iranian air defenses were simultaneously suppressed by Tomahawk cruise missile volleys from the USS Gerald R. Ford CSG.',
    fullContent: `At 04:32 UTC on February 28, 2026, US and Israeli forces launched the opening strikes of a coordinated campaign against Iran.

US Air Force B-2 Spirit stealth bombers, operating from Diego Garcia, delivered the first munitions against leadership compounds in Tehran. Simultaneously, IDF F-35I Adir jets struck Khamenei's residential compound in Saadatabad, northwest Tehran. Multiple secondary explosions were observed by satellite.

US Navy Tomahawk cruise missiles from the USS Gerald R. Ford carrier strike group targeted Iranian S-300 and SA-65 air defense batteries in western Iran to suppress retaliatory capability. Pentagon officials confirmed the operation had been in planning for several months.

Israeli Defense Minister Israel Katz issued a public statement within minutes of the strikes commencing: "The IDF is striking the head of the snake." Trump posted a video to Truth Social stating that the US had launched operations alongside Israel to destroy Iran's nuclear program and missile capability.

Iranian state television was disrupted but resumed broadcast within 30 minutes. Initial reports from Tehran residents described a sequence of heavy explosions followed by sustained anti-aircraft fire visible across the city.`,
    verified: true,
    sources: [
      { name: 'Reuters',            tier: 1, reliability: 99 },
      { name: 'IDF Spokesperson',   tier: 1, reliability: 90 },
      { name: 'Pentagon Readout',   tier: 1, reliability: 95 },
      { name: 'NYT live feed',      tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'President Trump',    stance: 'SUPPORTING', type: 'STATEMENT', statement: 'We have launched strikes on Iran alongside our great ally Israel. Their nuclear program is being destroyed. The Iranian people will soon be free.' },
      { actorId: 'idf', actorName: 'IDF Spokesperson',  stance: 'SUPPORTING', type: 'STATEMENT', statement: 'The IDF is conducting Operation Roaring Lion against existential threats to the State of Israel. We are striking the head of the snake.' },
    ],
    tags: ['operation-epic-fury', 'khamenei', 'tehran', 'first-strike'],
  },

  {
    id:        'evt-002',
    timestamp: '2026-02-28T05:50:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'GBU-57 MOPs strike Fordow and Natanz — largest B-2 strike in US history',
    location:  'Fordow / Natanz, Iran',
    summary:   'In the largest B-2 operational strike in US history, 14 GBU-57A/B Massive Ordnance Penetrators — each weighing 30,000 lbs — were dropped on Iran\'s underground nuclear enrichment facilities at Fordow (near Qom) and Natanz. Both sites are assessed to be heavily damaged or destroyed. IAEA reports loss of sensor contact with both facilities.',
    fullContent: `At approximately 05:50 UTC, USAF B-2 Spirit bombers delivered 14 GBU-57A/B Massive Ordnance Penetrators (MOPs) — the world's most powerful conventional bunker-buster bomb — against the deeply buried nuclear enrichment facilities at Fordow and Natanz.

Fordow, buried 80–100m beneath a mountain near Qom, had been assessed as the most hardened nuclear facility in Iran. The facility housed approximately 1,000 IR-1 centrifuges. Multiple MOPs were required to penetrate to the facility level. Initial BDA (bomb damage assessment) via satellite indicates catastrophic structural damage.

Natanz, the primary uranium enrichment site, was struck with additional GBU-57s and conventional JDAMs. The above-ground pilot fuel enrichment plant was simultaneously targeted by Israeli F-15I aircraft.

Foundation for Defense of Democracies confirmed via FDD Action: "This is the largest B-2 operational strike in US history." The strike employed 14 of the roughly 20 MOPs believed to be in the US arsenal.

IAEA Director General confirmed loss of safeguards sensor contact with both Fordow and Natanz approximately 40 minutes after the strikes. Russia immediately called for an emergency IAEA Board of Governors session.

Former US National Security Advisor John Bolton: "This is exactly what should have been done 20 years ago."`,
    verified: true,
    sources: [
      { name: 'FDD Action',         tier: 2, reliability: 89 },
      { name: 'IAEA Statement',     tier: 1, reliability: 98 },
      { name: 'Reuters',            tier: 1, reliability: 99 },
      { name: 'Pentagon readout',   tier: 1, reliability: 95 },
    ],
    actorResponses: [
      { actorId: 'iaea', actorName: 'IAEA Director General', stance: 'NEUTRAL', type: 'STATEMENT', statement: 'We have lost sensor contact with safeguarded nuclear facilities at Fordow and Natanz. An emergency Board of Governors session has been requested.' },
      { actorId: 'russia', actorName: 'Russian MFA', stance: 'OPPOSING', type: 'STATEMENT', statement: 'Russia condemns the illegal military strikes on civilian nuclear infrastructure under IAEA safeguards. This is a gross violation of international law.' },
    ],
    tags: ['nuclear', 'fordow', 'natanz', 'bunker-buster', 'gbu-57'],
  },

  {
    id:        'evt-003',
    timestamp: '2026-02-28T07:15:00Z',
    severity:  'CRITICAL',
    type:      'INTELLIGENCE',
    title:     'Khamenei, IRGC Commander, Defense Minister, NSC Secretary confirmed killed',
    location:  'Tehran, Iran',
    summary:   'Israeli officials confirmed the IDF killed Supreme Leader Ali Khamenei, IRGC Commander MG Mohammad Pakpour, Defense Minister BG Aziz Nasirzadeh, NSC Secretary Ali Shamkhani, and Army Chief Gen. Abdolrahim Mousavi. Iran\'s state media initially denied Khamenei\'s death before confirming it at 14:30 UTC. The decapitation strikes eliminated virtually the entire Iranian security establishment simultaneously.',
    fullContent: `Multiple senior Israeli intelligence officials, speaking to Axios and other outlets, confirmed the assassination of the following Iranian leadership:

• Supreme Leader Ali Khamenei — struck in Saadatabad residential compound, Tehran. Satellite imagery published by NYT shows multiple buildings within the compound complex destroyed. IRNA confirmed death at 14:30 UTC.

• IRGC Commander Major General Mohammad Pakpour — killed in IRGC HQ strike. Pakpour had replaced Hossein Salami, who was killed in the June 2025 war.

• Defense Minister Brigadier General Aziz Nasirzadeh — killed in Ministry of Defense building strike, Tehran.

• Supreme National Security Council Secretary Ali Shamkhani — killed in SNSC headquarters strike.

• Islamic Republic of Iran Army Chief General Abdolrahim Mousavi — killed in Army HQ strike.

Iranian state media initially denied all deaths. President Masoud Pezeshkian, Judiciary Chief Gholamhossein Mohseni Ejei, and Assembly of Experts head Alireza Arafi have assumed transitional leadership per constitutional succession. Former President Ahmadinejad's condition remains unknown — he was reportedly targeted.

Crowds of Iranians began gathering in Tehran and other cities to celebrate following Khamenei's confirmed death, according to multiple reports and social media footage.`,
    verified: true,
    sources: [
      { name: 'Axios / Israeli officials', tier: 1, reliability: 93 },
      { name: 'IRNA (Iranian state media)', tier: 2, reliability: 80 },
      { name: 'Reuters',                   tier: 1, reliability: 99 },
      { name: 'ISW/CTP Special Report',    tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'iran', actorName: 'Iran Transitional Government', stance: 'OPPOSING', type: 'STATEMENT', statement: 'The Islamic Republic confirms the martyrdom of the Supreme Leader. The revolution will not die with him. All Islamic forces have been called to maximum retaliation.' },
      { actorId: 'idf',  actorName: 'Israeli PM Netanyahu',         stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Israel has eliminated several leaders responsible for the Iranian nuclear programme. The existential threat posed by the Iranian regime is being dismantled.' },
    ],
    tags: ['khamenei', 'decapitation', 'pakpour', 'shamkhani', 'leadership'],
  },

  {
    id:        'evt-004',
    timestamp: '2026-02-28T08:45:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'Iran launches 35+ ballistic missiles at Israel; Tel Aviv and Jerusalem hit',
    location:  'Israel / Iran',
    summary:   'Iran launched the first retaliatory wave — approximately 35 ballistic missiles targeting Tel Aviv, Jerusalem, Haifa, and Eilat. Iron Dome and Arrow-3 systems intercepted a majority, but Iranian warheads struck residential areas in Jerusalem and Tel Aviv. 11 Israeli civilians were killed, 450+ injured. Ben Gurion Airport declared closed to all commercial traffic.',
    fullContent: `At 08:45 UTC, Iran launched an initial barrage of approximately 35 Shahab-3, Emad, and Kheibar Shekan ballistic missiles from launchers in western and central Iran at Israeli population centers.

Israel's Arrow-3 and Arrow-2 systems intercepted the majority of incoming missiles at high altitude. Iron Dome engaged shorter-range threats. However, several warheads penetrated Israeli defenses and struck:

• Jerusalem: Three missiles struck residential neighborhoods near the Jerusalem suburb of Gilo. 7 confirmed killed, over 200 injured.
• Tel Aviv: Two impacts in the Ramat Aviv and Kiryat Ono districts. 4 killed, 190+ injured.
• Haifa: Iron Dome successfully intercepted all incoming missiles.
• Eilat: Two missiles intercepted by Arrow-3.

Ben Gurion Airport immediately suspended all commercial and charter flights. The US Embassy issued an emergency alert directing all American citizens in Israel to shelter in place. The Embassy stated it was "not in a position to evacuate or directly assist Americans" leaving Israel.

IDF Home Front Command issued a nationwide shelter-in-place order for all Israeli residents.

A second missile barrage was reported approximately 90 minutes later.`,
    verified: true,
    sources: [
      { name: 'IDF Spokesperson', tier: 1, reliability: 90 },
      { name: 'Reuters',          tier: 1, reliability: 99 },
      { name: 'ISW/CTP',          tier: 1, reliability: 97 },
      { name: 'AP',               tier: 1, reliability: 98 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'US Embassy Jerusalem', stance: 'NEUTRAL', type: 'ALERT', statement: 'The U.S. Embassy is not in a position to evacuate or directly assist Americans leaving Israel. All personnel directed to shelter in place.' },
      { actorId: 'iran', actorName: 'IRGC Spokesperson',  stance: 'OPPOSING', type: 'STATEMENT', statement: 'The Islamic Revolutionary Guard Corps confirms the launch of Operation True Promise 3 in response to the criminal aggression of the Zionist regime and its American sponsors.' },
    ],
    tags: ['missile-strike', 'israel', 'jerusalem', 'tel-aviv', 'ben-gurion', 'iron-dome'],
  },

  {
    id:        'evt-005',
    timestamp: '2026-02-28T10:00:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'Iran strikes US bases in Bahrain, Qatar, Kuwait, UAE, Jordan, Saudi Arabia',
    location:  'Persian Gulf region',
    summary:   'Iran launched simultaneous ballistic missile and drone attacks against US military installations across the Gulf. NSA Al-Dhafra (UAE), Al-Udeid (Qatar), Ali Al Salem (Kuwait), Al-Tanf (Jordan), and multiple Saudi bases were hit. CENTCOM confirmed 3 US service members killed, 5 seriously wounded. Attacks intended to deny US forces ability to continue strike operations.',
    fullContent: `At approximately 10:00 UTC, Iran executed a coordinated multi-directional retaliatory strike against US military installations across the Middle East and Gulf region.

Confirmed strikes and casualties:

• NSA Bahrain (home of US 5th Fleet): Multiple Shahed-136 drones and Fateh-110 missiles intercepted; 4 injuries.
• Al-Udeid Air Base, Qatar: 3 missile impacts on runway and fuel storage. 16 injuries. F-15 sorties temporarily suspended.
• NSA Souda Bay via Iranian proxies in Syria: Unconfirmed.
• Ali Al Salem Air Base, Kuwait: 1 US serviceman killed, 1 Kuwaiti civilian killed.
• Al-Tanf Garrison, Jordan: 2 US service members killed. Direct hit on barracks.
• King Khalid Military City, Saudi Arabia: 3 missile impacts; Saudi defenses intercepted majority.
• Unknown UAE base: 3 UAE civilians killed.

CENTCOM statement at 09:30 ET (14:30 UTC March 1): "Three U.S. service members have been killed in action and five are seriously wounded as part of Operation Epic Fury."

Iran also attacked civilian aviation infrastructure — international airports in Kuwait and UAE were struck by missiles. Maersk immediately suspended Trans-Suez sailings.

President Trump, speaking to CNBC from Mar-a-Lago: "That often happens in war. We are doing this not for now, we are doing this for the future and it is a noble mission."`,
    verified: true,
    sources: [
      { name: 'CENTCOM official statement', tier: 1, reliability: 99 },
      { name: 'Reuters',                    tier: 1, reliability: 99 },
      { name: 'CNBC',                       tier: 1, reliability: 95 },
      { name: 'ISW/CTP',                    tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'CENTCOM',         stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Three U.S. service members have been killed in action and five are seriously wounded as part of Operation Epic Fury. Several others sustained minor injuries.' },
      { actorId: 'trump', actorName: 'President Trump', stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Casualties often happen in war. We are doing this not for now, we are doing this for the future. It is a noble mission. Everything is ahead of schedule.' },
    ],
    tags: ['us-bases', 'gulf', 'casualties', 'centcom', 'al-udeid', 'bahrain'],
  },

  {
    id:        'evt-006',
    timestamp: '2026-02-28T12:00:00Z',
    severity:  'CRITICAL',
    type:      'ECONOMIC',
    title:     'IRGC declares Strait of Hormuz closed — 200+ vessels anchored',
    location:  'Strait of Hormuz',
    summary:   'The IRGC formally declared the Strait of Hormuz closed to all traffic. Over 200 vessels, including oil tankers and LNG carriers, dropped anchor in surrounding waters. Maersk paused Trans-Suez sailings and rerouted via Cape of Good Hope. Three tankers were damaged in the Gulf — unclear if deliberate. 14 million barrels per day of oil flow disrupted.',
    fullContent: `At 12:00 UTC, the IRGC formally announced the closure of the Strait of Hormuz to all commercial and military traffic, executing a long-stated deterrence threat.

The Strait, at its narrowest just 21 nautical miles wide between Iran and Oman, is the world's most critical energy chokepoint. More than 14 million barrels per day — approximately one-third of global seaborne crude exports — transit the Strait annually, along with significant volumes of LNG.

Shipping reports confirmed over 200 vessels, including oil tankers, LNG carriers, and container ships, dropped anchor in the waters approaching the Strait. The IRGC deployed fast-attack craft and threatened to fire upon any vessel attempting transit.

Reuters confirmed: "At least three tankers in the Gulf have been damaged since the U.S. and Israel began trading strikes with Iran. It is unclear whether the damage was done deliberately or accidentally."

Maersk statement: "We have paused Trans-Suez sailings through the Bab el-Mandeb Strait for the moment. Some sailings will be rerouted around the Cape of Good Hope. All vessel crossings in the Strait of Hormuz are also suspended."

Oil futures spiked approximately 35% in after-hours trading. Brent crude hit $143/barrel. US gasoline futures jumped significantly. Economists warned of a severe supply shock if the closure persists beyond 1–2 weeks.

US 5th Fleet issued a statement it was "monitoring the situation" but declined to announce active efforts to reopen the Strait.`,
    verified: true,
    sources: [
      { name: 'Reuters',             tier: 1, reliability: 99 },
      { name: 'Maersk statement',    tier: 1, reliability: 98 },
      { name: 'CNBC',                tier: 1, reliability: 95 },
      { name: 'Kpler data',          tier: 2, reliability: 92 },
    ],
    actorResponses: [
      { actorId: 'iran', actorName: 'IRGC Navy',       stance: 'OPPOSING', type: 'MILITARY ACTION', statement: 'All vessels are warned: the Strait of Hormuz is closed. Any vessel attempting transit will be treated as a hostile actor.' },
      { actorId: 'us',   actorName: 'US 5th Fleet',    stance: 'NEUTRAL',  type: 'STATEMENT',       statement: 'The US Navy Fifth Fleet is monitoring the situation in the Strait of Hormuz and remains committed to freedom of navigation in international waters.' },
    ],
    tags: ['hormuz', 'oil', 'shipping', 'maersk', 'economic', 'energy'],
  },

  {
    id:        'evt-007',
    timestamp: '2026-02-28T16:00:00Z',
    severity:  'HIGH',
    type:      'POLITICAL',
    title:     'Iranians celebrate in Tehran streets following Khamenei\'s confirmed death',
    location:  'Tehran, Isfahan, Shiraz, Iran',
    summary:   'Large crowds gathered in Tehran, Isfahan, and other Iranian cities overnight, celebrating the confirmed death of Supreme Leader Khamenei. This follows the largest protest movement in Iran since the Islamic Revolution (2025–2026), during which Iran killed thousands of civilian protesters. The celebrations represent a major intelligence indicator regarding the regime\'s domestic legitimacy.',
    fullContent: `Following IRNA's confirmation of Supreme Leader Khamenei's death, large crowds of Iranians took to the streets of Tehran, Isfahan, Shiraz, and other cities in scenes of celebration.

The New York Times reported: "Large crowds of Iranians poured into the streets of Tehran and other cities across Iran overnight, celebrating the news that Iran's supreme leader, Ayatollah Ali Khamenei, had been killed during a day of coordinated U.S. and Israeli attacks."

This development has significant intelligence implications. The 2025–2026 Iranian protests — described as the largest since the Islamic Revolution — were met with a massacre of thousands of civilians by regime security forces in January 2026. Trump had stated "help is on the way" in response to the crackdown.

The celebratory response suggests a significant portion of the Iranian population views the regime's collapse as positive. This undermines the regime's claim to represent the Iranian people and complicates the IRGC's ability to mobilize domestic support for continued retaliation.

Senator Mark Warner (D-VA), speaking on CNN, stated: "I saw no intelligence that Iran was on the verge of launching any kind of preemptive strike against the United States of America. None." This directly contradicted the Trump administration's stated justification for the operation.

Transitional government leadership confirmed: President Pezeshkian, Judiciary Chief Mohseni Ejei, and Assembly of Experts head Arafi have assumed collective leadership per constitutional succession procedures.`,
    verified: true,
    sources: [
      { name: 'NYT',               tier: 1, reliability: 97 },
      { name: 'Guardian',          tier: 1, reliability: 96 },
      { name: 'CNN / Sen. Warner', tier: 1, reliability: 95 },
      { name: 'IRNA (state media)', tier: 2, reliability: 78 },
    ],
    actorResponses: [
      { actorId: 'warner', actorName: 'Sen. Mark Warner (D-VA)', stance: 'OPPOSING', type: 'STATEMENT', statement: 'I saw no intelligence that Iran was on the verge of launching any kind of preemptive strike against the United States. None.' },
      { actorId: 'cotton', actorName: 'Sen. Tom Cotton (R-AR)',  stance: 'SUPPORTING', type: 'STATEMENT', statement: 'President Trump is right that it is absolutely vital and necessary to address Iran\'s threat before it fully materializes.' },
    ],
    tags: ['iran-domestic', 'celebration', 'khamenei-death', 'protests', 'transitional'],
  },

  {
    id:        'evt-008',
    timestamp: '2026-02-28T18:30:00Z',
    severity:  'HIGH',
    type:      'DIPLOMATIC',
    title:     'Russia calls emergency IAEA Board of Governors session; UN Security Council convened',
    location:  'Vienna / New York',
    summary:   'Russia formally requested an emergency session of the IAEA Board of Governors, citing US-Israeli strikes on nuclear facilities under IAEA safeguards as a violation of international law. The UN Security Council convened an emergency session. Russia and China vetoed a ceasefire resolution. Western nations defended Israel\'s and the US\'s right to self-defense.',
    fullContent: `Russia's Permanent Mission to the International Organizations in Vienna formally requested an emergency Board of Governors session "on matters related to military strikes of the United States and Israel against the territory of the Islamic Republic of Iran that started in the morning of 28 February 2026."

The diplomatic note specifically cited strikes against "nuclear facilities under IAEA safeguards" as grounds for the emergency convening. The session was confirmed for Monday morning, Vienna time.

Simultaneously, the UN Security Council convened an emergency session. Russia and China introduced a draft resolution calling for an immediate ceasefire. The US vetoed the resolution. The UK abstained.

Key diplomatic positions:
• Russia (opposing): "Gross violation of international law and sovereignty."
• China (opposing): "Unilateral military action against a sovereign state is condemned."
• UK (neutral-supporting): "Raised serious concerns about civilian casualties while affirming Israel's right to self-defense."
• France: "Called for immediate cessation of hostilities pending diplomatic engagement."
• Germany: "Deeply concerned. Called for protection of civilian nuclear infrastructure."

ISW/CTP noted: "The UN Security Council action is unlikely to have practical effect given US veto power but signals significant multilateral diplomatic isolation for Washington and Tel Aviv."`,
    verified: true,
    sources: [
      { name: 'PBS NewsHour',     tier: 1, reliability: 95 },
      { name: 'AP',               tier: 1, reliability: 98 },
      { name: 'Reuters',          tier: 1, reliability: 99 },
      { name: 'ISW/CTP',          tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'russia', actorName: 'Russian MFA',  stance: 'OPPOSING', type: 'DIPLOMATIC', statement: 'Russia calls for an immediate IAEA emergency session. These strikes on safeguarded nuclear facilities represent a grave violation of international law.' },
      { actorId: 'us',     actorName: 'US Ambassador to UN', stance: 'SUPPORTING', type: 'DIPLOMATIC', statement: 'The United States exercised its veto. No other nation has done more to prevent nuclear proliferation. Iran had a nuclear weapon within months.' },
    ],
    tags: ['iaea', 'un', 'russia', 'china', 'diplomatic', 'veto', 'international-law'],
  },

  {
    id:        'evt-009',
    timestamp: '2026-02-28T20:00:00Z',
    severity:  'HIGH',
    type:      'MILITARY',
    title:     'Houthis announce resumption of Red Sea shipping attacks',
    location:  'Yemen / Red Sea',
    summary:   'Yemen-based Houthis announced they would resume attacks on shipping in the Red Sea and Bab el-Mandeb Strait in solidarity with Iran. The announcement followed the US-Israeli strikes. Maersk, which had already paused Suez sailings, confirmed the Red Sea route was now untenable. Global shipping costs surging. Bab el-Mandeb effectively closed.',
    fullContent: `The Houthis, designated as a terrorist organization by the US and operating from Yemen, announced via their official Telegram channel and spokesperson that they would resume attacks on commercial shipping in the Red Sea, Arabian Sea, and Gulf of Aden in response to US-Israeli strikes on Iran.

"In support of our brothers in the Islamic Republic of Iran and in response to the criminal aggression of the US and Zionist entity, the Yemeni Armed Forces declare the resumption of military operations against all ships linked to the enemies of Islam in the Red Sea, Bab el-Mandeb, and the Arabian Sea."

Maersk confirmed it was pausing all Trans-Suez sailings and rerouting available vessels via the Cape of Good Hope. Other major carriers including CMA CGM and MSC were assessing their routes.

The Bab el-Mandeb closure, combined with the Strait of Hormuz closure, has effectively bottled up oil and gas exports from the Persian Gulf entirely. Lloyd's of London declared a "war risk" zone covering the entire Persian Gulf, Red Sea, and Arabian Sea — triggering insurance rate spikes.

Houthi actions had previously disrupted approximately 15% of global trade during 2024–2025. The resumption of attacks following a period of relative calm significantly widens the conflict's economic impact.

US 5th Fleet confirmed CENTCOM was "re-assessing Houthi threat posture" but no immediate strike operations against Yemen were announced.`,
    verified: true,
    sources: [
      { name: 'Reuters',           tier: 1, reliability: 99 },
      { name: 'Maersk statement',  tier: 1, reliability: 98 },
      { name: 'Times of Israel',   tier: 2, reliability: 86 },
      { name: 'ISW/CTP',           tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'houthis', actorName: 'Houthi Military Spokesperson', stance: 'OPPOSING', type: 'STATEMENT', statement: 'We declare the resumption of military operations against all ships of the enemies in the Red Sea and Bab el-Mandeb in support of Iran.' },
    ],
    tags: ['houthis', 'red-sea', 'shipping', 'bab-el-mandeb', 'maersk', 'maritime'],
  },

  {
    id:        'evt-010',
    timestamp: '2026-03-01T06:00:00Z',
    severity:  'HIGH',
    type:      'MILITARY',
    title:     'IDF continues strikes — Isfahan nuclear complex, IRGC Navy assets targeted',
    location:  'Isfahan / Chabahar, Iran',
    summary:   'The IDF confirmed continued strikes into Day 2, targeting the Isfahan nuclear complex (above-ground research buildings), IRGC Navy frigate IRIS Jamaran, and the IRGC Navy Imam Ali base in Chabahar. Nuclear-related missile production sites in Parchin also reportedly struck. Netanyahu: "Strikes against sites linked to the nuclear program will continue in the coming days."',
    fullContent: `As Operation Epic Fury / Roaring Lion entered its second day, the IDF confirmed continued strike operations against a range of Iranian military and nuclear-related targets.

IDF confirmed targets on Day 2 (as of 06:00 UTC March 1):

Nuclear-related:
• Isfahan nuclear complex — above-ground administration and research buildings. Separate from the underground enrichment facility struck Day 1.
• Parchin military complex — explosive research and testing facility. CSIS confirmed unverified reports of strikes at Parchin.
• Iran Atomic Energy Agency headquarters, Tehran — secondary administrative strike.

Military:
• IRGC Navy frigate IRIS Jamaran — struck at berth in Bandar Abbas. Unconfirmed destruction status per ISW/CTP.
• IRGC Navy Imam Ali Naval Base, Chabahar — unverified reports of strikes.
• Additional Shahab-3 and Kheibar Shekan missile launcher sites in western Iran.

PM Netanyahu statement: "Israeli strikes have also killed several leaders involved in the Iranian nuclear programme and that strikes against sites linked to the programme would continue in the coming days."

CSIS analysis: "Initial reports suggest targets have included administrative hubs and dual-use scientific research facilities. There are unconfirmed reports that the United States has struck the Iran Atomic Energy Agency headquarters in Tehran and the explosive research testing facility at Parchin, as well as conducted further strikes at the Isfahan nuclear complex."`,
    verified: true,
    sources: [
      { name: 'IDF Spokesperson', tier: 1, reliability: 90 },
      { name: 'CSIS analysis',    tier: 1, reliability: 94 },
      { name: 'Reuters',          tier: 1, reliability: 99 },
      { name: 'ISW OSINT account',tier: 2, reliability: 82 },
    ],
    actorResponses: [
      { actorId: 'idf', actorName: 'PM Netanyahu', stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Israeli strikes have killed several leaders of the Iranian nuclear programme. Strikes against nuclear sites will continue in the coming days. The job is not finished.' },
    ],
    tags: ['day-2', 'isfahan', 'parchin', 'irgc-navy', 'jamaran', 'nuclear-continued'],
  },

  {
    id:        'evt-011',
    timestamp: '2026-03-01T09:30:00Z',
    severity:  'HIGH',
    type:      'POLITICAL',
    title:     'Trump: Iran operations "ahead of schedule"; Democrats question legal basis',
    location:  'Washington D.C. / Mar-a-Lago',
    summary:   'President Trump told CNBC the operation is "moving along very well — ahead of schedule." He described it as "a very noble mission for the world." However, Senate Intelligence Committee ranking member Mark Warner stated he had seen "no intelligence" suggesting Iran was planning a preemptive strike — directly contradicting the administration\'s legal justification. Congressional Democrats demanded briefings.',
    fullContent: `President Trump conducted a phone interview with CNBC's Joe Kernen from Mar-a-Lago on the morning of March 1, 2026:

"We're moving along very well, very well — ahead of schedule. It's a very violent regime, one of the most violent regimes in history. We're doing our job not just for us but for the world. And everything is ahead of schedule."

Trump described a potential off-ramp: "Things are evolving in a very positive way right now, a very positive way." He did not specify terms for a ceasefire.

However, Sen. Mark Warner (D-VA), ranking member of the Senate Intelligence Committee and cleared for highly classified intelligence, contradicted the administration's justification:

"I saw no intelligence that Iran was on the verge of launching any kind of preemptive strike against the United States of America. None." Warner was responding to a senior Trump official's claim that "we had analysis that basically told us, if we sat back and waited to get hit first, the amount of casualties and damage would be substantially higher."

Republican counterpart Sen. Tom Cotton (R-AR) defended the strikes: "President Trump is right that it is absolutely vital and necessary now to address that threat before it fully materializes in the near future."

This political divide has significant implications for the operation's legal standing under the War Powers Resolution and for the bipartisan support required for sustained funding.`,
    verified: true,
    sources: [
      { name: 'CNBC',               tier: 1, reliability: 95 },
      { name: 'CNN State of Union', tier: 1, reliability: 95 },
      { name: 'AP',                 tier: 1, reliability: 98 },
    ],
    actorResponses: [
      { actorId: 'trump',  actorName: 'President Trump',    stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Everything is ahead of schedule. It\'s a very noble mission for the world.' },
      { actorId: 'warner', actorName: 'Sen. Warner (D-VA)', stance: 'OPPOSING',   type: 'STATEMENT', statement: 'I saw no intelligence that Iran was planning a preemptive strike. None. This requires a full congressional briefing.' },
    ],
    tags: ['trump', 'political', 'legal-basis', 'war-powers', 'congress', 'warner'],
  },

  {
    id:        'evt-012',
    timestamp: '2026-03-01T13:42:00Z',
    severity:  'STANDARD',
    type:      'HUMANITARIAN',
    title:     'Iran casualty figures: 201 killed including 150 civilians — IRCS; Minab school airstrike',
    location:  'Iran (nationwide)',
    summary:   'Iranian Red Crescent Society (IRCS) reported 201 killed and 747 injured across Iran from US-Israeli strikes. HRANA (Human Rights Activists in Iran) reported 133 killed and 200+ injured. The Minab school airstrike in Hormozgan Province reportedly killed 148 civilians, including children. The incident drew condemnation from the UN and humanitarian organizations. Israel denied targeting the school.',
    fullContent: `The Iranian Red Crescent Society reported an updated toll of 201 killed and 747 injured across Iran as of March 1, 2026. Separately, HRANA (Human Rights Activists in Iran) reported 133 killed and at least 200 injured — the lower figure reflects verified reports excluding contested incidents.

The most significant humanitarian incident involves the Minab school airstrike in Hormozgan Province, southern Iran. Initial reports suggest 148 civilians were killed when a building housing displaced families was struck near a military installation. The incident is under investigation.

• IDF statement: "We do not target civilian infrastructure. All strikes are against military and strategic targets. We investigate all reports of civilian casualties."
• Iran: "The Zionist enemy deliberately targeted civilian shelters."
• ICRC: Called for immediate access to assess civilian casualties.
• UN Secretary-General: "Deeply alarmed by reports of civilian deaths. All parties must comply with international humanitarian law."

Regional casualties (outside Iran):
• UAE: 3 civilians killed, 58 injured
• Kuwait: 1 civilian killed, 32 injured  
• Qatar: 16 injured
• Bahrain: 4 injured
• Oman (Strait of Hormuz): 1 injured
• Syria: 5 civilians killed (from Iranian proxy operations)`,
    verified: true,
    sources: [
      { name: 'IRCS (Iranian Red Crescent)', tier: 2, reliability: 85 },
      { name: 'HRANA',                       tier: 2, reliability: 88 },
      { name: 'Reuters',                     tier: 1, reliability: 99 },
      { name: 'UN OCHA',                     tier: 1, reliability: 96 },
    ],
    actorResponses: [
      { actorId: 'un',  actorName: 'UN Secretary-General', stance: 'NEUTRAL', type: 'STATEMENT', statement: 'Deeply alarmed by reports of civilian deaths. All parties must comply with international humanitarian law. I call for an immediate ceasefire.' },
      { actorId: 'idf', actorName: 'IDF Spokesperson',     stance: 'NEUTRAL', type: 'STATEMENT', statement: 'We do not target civilian infrastructure. All strikes are directed at military and strategic objectives. We investigate all reports of civilian casualties.' },
    ],
    tags: ['casualties', 'humanitarian', 'minab', 'civilians', 'ircs', 'hrana'],
  },

  // ── MARCH 1 — Full Day Coverage ────────────────────────────────────────────

  {
    id:        'evt-013',
    timestamp: '2026-03-01T02:14:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'Day 2 opens: second B-2 wave strikes Fordow, Natanz, Tehran IRGC infrastructure',
    location:  'Fordow / Natanz / Tehran, Iran',
    summary:   'Before dawn on March 1, a second wave of B-2 Spirit stealth bombers launched from Diego Garcia delivered follow-up GBU-57 MOP strikes on Fordow and Natanz to ensure complete structural collapse of the centrifuge halls. Simultaneously, IDF F-35Is struck remaining IRGC command nodes across Tehran and US F-15Es from Al Udeid and Al Dhafra targeted Iranian early-warning radar networks.',
    fullContent: `At 02:14 UTC on March 1, the second operational day of Operations Epic Fury and Roaring Lion opened with a synchronized multi-axis strike package.

US Air Force:
• 3x B-2 Spirit bombers launched from Diego Garcia delivered follow-up GBU-57 MOPs against Fordow, targeting the B-hall centrifuge complex assessed as potentially surviving the Day 1 strike.
• Additional MOPs dropped on Natanz's underground A-hall following satellite imagery showing a section of the southern centrifuge cascade may have remained partially intact.
• USAF F-15Es from Al Udeid suppressed remaining Iranian Bavar-373 long-range SAM sites in western Iran with AGM-88 HARM anti-radiation missiles.
• USAF F-22s from Al Dhafra struck the Lavizan-Shian facility northwest of Tehran — a covert research complex assessed by CSIS as housing undeclared nuclear research.

Israeli Air Force:
• F-35I Adirs struck IRGC Imam Ali missile base (Tehran vicinity) for a second time — satellite BDA from Day 1 showed partial survivability of underground bunker tunnels.
• F-15I Ra'am aircraft conducted follow-up strikes on Shahid Nojeh AFB (Hamadan), cratering remaining taxiways and hardened aircraft shelters.
• IDF confirmed destruction of Iranian early-warning radar coverage across western and central Iran — "We now own the air over Iran."

Pentagon readout: "Coalition forces conducted additional precision strikes on Day 2 to achieve confirmation of destruction of designated targets. Strike packages are complete and battle damage assessment is ongoing."

ISW/CTP assessment: "The Day 2 strikes suggest that Day 1 battle damage assessment, completed within a few hours using satellite reconnaissance, found specific targets where survivability was uncertain. The deliberate follow-up against Fordow B-hall is significant — it indicates US planners required confirmation, not assumption, of destruction."`,
    verified: true,
    sources: [
      { name: 'Pentagon readout',       tier: 1, reliability: 95 },
      { name: 'Reuters',                tier: 1, reliability: 99 },
      { name: 'ISW/CTP',               tier: 1, reliability: 97 },
      { name: 'CSIS Nuclear Notebook', tier: 1, reliability: 94 },
    ],
    actorResponses: [
      { actorId: 'idf',  actorName: 'IDF Spokesperson',    stance: 'SUPPORTING', type: 'STATEMENT', statement: 'The IAF has completed additional precision strikes against IRGC command infrastructure and nuclear-related targets. We now own the air over Iran.' },
      { actorId: 'iran', actorName: 'Iranian Transitional Government', stance: 'OPPOSING', type: 'STATEMENT', statement: 'The continued criminal bombardment of Iranian sovereign territory will not go unanswered. The Islamic Republic\'s retaliatory capability remains intact.' },
    ],
    tags: ['day-2', 'b-2', 'fordow', 'natanz', 'follow-up-strikes', 'lavizan', 'sead'],
  },

  {
    id:        'evt-014',
    timestamp: '2026-03-01T03:47:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'Hezbollah opens northern front — 340 rockets and missiles fired at northern Israel',
    location:  'Southern Lebanon / Northern Israel',
    summary:   'Hezbollah launched a massive rocket and missile barrage against northern Israel in solidarity with Iran, firing approximately 340 rockets, Katyushas, and Falaq-1/2 rockets at Haifa, Kiryat Shmona, Tiberias, and the Galilee. IDF Iron Dome intercepted the majority, but impacts in Haifa killed 4 Israeli civilians and wounded 67. IDF immediately launched Operation Northern Shield — retaliatory airstrikes on Hezbollah infrastructure across southern Lebanon and the Bekaa Valley.',
    fullContent: `At 03:47 UTC on March 1, Hezbollah Secretary-General Naim Qassem issued a statement declaring that "the Islamic Resistance in Lebanon stands in full solidarity with the Islamic Republic of Iran and the Palestinian people. The Zionist enemy will pay the price on all fronts."

Within minutes, Hezbollah launched a coordinated barrage from pre-positioned launch sites across southern Lebanon:
• Approximately 340 rockets (Katyusha BM-21, Grad, Falaq-1/2) and anti-tank missiles launched toward northern Israel.
• Specific targets included: Haifa port area and petrochemical installations, Kiryat Shmona (depopulated by IDF order since Oct 7 2023 escalation), Tiberias, Nahariya, and IDF Northern Command facilities at Safed.

IDF Iron Dome performance:
• 287 of 340 projectiles intercepted (84% intercept rate).
• 53 rockets impacted across northern Israel.
• Haifa: 4 civilians killed, 67 wounded; a residential tower in the Carmel district suffered a direct hit.
• Kiryat Shmona: Multiple impacts in evacuated zone — no civilian casualties there.
• IDF Home Front Command expanded mandatory evacuation zone to all communities within 20km of the Lebanese border.

IDF response — Operation Northern Shield:
• IAF F-16Is immediately struck Hezbollah Radwan Force positions in southern Lebanon.
• IDF struck Hezbollah's Dahieh compound in Beirut's southern suburb — command and logistics hub.
• Hezbollah's Baalbek weapons storage complex (Bekaa Valley) struck with multiple strikes.
• IAF confirmed destruction of Hezbollah's long-range Fateh-110 missile storage sites in the Bekaa.

ISW: "The opening of the northern front is the most significant strategic risk of this conflict. Hezbollah possesses approximately 130,000 rockets — the most densely rocket-armed non-state actor in history. A full Hezbollah escalation would overwhelm Israeli air defenses and could require a ground invasion of Lebanon."

Netanyahu emergency statement: "Hezbollah has made a catastrophic mistake. We will respond with full force. Lebanon will pay a very, very heavy price."`,
    verified: true,
    sources: [
      { name: 'IDF Spokesperson',    tier: 1, reliability: 90 },
      { name: 'Reuters',             tier: 1, reliability: 99 },
      { name: 'AP',                  tier: 1, reliability: 98 },
      { name: 'ISW/CTP',            tier: 1, reliability: 97 },
      { name: 'Times of Israel',     tier: 2, reliability: 88 },
    ],
    actorResponses: [
      { actorId: 'hezbollah', actorName: 'Hezbollah / Naim Qassem',   stance: 'OPPOSING',   type: 'STATEMENT',       statement: 'The Islamic Resistance stands in full solidarity with Iran. The Zionist enemy will pay the price on all fronts.' },
      { actorId: 'idf',       actorName: 'PM Netanyahu',              stance: 'SUPPORTING', type: 'STATEMENT',       statement: 'Hezbollah has made a catastrophic mistake. We will respond with full force. Lebanon will pay a very, very heavy price.' },
      { actorId: 'us',        actorName: 'US Embassy Beirut',         stance: 'NEUTRAL',    type: 'ALERT',           statement: 'US Embassy Beirut: Emergency Security Alert issued. All US citizens in Lebanon advised to shelter in place. Commercial flight options are extremely limited.' },
    ],
    tags: ['hezbollah', 'northern-front', 'haifa', 'operation-northern-shield', 'lebanon', 'rockets', 'day-2'],
  },

  {
    id:        'evt-015',
    timestamp: '2026-03-01T04:30:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'IRGC second ballistic missile salvo — NSA Bahrain struck again; total US KIA rises to 5',
    location:  'Persian Gulf region',
    summary:   'Iran\'s IRGC launched a second coordinated ballistic missile salvo targeting US military installations across the Gulf. NSA Bahrain (home of the US 5th Fleet) was struck for a second time, killing 2 more US service members and wounding 11. Al Udeid Air Base in Qatar was also struck, temporarily suspending F-15E strike sorties. Total US KIA in the theater rose to 5.',
    fullContent: `At 04:30 UTC on March 1, IRGC ballistic missile units — operating under pre-delegated retaliatory authority following the death of Commander Pakpour — launched a second major salvo targeting US military command infrastructure.

CENTCOM confirmed strike details:
• NSA Bahrain (5th Fleet HQ): Two Fateh-313 precision ballistic missiles impacted the pier area and a logistics warehouse. 2 US service members killed, 11 wounded. USS Laboon (DDG-58) sustained shrapnel damage but remains operational. Total US KIA at NSA Bahrain: 3.
• Al Udeid Air Base Qatar: One Zolfaghar missile impacted a fuel storage revetment. 1 hangar with F-15E aircraft inside sustained blast damage. Zero US KIA but all strike sorties temporarily suspended for approximately 3 hours pending damage assessment.
• Prince Sultan AB Saudi Arabia: 3 missiles intercepted by Patriot PAC-3 before reaching the base.
• Al Dhafra UAE: 1 Shahab-3 intercepted by Terminal High Altitude Area Defense (THAAD) at 85km altitude over Abu Dhabi.

Total US theater casualties as of this salvo: 5 KIA, 16 seriously wounded.

The second salvo demonstrated that IRGC missile units are operating under pre-planned autonomous protocols despite the loss of central command. The precision targeting of 5th Fleet HQ specifically suggests an attempt to degrade US naval command and control. CENTCOM confirmed that all operational strike missions have continued without significant disruption.

Adm. Brad Cooper, US 5th Fleet Commander: "The 5th Fleet remains fully operational. We will not be deterred. The men and women of the 5th Fleet continue to execute their missions with professionalism and courage in the face of these attacks."

SecDef Hegseth, speaking from the Pentagon: "The IRGC has again deliberately targeted US service members. Every single perpetrator of these attacks will be held accountable. Our resolve has not been weakened — it has been strengthened."`,
    verified: true,
    sources: [
      { name: 'CENTCOM official statement', tier: 1, reliability: 99 },
      { name: 'Reuters',                    tier: 1, reliability: 99 },
      { name: 'AP',                         tier: 1, reliability: 98 },
      { name: 'USNI News',                  tier: 1, reliability: 94 },
    ],
    actorResponses: [
      { actorId: 'us',   actorName: 'Adm. Brad Cooper (5th Fleet)',  stance: 'SUPPORTING', type: 'STATEMENT', statement: 'The 5th Fleet remains fully operational. We will not be deterred. Our sailors continue to execute their missions under fire.' },
      { actorId: 'us',   actorName: 'SecDef Hegseth',               stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Every perpetrator of these attacks will be held accountable. Our resolve has not been weakened — it has been strengthened.' },
      { actorId: 'irgc', actorName: 'IRGC Aerospace Force',         stance: 'OPPOSING',   type: 'STATEMENT', statement: 'The IRGC confirms the successful precision strikes on American military command infrastructure. The 5th Fleet\'s Bahrain headquarters has been hit. Operations will continue.' },
    ],
    tags: ['us-kia', 'bahrain', 'al-udeid', 'irgc-salvo', 'day-2', 'centcom', '5th-fleet'],
  },

  {
    id:        'evt-016',
    timestamp: '2026-03-01T05:45:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'USS Ford CSG fires 40 Tomahawks at IRGC Bandar Abbas and Chabahar — IRGC Navy severely degraded',
    location:  'Strait of Hormuz / Persian Gulf',
    summary:   'In direct response to the IRGC\'s second ballistic missile salvo and continued Hormuz closure, the USS Gerald R. Ford Carrier Strike Group fired approximately 40 BGM-109 Tomahawk Land Attack Missiles at IRGC Navy facilities at Bandar Abbas and, for the first time, the strategic Chabahar Naval Base on the Gulf of Oman. The strikes destroyed an estimated 60% of IRGC Navy fast-attack craft at Bandar Abbas and wiped out IRGC Chabahar entirely. Iran\'s ability to enforce the Hormuz closure was severely degraded.',
    fullContent: `At 05:45 UTC, USS Gerald R. Ford (CVN-78) and accompanying Ticonderoga-class cruiser USS Leyte Gulf (CG-55) and Arleigh Burke-class destroyer USS Stout (DDG-55) launched a coordinated Tomahawk salvo from positions in the Gulf of Oman.

Confirmed targets and battle damage assessment:

IRGC Bandar Abbas Naval Complex:
• Primary IRGC fast-attack craft (FAC) pens: 7 Mk III patrol boats destroyed at berth, 5 Thondor-class FACs destroyed.
• Shore-based Noor anti-ship missile battery: 2 of 4 launchers destroyed.
• IRGC Bandar Abbas command building: Struck, partially destroyed.
• Assessment: IRGC fast-attack capacity in the eastern Strait of Hormuz reduced by approximately 60%.

IRGC Chabahar Naval Base (first-ever strike):
• The Chabahar base serves as IRGC's strategic reserve naval force, positioned on the Gulf of Oman outside the Strait — an unconventional fallback if Bandar Abbas was struck.
• 12 Tomahawks struck the base comprehensively: piers, fuel storage, and FAC maintenance facilities destroyed.
• IRIS Damavand frigate (previously docked for refit) confirmed destroyed.
• Assessment: IRGC Chabahar operational capability: destroyed.

US strategic rationale: By striking Chabahar simultaneously with Bandar Abbas, the US eliminated the IRGC Navy's ability to reconstitute Hormuz enforcement capability from a fallback position. Commercial vessels in the Strait may now be able to transit with reduced IRGC naval threat — the primary remaining threat is shore-based Noor anti-ship missiles.

MarineTraffic data as of 06:30 UTC: Still zero vessel transits through the Strait. Lloyd's of London has not lifted war risk designation. US 5th Fleet has not yet formally declared freedom of navigation through Hormuz.

Pentagon: "We have degraded the IRGC's ability to threaten commercial shipping. We call on all parties to respect the freedom of navigation in international waters."`,
    verified: true,
    sources: [
      { name: 'Pentagon readout',   tier: 1, reliability: 95 },
      { name: 'USNI News',          tier: 1, reliability: 94 },
      { name: 'Reuters',            tier: 1, reliability: 99 },
      { name: 'Kpler maritime',     tier: 2, reliability: 92 },
    ],
    actorResponses: [
      { actorId: 'us',   actorName: 'Pentagon Spokesperson',      stance: 'SUPPORTING', type: 'STATEMENT', statement: 'We have degraded the IRGC\'s ability to threaten commercial shipping in the Strait of Hormuz. We call on all parties to respect freedom of navigation.' },
      { actorId: 'irgc', actorName: 'IRGC Navy (acting command)', stance: 'OPPOSING',   type: 'STATEMENT', statement: 'The American attack on our naval installations is a war crime. The Strait of Hormuz remains closed. IRGC forces maintain the capability to deny enemy transit.' },
    ],
    tags: ['tomahawk', 'bandar-abbas', 'chabahar', 'irgc-navy', 'hormuz', 'uss-ford', 'naval-strike', 'day-2'],
  },

  {
    id:        'evt-017',
    timestamp: '2026-03-01T08:30:00Z',
    severity:  'HIGH',
    type:      'ECONOMIC',
    title:     'NYSE opens -9.2%; Dow circuit breakers triggered; Brent $147; Fed calls emergency board meeting',
    location:  'New York / London / Frankfurt',
    summary:   'Global markets opened in crisis on March 1. The NYSE Dow Jones fell 9.2% in the opening minutes, triggering Level 1 circuit breakers and a 15-minute halt. Brent crude hit $147.38/barrel — highest since the 2008 price spike. The US Federal Reserve called an emergency board of governors meeting. Airlines suspended Middle East routes. European markets fell 7–11%. The global economic shock from simultaneous Hormuz and Bab el-Mandeb closures is being compared to the 1973 oil embargo in severity.',
    fullContent: `When global markets opened on March 1, 2026, the full economic weight of simultaneous closures of both major maritime energy chokepoints was reflected across every asset class.

Equity markets:
• Dow Jones Industrial Average: -9.2% at open → Level 1 circuit breaker triggered at -7% → 15-minute halt at 09:30 ET. Resumed and continued falling to -11.4% before partial stabilization.
• S&P 500: -8.7%. Nasdaq: -10.1% (tech/supply chain exposed names worst).
• European markets: DAX -11.3%, FTSE 100 -7.8% (BP, Shell +22% on oil exposure), CAC 40 -9.6%.
• Nikkei had already fallen 14% in Asian session.
• VIX (fear index): Spiked to 78 — above 2020 COVID levels.

Energy:
• Brent crude: $147.38/barrel (+38% vs Feb 27 close). Intraday high: $151.20.
• WTI: $143.70. Henry Hub natural gas: +41%.
• European TTF gas: +67% — reflecting LNG supply route disruption.
• Gasoline futures: Daily limit up. Average US gasoline price model suggests $6.80/gallon within 2 weeks if Hormuz closure persists.

Federal Reserve response:
• Fed Chair Jerome Powell called an emergency Board of Governors meeting at 10:00 ET.
• Fed released a statement: "The Federal Reserve is monitoring developments closely. The US financial system remains sound. We stand ready to deploy our tools to maintain financial stability."
• Markets interpreted the statement as insufficient; selling continued.

Airlines:
• American, United, Delta, Lufthansa, Emirates, British Airways all suspended Middle East routes.
• Air India and IndiGo faces refueling crisis — India is acutely exposed to Gulf LNG.

Economist Intelligence Unit: "If the Hormuz closure persists beyond 3 weeks, the global economy faces its most severe supply shock since 1973. The difference from 1973 is that strategic petroleum reserves are lower and global oil demand is higher. This is not a short-term spike — this is a structural disruption that will take months to resolve even after reopening."`,
    verified: true,
    sources: [
      { name: 'Bloomberg',          tier: 1, reliability: 98 },
      { name: 'Wall Street Journal', tier: 1, reliability: 98 },
      { name: 'Reuters',            tier: 1, reliability: 99 },
      { name: 'Federal Reserve',    tier: 1, reliability: 99 },
    ],
    actorResponses: [
      { actorId: 'us', actorName: 'Fed Chair Jerome Powell', stance: 'NEUTRAL', type: 'STATEMENT', statement: 'The Federal Reserve is monitoring developments closely. The US financial system remains sound. We stand ready to deploy our tools to maintain financial stability.' },
      { actorId: 'us', actorName: 'Treasury Secretary Bessent', stance: 'NEUTRAL', type: 'STATEMENT', statement: 'The US economy is resilient. We are coordinating with allies on strategic petroleum reserve releases. The markets will stabilize as the strategic picture becomes clearer.' },
    ],
    tags: ['markets', 'economic', 'nyse', 'oil', 'brent', 'fed', 'circuit-breakers', 'day-2'],
  },

  {
    id:        'evt-018',
    timestamp: '2026-03-01T10:15:00Z',
    severity:  'HIGH',
    type:      'DIPLOMATIC',
    title:     'IAEA emergency Board of Governors opens in Vienna — elevated radiation detected near Fordow',
    location:  'Vienna, Austria',
    summary:   'The IAEA Board of Governors convened an emergency session in Vienna, called by Russia following US-Israeli strikes on IAEA-safeguarded nuclear facilities. IAEA Director General Rafael Grossi presented preliminary findings: environmental monitoring stations in Qom governorate — 30km from the Fordow facility — have detected elevated readings of enriched uranium particles and Cs-137, consistent with a partial release of radioactive material from a destroyed centrifuge facility. Grossi called it "the most serious nuclear safeguards crisis in the history of the Agency."',
    fullContent: `IAEA Director General Rafael Grossi opened the emergency Board of Governors session in Vienna at 10:15 UTC with a formal presentation of the Agency's preliminary findings.

Key IAEA findings:
• Complete loss of safeguards sensor contact with Fordow and Natanz — confirmed.
• Environmental monitoring station at Qom University (ENVnet station IR-004, 28km from Fordow) detected: Cs-137 at 14x background, U-235 particulates at elevated levels, short-lived fission products consistent with enriched uranium exposure to air.
• The Agency assesses this is consistent with "partial atmospheric release of enriched uranium hexafluoride (UF6) and/or uranium particulates from a breached underground centrifuge facility."
• Health risk assessment: The detected levels at 30km distance suggest the local radiation dose at the Fordow perimeter may be significant. IAEA cannot assess conditions at the site without access.
• IAEA has requested immediate access to all struck nuclear facilities to assess structural integrity, containment status, and extent of any environmental release. Access has been denied by all parties.

Board of Governors positions:
• Russia and China: Called for immediate ceasefire, demanded independent radiation monitoring access, introduced draft resolution condemning strikes as violation of international law.
• United States (observer): "The responsibility for any environmental consequences lies entirely with the Iranian regime which spent decades hiding its nuclear weapons programme in violation of the NPT."
• UK, France, Germany: Called for "urgent and independent assessment" while refraining from condemning the strikes.
• IAEA DG Grossi: "I have said consistently that military action against nuclear facilities creates consequences we may not fully understand for years. Today we are beginning to see those consequences. I call on all parties to grant the Agency immediate access."

WHO assessment request submitted — potential public health emergency in Qom region possible if radiation release was larger than current estimates.`,
    verified: true,
    sources: [
      { name: 'IAEA Board of Governors transcript', tier: 1, reliability: 99 },
      { name: 'Reuters',                            tier: 1, reliability: 99 },
      { name: 'AP',                                 tier: 1, reliability: 98 },
      { name: 'BBC',                                tier: 1, reliability: 96 },
    ],
    actorResponses: [
      { actorId: 'iaea',   actorName: 'IAEA DG Grossi',       stance: 'NEUTRAL',  type: 'STATEMENT', statement: 'This is the most serious nuclear safeguards crisis in the history of the Agency. Elevated radiation has been detected near Fordow. We need immediate access to assess the situation.' },
      { actorId: 'russia', actorName: 'Russian IAEA envoy',   stance: 'OPPOSING', type: 'DIPLOMATIC', statement: 'Russia demands immediate cessation of all strikes on nuclear infrastructure. The IAEA must be granted full access. Russia holds the US and Israel legally responsible for any radioactive contamination.' },
      { actorId: 'us',     actorName: 'US IAEA representative', stance: 'SUPPORTING', type: 'DIPLOMATIC', statement: 'Responsibility for any environmental consequences lies with the Iranian regime that built an illegal nuclear weapons programme under these facilities for decades.' },
    ],
    tags: ['iaea', 'radiation', 'fordow', 'nuclear-contamination', 'vienna', 'board-of-governors', 'day-2'],
  },

  {
    id:        'evt-019',
    timestamp: '2026-03-01T11:00:00Z',
    severity:  'HIGH',
    type:      'MILITARY',
    title:     'Iraqi PMF attacks Ayn al-Asad air base: 2 US KIA — US retaliates against Kata\'ib Hezbollah',
    location:  'Anbar Province, Iraq / Baghdad environs',
    summary:   'Kata\'ib Hezbollah and affiliated Popular Mobilization Force units launched a coordinated mortar and rocket barrage on Ayn al-Asad Air Base in Anbar Province, Iraq — home to US and coalition forces. 2 US service members were killed and 8 wounded. Total US KIA in the theater rose to 7. Within 90 minutes, US Air Force F-15E aircraft launched retaliatory precision strikes on Kata\'ib Hezbollah weapons depots and command nodes near Jurf al-Sakhar and Abu Ghraib, south of Baghdad.',
    fullContent: `At 11:00 UTC on March 1, Ayn al-Asad Air Base in Anbar Province, Iraq came under sustained attack.

Attack details:
• Approximately 24 107mm and 122mm rockets were fired at Ayn al-Asad from launch points approximately 12km southeast of the base perimeter, consistent with pre-sited Kata\'ib Hezbollah positions.
• 3 mortar rounds (81mm) were fired from an unmanned vehicle — an advanced tactic indicative of Iranian IRGC technical support.
• US Phalanx CIWS and Counter-Rocket, Artillery, and Mortar (C-RAM) systems intercepted the majority, but 6–8 rockets impacted within the base perimeter.
• Barracks building housing US Army advisors sustained direct hit.
• 2 US Army Special Forces soldiers killed in action; 8 US personnel wounded (3 seriously).
• Total US KIA theater: 7.

CENTCOM retaliation (authorized under standing rules of engagement):
• 4x F-15E Strike Eagles from Al Udeid launched retaliatory strikes at 12:27 UTC.
• Targets: Kata\'ib Hezbollah main weapons depot, Jurf al-Sakhar (70km south of Baghdad); Kata\'ib Hezbollah command node, Abu Ghraib; 2x PMF weapons storage facilities identified by ISR in the preceding 48 hours.
• ISW confirmed all 4 targets destroyed or severely damaged.

Iraqi government response:
• Iraqi PM Mohammed Shia' al-Sudani formally protested US retaliatory strikes as a violation of Iraqi sovereignty.
• Simultaneously, al-Sudani requested a meeting with IRGC Quds Force intermediaries — indicating Baghdad's difficult position between Washington and Tehran.
• Parliamentary session called to debate whether to expel US forces.

Senator Lindsey Graham (R-SC): "Every PMF commander who ordered this attack will die. We will systematically eliminate every Iranian proxy asset in the Middle East."`,
    verified: true,
    sources: [
      { name: 'CENTCOM official statement', tier: 1, reliability: 99 },
      { name: 'Reuters',                    tier: 1, reliability: 99 },
      { name: 'AP',                         tier: 1, reliability: 98 },
      { name: 'ISW/CTP',                   tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'CENTCOM',           stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Two additional U.S. service members have been killed in action at Ayn al-Asad following a Kata\'ib Hezbollah rocket attack. US forces immediately struck the origin points and associated Kata\'ib Hezbollah infrastructure.' },
      { actorId: 'pmf', actorName: 'Kata\'ib Hezbollah', stance: 'OPPOSING',  type: 'STATEMENT', statement: 'The Islamic Resistance in Iraq confirms operations against the American occupation forces. All American bases in Iraq are legitimate military targets.' },
    ],
    tags: ['pmf', 'kata-ib-hezbollah', 'ayn-al-asad', 'iraq', 'us-kia', 'retaliation', 'day-2'],
  },

  {
    id:        'evt-020',
    timestamp: '2026-03-01T12:00:00Z',
    severity:  'HIGH',
    type:      'ECONOMIC',
    title:     'OPEC+ emergency session: Saudi Arabia pledges 2M bbl/day increase; IEA activates strategic reserves',
    location:  'Riyadh / Paris',
    summary:   'Saudi Arabia convened an emergency OPEC+ meeting and pledged to increase production by 2 million barrels per day to partially offset the Strait of Hormuz disruption. The full OPEC+ group agreed to a collective increase of 3.2M bbl/day. The International Energy Agency activated a coordinated release of 60 million barrels from member nations\' strategic petroleum reserves. Brent crude fell from $151 to $138 on the news, but analysts warned the relief would be temporary unless the Hormuz closure ends within 2–3 weeks.',
    fullContent: `Saudi Arabia's Crown Prince Mohammed bin Salman convened an emergency virtual OPEC+ session at noon UTC, attended by all 23 member and partner nations.

Saudi Arabia announcement:
• Saudi Aramco will immediately increase production from 9.0M bbl/day to 11.0M bbl/day — a 2M bbl/day increase, bringing production close to Saudi Arabia's theoretical maximum sustained capacity.
• MBS statement: "Saudi Arabia is committed to global energy stability. We cannot compensate for the full disruption, but we will do everything in our power to limit the global economic damage."
• Analysts noted the move was both economically motivated (higher prices benefit Saudi revenue even at lower volumes) and geopolitically calculated — Saudi Arabia positioning itself as a responsible energy actor while not taking sides in the conflict.

OPEC+ collective response:
• UAE: +400K bbl/day (already near capacity, small headroom)
• Kuwait: +150K bbl/day
• Iraq: +400K bbl/day (significant, but requires time to implement)
• Russia: Declined to commit — cited Western sanctions as preventing coordination
• Total OPEC+ committed increase: 3.2M bbl/day
• Caveat: Much of this production increase can only reach markets via Cape of Good Hope rerouting if Hormuz remains closed — adding 14+ days to transit time.

IEA strategic petroleum reserve release:
• IEA Governing Board authorized a 60 million barrel coordinated SPR release — approximately 2 million barrels per day over 30 days.
• US contributing 30M barrels, EU 15M barrels, Japan 10M barrels, others 5M barrels.
• Previous SPR releases in 2022 (Ukraine) and 2020 (COVID) provided 6–12 weeks of price relief.

Market reaction:
• Brent crude: Fell from $151.20 peak to $138.40 on the announcements.
• Analysts: "The SPR release buys time, but if Hormuz stays closed beyond 3 weeks, we're back to $150+ regardless."`,
    verified: true,
    sources: [
      { name: 'Saudi Energy Ministry',    tier: 1, reliability: 95 },
      { name: 'IEA press release',        tier: 1, reliability: 99 },
      { name: 'Reuters',                  tier: 1, reliability: 99 },
      { name: 'Bloomberg / Javier Blas',  tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'us', actorName: 'Treasury Secretary Bessent', stance: 'SUPPORTING', type: 'STATEMENT', statement: 'The IEA SPR release demonstrates the resolve of the international community to protect global energy markets. The US is contributing 30 million barrels.' },
    ],
    tags: ['opec', 'saudi-arabia', 'oil', 'spr', 'iea', 'energy-markets', 'day-2'],
  },

  {
    id:        'evt-021',
    timestamp: '2026-03-01T13:00:00Z',
    severity:  'HIGH',
    type:      'MILITARY',
    title:     'US retaliates against Houthi infrastructure in Yemen — B-52s and naval Tomahawks target missile sites',
    location:  'Sanaa / Hodeidah, Yemen',
    summary:   'In response to the Houthi resumption of Red Sea attacks and continued threats against US naval assets, the US launched a major strike package against Houthi missile and drone infrastructure in Yemen. B-52H Stratofortresses staging from Diego Garcia and Tomahawks from USS Eisenhower destroyed the Houthi\'s primary ballistic missile launch complex near Sanaa and the main drone production facility in Sanaa\'s industrial district. The strikes were the heaviest US strikes on Yemen in the conflict.',
    fullContent: `At 13:00 UTC, CENTCOM confirmed the launch of strike operations against Houthi military infrastructure in Yemen in direct response to Houthi attacks on Red Sea commercial shipping and aggressive posturing toward USS Eisenhower.

Targets struck:
• Al-Dailami Air Base (Sanaa): Primary Houthi ballistic missile storage and launch facility. Multiple hardened missile shelters destroyed by JASSM-ER cruise missiles launched from B-52Hs.
• Sanaa industrial district: Houthi drone production facility (assessed as a primary Shahed-136 clone production line, built with IRGC technical assistance). Destroyed.
• Hodeidah port military zone: IRGC-supplied Frog-7 and Zelzal short-range missile batteries staged for Red Sea anti-ship operations. Multiple Tomahawks from USS Eisenhower (CVN-69) destroyed the batteries.
• Houthi coastal radar network: 6 long-range maritime radar installations along the Red Sea coast destroyed — degrading Houthi ability to target shipping.

Houthi response:
• Naim Qassem (Houthi-aligned figure; Hezbollah SG — but Houthi military spokesperson Yahya Saree issued statement): "American aggression against Yemen will be met with fire. All US and allied vessels in the Red Sea and Arabian Sea are legitimate targets."
• Houthi attempted retaliatory ballistic missile launch against USS Eisenhower — intercepted by SM-3 at 60km altitude.

CENTCOM assessment: "The strikes have significantly degraded Houthi long-range ballistic missile and drone strike capability. However, Houthi rocket artillery and short-range coastal missile capability remain intact. The Red Sea threat has been reduced but not eliminated."

UK Royal Navy HMS Diamond (Type 45 destroyer), operating in the Red Sea in support of Operation Prosperity Guardian, intercepted 3 Houthi anti-ship missiles during the operation.`,
    verified: true,
    sources: [
      { name: 'CENTCOM official statement', tier: 1, reliability: 99 },
      { name: 'Reuters',                    tier: 1, reliability: 99 },
      { name: 'USNI News',                  tier: 1, reliability: 94 },
      { name: 'ISW/CTP',                   tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'us',      actorName: 'CENTCOM',                       stance: 'SUPPORTING', type: 'STATEMENT', statement: 'US forces have struck Houthi missile and drone infrastructure in Yemen in response to Houthi attacks on commercial shipping and threats to US naval forces.' },
      { actorId: 'houthis', actorName: 'Houthi Military Spokesperson',  stance: 'OPPOSING',   type: 'STATEMENT', statement: 'American aggression against Yemen will be met with fire. All US and allied vessels in the Red Sea and Arabian Sea are legitimate targets.' },
    ],
    tags: ['houthi', 'yemen', 'red-sea', 'b-52', 'tomahawk', 'sanaa', 'day-2'],
  },

  {
    id:        'evt-022',
    timestamp: '2026-03-01T15:00:00Z',
    severity:  'HIGH',
    type:      'DIPLOMATIC',
    title:     'Oman backchannel: Iran transitional government signals readiness to negotiate ceasefire terms',
    location:  'Muscat, Oman',
    summary:   'Through the Omani diplomatic channel — historically the primary US–Iran back-channel — the Iranian transitional government sent a preliminary signal that it is willing to discuss "conditions for a cessation of hostilities." The overture, communicated by Iran\'s Ambassador in Muscat to an Omani intermediary and relayed to the US State Department, stopped short of a formal ceasefire request but represented the first Iranian diplomatic outreach of the conflict. The Trump administration confirmed receipt but said negotiations require Iran to first "acknowledge the complete and verifiable end of its nuclear programme."',
    fullContent: `Multiple diplomatic sources and news organizations confirmed a significant development at approximately 15:00 UTC on March 1: the Iranian transitional government had, through Omani intermediaries, made its first diplomatic communication to the United States.

The channel:
Oman has historically served as the primary back-channel between Washington and Tehran — most recently facilitating the indirect nuclear talks that preceded the 2015 JCPOA and multiple prisoner exchanges. Iran's Ambassador in Muscat conveyed a preliminary message to Omani Foreign Minister Badr al-Busaidi, who relayed it to a senior US State Department official present in Muscat.

Content of the Iranian communication (per Reuters, three diplomatic sources):
• Iran acknowledged it "wishes to discuss conditions under which a cessation of hostilities could be achieved."
• Iran did not offer unconditional ceasefire.
• Iran requested assurances regarding US intent toward regime change — "Iran seeks guarantees that the objective is nuclear capability, not the Islamic Republic itself."
• Iran asked whether a "return to JCPOA-type framework with enhanced verification" could constitute the basis for talks.

US response:
Secretary of State Marco Rubio, speaking in brief remarks: "We have received a communication from Iran through intermediaries. We are reviewing it. Our position is clear: Iran must first acknowledge the complete and verifiable end of its nuclear programme. There is no deal without that."

Israeli response:
Netanyahu's office: "Israel's strikes will not stop based on back-channel communications. We will stop when the nuclear programme is verifiably destroyed and the missile programme is dismantled. Not before."

Assessment: The communication suggests the Iranian transitional government — lacking the ideological rigidity of Khamenei — may be genuinely open to an off-ramp. The key obstacle is the US-Israeli split on what constitutes acceptable terms: Washington may be open to a deal; Tel Aviv is continuing strikes regardless.`,
    verified: true,
    sources: [
      { name: 'Reuters (three diplomatic sources)', tier: 1, reliability: 93 },
      { name: 'Wall Street Journal',               tier: 1, reliability: 97 },
      { name: 'Times of Israel',                   tier: 2, reliability: 88 },
      { name: 'AP',                                tier: 1, reliability: 98 },
    ],
    actorResponses: [
      { actorId: 'us',   actorName: 'Secretary of State Rubio', stance: 'NEUTRAL',    type: 'DIPLOMATIC', statement: 'We have received a communication from Iran through intermediaries. Our position is clear: Iran must first acknowledge the complete and verifiable end of its nuclear programme.' },
      { actorId: 'idf',  actorName: 'PM Netanyahu',             stance: 'SUPPORTING', type: 'STATEMENT',  statement: 'Israel\'s strikes will not stop based on back-channel communications. We will stop when the nuclear programme is verifiably destroyed and the missile programme dismantled.' },
      { actorId: 'iran', actorName: 'Iranian Transitional Gov.', stance: 'NEUTRAL',   type: 'DIPLOMATIC', statement: 'Iran seeks a cessation of hostilities and guarantees regarding sovereignty. We are willing to discuss a framework for verifiable nuclear limitations in exchange for an end to aggression.' },
    ],
    tags: ['oman', 'backchannel', 'ceasefire', 'diplomacy', 'rubio', 'iran-talks', 'day-2'],
  },

  {
    id:        'evt-023',
    timestamp: '2026-03-01T17:30:00Z',
    severity:  'HIGH',
    type:      'INTELLIGENCE',
    title:     'IAEA confirms trace radiation release near Fordow — enriched uranium particles detected at Qom',
    location:  'Fordow / Qom, Iran',
    summary:   'IAEA Director General Grossi made a formal statement confirming that environmental monitoring data from the Qom governorate shows a definitive, low-level release of radioactive material from the Fordow facility — the first confirmed radiological release from a destroyed nuclear site. U-235 enriched to 60% was detected in atmospheric particulates at a monitoring station 28km from Fordow. The release is assessed as limited in scale but confirms partial atmospheric breach of the underground enrichment complex. Iran condemned the release as a "nuclear war crime."',
    fullContent: `IAEA DG Grossi issued a formal statement to the Board of Governors at 17:30 UTC:

"I can confirm that IAEA environmental monitoring station IR-004, located at Qom University approximately 28 kilometres from the Fordow Fuel Enrichment Plant, has recorded measurements that are inconsistent with normal background levels. Specifically:
• U-235 particulate enriched to approximately 60% has been detected in three consecutive air samples taken between 06:00 and 17:00 UTC today.
• Cs-137 levels remain elevated at 12x background as of the most recent reading.
• Short-lived fission products (I-131, Sr-90 trace) are present at low levels.

Our assessment is that these readings are consistent with a partial atmospheric breach of the Fordow enrichment facility — likely the result of UF6 gas escaping through structural damage to the underground complex and converting to uranium oxide (UO2) and uranium tetrafluoride (UF4) particulates upon exposure to air.

Current readings at 28km distance do not represent an acute public health emergency at that distance. However, we cannot determine conditions closer to the facility without physical access, which we continue to be denied.

I am immediately dispatching the IAEA Incident and Emergency Centre team to the region and requesting WHO activation of its radiation emergency protocol. I urge all parties to immediately grant the Agency access to verify site conditions and protect public health."

Iranian transitional government response:
"The United States and Israel have committed a nuclear war crime. They have deliberately destroyed Iran's civilian nuclear infrastructure, causing radioactive contamination of Iranian soil and potentially threatening the lives of millions of Iranians. We hold them fully responsible."

US State Department: "The IAEA's readings are consistent with the destruction of an illegal weapons-grade nuclear enrichment programme. The Iranian regime built these facilities in secret underground bunkers — any environmental consequences are their responsibility."

Qom Province health authorities ordered precautionary indoor sheltering for residents within 50km of Fordow pending further assessment.`,
    verified: true,
    sources: [
      { name: 'IAEA official statement',      tier: 1, reliability: 99 },
      { name: 'Reuters',                       tier: 1, reliability: 99 },
      { name: 'BBC',                           tier: 1, reliability: 96 },
      { name: 'IRNA (Iranian state media)',    tier: 2, reliability: 80 },
    ],
    actorResponses: [
      { actorId: 'iaea',   actorName: 'IAEA DG Grossi',              stance: 'NEUTRAL',  type: 'STATEMENT',  statement: 'U-235 enriched to 60% has been detected 28km from Fordow. This confirms a partial atmospheric breach. I am dispatching emergency teams. We need immediate access.' },
      { actorId: 'iran',   actorName: 'Iranian Transitional Govt.',  stance: 'OPPOSING', type: 'STATEMENT',  statement: 'The US and Israel have committed a nuclear war crime. They have contaminated Iranian soil. We hold them fully responsible for all consequences.' },
      { actorId: 'russia', actorName: 'Russian Foreign Ministry',    stance: 'OPPOSING', type: 'DIPLOMATIC', statement: 'Russia demands an immediate UNSC emergency session. The radiation release at Fordow represents a crime against humanity. We will pursue accountability at every international forum.' },
    ],
    tags: ['iaea', 'radiation', 'fordow', 'qom', 'uranium', 'nuclear-contamination', 'day-2'],
  },

  {
    id:        'evt-024',
    timestamp: '2026-03-01T20:15:00Z',
    severity:  'HIGH',
    type:      'POLITICAL',
    title:     'Trump: "Iran has asked for a DEAL" — ceasefire negotiations hinted at Mar-a-Lago presser',
    location:  'Mar-a-Lago, Florida',
    summary:   'At an evening press conference at Mar-a-Lago, President Trump publicly signalled for the first time that Iran has reached out seeking negotiations. "Iran has asked for a deal. They want a deal very badly. We\'ll see what happens." Trump described "very positive" back-channel communications but said the US would accept nothing less than full nuclear dismantlement. Netanyahu, speaking separately from Jerusalem, said Israel would continue strikes regardless of diplomatic contacts. The exchange exposed a growing divergence in US and Israeli end-state objectives.',
    fullContent: `At 20:15 UTC, President Trump held an unscheduled press conference at Mar-a-Lago, departing from the prepared CENTCOM briefing format of previous days.

Trump's key statements:
"Iran has asked for a deal. They want a deal very badly. I've been telling you all along — they're very smart people. They know what they had. Now they don't have it anymore. We'll see what happens. Things are moving in a very positive direction."

"We're not looking to hurt the Iranian people. We love the Iranian people — many of them are great. We're looking at the nuclear programme, we're looking at the missiles, and we're looking at making the world safe. If Iran agrees to those things, everything gets solved very quickly."

When asked about Israeli strikes continuing: "Israel will do what Israel needs to do. That's their decision. We have a great relationship with Israel. Our operation has its own objectives and timeline."

This final comment was immediately flagged as significant — it suggested Trump may be open to a US ceasefire independent of Israeli operations, creating the first visible US-Israel divergence on end-state.

Netanyahu response (Jerusalem, simultaneous press conference): 
"Israel is continuing Operation Roaring Lion. We will not stop until the nuclear programme and the missile programme are verifiably destroyed. Back-channel communications do not change our operational posture. We are days, not weeks, from completing our objectives."

Analysts noted that Trump's openness to a deal and Netanyahu's insistence on completing military objectives represent the first serious divergence between the two leaders since the operation began. If the US were to pursue a ceasefire deal before Israel completes its objectives, it would create the most significant US-Israel rupture since the 1956 Suez Crisis.

Former NSA John Bolton (Fox News): "The worst thing Trump could do right now is accept a half-finished deal. If he stops before the missile programme is destroyed, Iran will rebuild within 5 years."`,
    verified: true,
    sources: [
      { name: 'Reuters pool (Mar-a-Lago)', tier: 1, reliability: 99 },
      { name: 'CNN',                       tier: 1, reliability: 95 },
      { name: 'AP',                        tier: 1, reliability: 98 },
      { name: 'Times of Israel',           tier: 2, reliability: 88 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'President Trump',      stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Iran has asked for a deal. They want a deal very badly. Things are moving in a very positive direction. We\'ll see what happens.' },
      { actorId: 'idf', actorName: 'PM Netanyahu',         stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Israel is continuing Operation Roaring Lion. We will not stop until the nuclear programme and missile programme are verifiably destroyed. Back-channel communications change nothing.' },
    ],
    tags: ['trump', 'ceasefire', 'deal', 'iran-negotiations', 'us-israel-divergence', 'day-2'],
  },

  {
    id:        'evt-025',
    timestamp: '2026-03-01T21:30:00Z',
    severity:  'HIGH',
    type:      'MILITARY',
    title:     'Iran launches third retaliatory wave: 100+ Shahed drones intercepted over Israel overnight',
    location:  'Israel / Jordan / Saudi Arabia (airspace)',
    summary:   'Iran launched its most complex retaliatory strike of the conflict — a combined salvo of approximately 110 Shahed-136 loitering munitions and 18 ballistic missiles in a coordinated swarm designed to overwhelm Israeli air defenses through simultaneous saturation from multiple vectors. Iron Dome, David\'s Sling, and Arrow-2 systems engaged the swarm for approximately 2.5 hours. 97 of 110 drones were intercepted. 13 drones penetrated defenses: 3 impacted in the Negev (Ashkelon vicinity), 10 were downed by Israeli Air Force interceptors. 3 Israeli civilians were wounded.',
    fullContent: `At 21:30 UTC, IRGC Aerospace Force launched Operation True Promise 3 — third wave: the largest combined drone-ballistic attack of the conflict.

Attack composition:
• 110x Shahed-136 loitering munitions — launched from multiple sites in western and central Iran, with a subset launched from Iraqi territory (PMF-operated positions), triangulating the attack to overwhelm directional air defense coverage.
• 18x ballistic missiles: 12x Emad, 6x Kheibar Shekan — targeting Tel Aviv and Haifa.

Israeli air defense engagement:
• Iron Dome: 71 drones engaged, 64 intercepted (90%).
• David's Sling: 5 ballistic missiles engaged, 5 intercepted (100%).
• Arrow-3/2: 11 ballistic missiles engaged, 11 intercepted (100%).
• IDF F-35Is scrambled: 10 drones destroyed in Israeli airspace before reaching population centers.
• Jordan Air Force cooperated in intercepting transit drones passing through Jordanian airspace: confirmed 8 kills.
• Saudi Arabia intercepted 3 drones that tracked across Saudi airspace toward Israel.

Penetration outcome:
• 13 Shahed-136 drones penetrated Iron Dome coverage — 10 were destroyed by F-35I aircraft before reaching targets, 3 impacted in the Negev desert area near Ashkelon.
• Ashkelon impact: 1 agricultural building destroyed, 3 civilians injured (non-life threatening).
• No ballistic missile penetrations.

IDF assessment: "The third wave was designed as a saturation attack — more vectors, more munitions, simultaneous timing. Iron Dome performed above design parameters. The use of Iraqi territory as a launch corridor by PMF/IRGC forces marks a significant escalation and expansion of the conflict geography."

CENTCOM: "The use of Iraqi territory for missile launches against Israel is a direct violation of Iraqi sovereignty and international law. CENTCOM is consulting with the Iraqi government regarding the origin points."`,
    verified: true,
    sources: [
      { name: 'IDF Spokesperson',      tier: 1, reliability: 90 },
      { name: 'Reuters',               tier: 1, reliability: 99 },
      { name: 'ISW/CTP',              tier: 1, reliability: 97 },
      { name: 'CENTCOM statement',     tier: 1, reliability: 99 },
    ],
    actorResponses: [
      { actorId: 'idf',  actorName: 'IDF Spokesperson',            stance: 'NEUTRAL',  type: 'STATEMENT', statement: 'Iron Dome and Arrow systems performed above parameters. The third wave was intercepted with 97 of 110 drones destroyed. Three civilians sustained minor injuries near Ashkelon.' },
      { actorId: 'irgc', actorName: 'IRGC Aerospace Force',        stance: 'OPPOSING', type: 'STATEMENT', statement: 'The IRGC confirms the launch of a third wave of precision strikes against the Zionist entity. The Islamic Republic\'s retaliatory capability is not exhausted.' },
      { actorId: 'us',   actorName: 'CENTCOM',                     stance: 'NEUTRAL',  type: 'STATEMENT', statement: 'The use of Iraqi territory as a launch corridor for attacks against Israel is a violation of Iraqi sovereignty. We are consulting with Baghdad.' },
    ],
    tags: ['drone-swarm', 'iron-dome', 'shahed', 'israel', 'third-wave', 'saturation-attack', 'day-2'],
  },

  {
    id:        'evt-026',
    timestamp: '2026-03-01T23:00:00Z',
    severity:  'HIGH',
    type:      'POLITICAL',
    title:     'G7 emergency summit: Europe demands ceasefire within 48 hours; US and Canada decline to commit',
    location:  'Brussels / virtual',
    summary:   'G7 leaders convened an emergency virtual summit at 23:00 UTC. The UK, France, Germany, Italy, and Japan issued a joint statement calling for "an immediate ceasefire within 48 hours, humanitarian corridors, and a return to diplomatic engagement." The United States and Canada declined to endorse the ceasefire timeline. The summit produced no binding agreement and exposed the deepest transatlantic rift since the 2003 Iraq War. EU Council President called the failure to agree "a crisis of Western coherence."',
    fullContent: `G7 leaders convened in emergency virtual format at 23:00 UTC. The meeting lasted approximately 2 hours and 20 minutes.

Joint communiqué negotiations:
• Five G7 members — UK, France, Germany, Italy, Japan — supported language calling for "an immediate ceasefire within 48 hours" and "unimpeded humanitarian access to all affected regions including Iran."
• The United States declined to endorse a 48-hour ceasefire timeline, with a senior US official describing it as "unrealistic given operational timelines and contrary to our security objectives."
• Canada aligned with the US position, declining to sign the ceasefire timeline language.
• Result: No joint communiqué. A split statement was issued — five members endorsing ceasefire language; US and Canada issuing a separate statement reaffirming the "right to self-defense against existential nuclear threats."

European positions:
• French President Macron: "We cannot allow a conflict in the Middle East to spiral into a global economic catastrophe and a nuclear contamination event simultaneously. France demands an immediate ceasefire and the deployment of IAEA inspectors."
• German Chancellor Merz: "The radiation data from Fordow is deeply alarming. Europe's security depends on functional international institutions. We must act."
• UK PM Starmer: "The UK supports Israel's right to self-defense but calls on all parties to pause and pursue diplomatic options."

US position: Secretary of State Rubio (representing the US in the summit): "The United States will not abandon a historic operation to defang the world's most destabilizing nuclear program based on a 48-hour deadline. We are pursuing all diplomatic options in parallel with military operations."

EU Council President von der Leyen: "What we witnessed tonight is a crisis of Western coherence at a moment when unity has never been more important. This G7 result will embolden our adversaries."

Significance: The transatlantic split is the most significant diplomatic development of the conflict for the US and Israel. European support for sanctions, trade continuity, and diplomatic cover has historically been critical to US operations in the Middle East.`,
    verified: true,
    sources: [
      { name: 'Reuters',                tier: 1, reliability: 99 },
      { name: 'AP',                     tier: 1, reliability: 98 },
      { name: 'BBC',                    tier: 1, reliability: 96 },
      { name: 'Politico EU',            tier: 1, reliability: 93 },
    ],
    actorResponses: [
      { actorId: 'us',     actorName: 'Secretary of State Rubio',  stance: 'SUPPORTING', type: 'DIPLOMATIC', statement: 'The United States will not abandon a historic operation to defang the world\'s most destabilizing nuclear programme based on a 48-hour deadline.' },
      { actorId: 'russia', actorName: 'Russian MFA',               stance: 'OPPOSING',   type: 'DIPLOMATIC', statement: 'The G7\'s failure to agree a ceasefire exposes the complete bankruptcy of Western international institutions. Russia calls for an emergency UNGA emergency special session.' },
    ],
    tags: ['g7', 'ceasefire', 'transatlantic', 'europe', 'diplomacy', 'macron', 'day-2'],
  },
];

export const SEV_STYLE: Record<Severity, { bg: string; color: string; dimBg: string }> = {
  CRITICAL: { bg: 'var(--danger)',  color: 'var(--danger)',  dimBg: 'var(--danger-dim)' },
  HIGH:     { bg: 'var(--warning)', color: 'var(--warning)', dimBg: 'var(--warning-dim)' },
  STANDARD: { bg: 'var(--info)',    color: 'var(--info)',    dimBg: 'var(--info-dim)' },
};
