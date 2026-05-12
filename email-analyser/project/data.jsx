/* MailLens — sample data */

const HISTORY = [
  // group: today
  {
    id: 'e1',
    group: 'Today',
    from: 'Marcus Whitfield',
    fromEmail: 'marcus.whitfield@northgate-capital.com',
    initials: 'MW',
    avatarHue: 'from-rose',
    subject: 'Re: Q3 audit — outstanding items & wire deadline',
    snippet: 'I need confirmation on three line items before EOD or we miss the filing window…',
    time: '11:42',
    urgency: 'crit',
    unread: true,
    tags: ['Finance', 'Legal'],
    active: true,
  },
  {
    id: 'e2',
    group: 'Today',
    from: 'Priya Ramanathan',
    fromEmail: 'priya@lighthouse.studio',
    initials: 'PR',
    avatarHue: 'from-violet',
    subject: 'Final review of brand guidelines deck',
    snippet: 'Tagged you on the type system slide — small thing but want your eye on it.',
    time: '10:15',
    urgency: 'med',
    unread: true,
    tags: ['Design'],
  },
  {
    id: 'e3',
    group: 'Today',
    from: 'Jonas Albrecht',
    fromEmail: 'jonas@drift-research.de',
    initials: 'JA',
    avatarHue: 'from-amber',
    subject: 'Customer interview transcripts (batch 04)',
    snippet: 'Six interviews uploaded to the shared drive. Patterns emerging around onboarding…',
    time: '09:03',
    urgency: 'low',
  },
  {
    id: 'e4',
    group: 'Today',
    from: 'Eleanor Park',
    fromEmail: 'eleanor.park@maillens.io',
    initials: 'EP',
    avatarHue: 'from-cyan',
    subject: 'Tomorrow\'s board prep — slides ready',
    snippet: 'Slides are in the deck. Walk-through at 8am if you want to go through it together.',
    time: '08:34',
    urgency: 'high',
    tags: ['Internal'],
  },
  // group: yesterday
  {
    id: 'e5',
    group: 'Yesterday',
    from: 'Tomás Vidal',
    fromEmail: 'tvidal@aperture-ventures.com',
    initials: 'TV',
    avatarHue: 'from-green',
    subject: 'Term sheet — couple of small redlines',
    snippet: 'Walked through with our counsel this morning. Two flagged items, one nit…',
    time: 'Tue',
    urgency: 'high',
  },
  {
    id: 'e6',
    group: 'Yesterday',
    from: 'Hannah Devereux',
    fromEmail: 'hannah@ribbon-press.co.uk',
    initials: 'HD',
    avatarHue: 'from-rose',
    subject: 'Press feature — fact-check needed',
    snippet: 'Could you confirm the founding-year detail and headcount before we go to print?',
    time: 'Tue',
    urgency: 'med',
  },
  {
    id: 'e7',
    group: 'Yesterday',
    from: 'Reza Pourian',
    fromEmail: 'reza@pourian.dev',
    initials: 'RP',
    avatarHue: 'from-violet',
    subject: 'API rate-limit retrospective',
    snippet: 'Quick post-mortem on the spike yesterday. Mostly good news — one regression…',
    time: 'Tue',
    urgency: 'low',
  },
  // group: this week
  {
    id: 'e8',
    group: 'This week',
    from: 'Kira Olafsdóttir',
    fromEmail: 'kira@nordlys-design.is',
    initials: 'KO',
    avatarHue: 'from-cyan',
    subject: 'Workshop scheduling — three options',
    snippet: 'I have availability on the 14th, 17th, or the morning of the 21st…',
    time: 'Mon',
    urgency: 'low',
  },
  {
    id: 'e9',
    group: 'This week',
    from: 'Devon Mireles',
    fromEmail: 'd.mireles@sentinel-legal.com',
    initials: 'DM',
    avatarHue: 'from-amber',
    subject: 'NDA — countersigned',
    snippet: 'Attached the fully executed copy. Filing under the 2026/Q1 vendor folder.',
    time: 'Mon',
    urgency: 'low',
  },
];

const ACTIVE_EMAIL = {
  from: 'Marcus Whitfield',
  fromTitle: 'Senior Audit Partner · Northgate Capital',
  fromEmail: 'marcus.whitfield@northgate-capital.com',
  initials: 'MW',
  to: 'you@maillens.io',
  cc: 'eleanor.park@maillens.io, devon.m@sentinel-legal.com',
  date: 'May 8, 2026 · 11:42 BST',
  subject: 'Re: Q3 audit — outstanding items & wire deadline',
  body: `Hi —

Following up on Friday's call. We're now down to three items I need confirmed before I can sign off on the Q3 close, and the filing window with HMRC closes at 17:00 today. I cannot move on this without you.

1. The Vector intercompany transfer dated 14 March — I still don't have a counter-signed memo. The PDF Eleanor sent me is a draft; I need the executed copy.

2. The Q3 deferred revenue schedule shows a £284,000 swing from the August snapshot. I need a one-line attribution before I can attest to it. If it's the contract renegotiation we discussed, just say so on email and I'll attach this thread.

3. Wire confirmation for the Sentinel retainer — the bank reference number, not the invoice number. Devon should have it.

I've moved every other meeting today. If we miss this, the late-filing penalty starts at £1,200 and compounds weekly until next quarter's close. I'd rather not explain that to your board.

Call me direct if it's faster than email — 020 7946 0418.

Best,
Marcus`,
  meta: { wordCount: 198, readTime: 'Under 1 min', attachments: 0 },
};

const ANALYSIS = {
  ts: 'Analyzed 11:43 · model v2.3',
  mood: {
    label: 'Tense, controlled',
    description: 'Polite surface, real pressure underneath. Frustration is implied but not directed at you.',
    sentiment: 'negative',
    confidence: 92,
    tones: [
      { label: 'Frustration', val: 0.74 },
      { label: 'Urgency', val: 0.88 },
      { label: 'Formality', val: 0.62 },
      { label: 'Warmth', val: 0.18 },
    ],
    tags: ['Time-pressured', 'Implied stakes', 'Direct asks'],
  },
  urgency: {
    level: 4, // 1..4
    label: 'Critical',
    rationale: 'Hard deadline today (17:00 BST) tied to a regulatory filing. Financial penalty stated.',
    deadline: 'Today, 17:00 BST',
  },
  responseTime: {
    num: '< 30',
    unit: 'min',
    by: 'Reply by 12:15 BST',
    reason: 'Marcus needs all three items resolved before drafting the filing — earlier reply gives him buffer.',
  },
  summary: {
    parts: [
      "Marcus is blocking on ",
      { mark: 'three Q3 close items' },
      " before the ",
      { mark: '17:00 HMRC filing deadline' },
      " today: a counter-signed Vector memo, an attribution line for a ",
      { strong: '£284k deferred-revenue swing' },
      ", and the Sentinel wire bank reference. He's escalated by clearing his calendar and offered a phone fallback.",
    ],
  },
  actions: [
    { id: 'a1', text: 'Forward executed Vector intercompany memo to Marcus', due: 'Today, 12:00', done: true, owner: 'You' },
    { id: 'a2', text: 'Confirm £284k swing is from the Helix renegotiation (one-line email)', due: 'Today, 12:30', overdue: false, owner: 'You' },
    { id: 'a3', text: 'Get Sentinel wire reference from Devon — not invoice no.', due: 'Today, 13:00', overdue: false, owner: 'Devon' },
    { id: 'a4', text: 'Call Marcus on 020 7946 0418 if any item slips past 14:00', due: 'If needed', done: false, owner: 'You' },
  ],
  reply: {
    tone: 'Direct',
    body: `Hi Marcus,

Acknowledged on all three. Working them now:

  1. Vector memo — executed copy is attached. Eleanor sent the draft by mistake on Friday; this one carries both signatures.
  2. £284k swing — that's the Helix contract renegotiation we discussed. Confirming on the record: deferred revenue moved from the original 36-month schedule to a 24-month accelerated structure, which is what produced the August-to-September delta. Treat this email as the attribution line for the file.
  3. Sentinel wire — Devon is pulling the bank reference now. I've copied him directly so you'll get it in the next 30 minutes; if it isn't with you by 13:00 I'll call you.

Clearing the rest of my afternoon to sit on this until you've signed off. If you'd rather walk through any of it, I'm at my desk on the line below.

Thanks for moving things around today.

Best,
Alex`,
  },
};

const TONES = [
  { id: 'direct', label: 'Direct' },
  { id: 'warm', label: 'Warm' },
  { id: 'concise', label: 'Concise' },
  { id: 'apologetic', label: 'Apologetic' },
  { id: 'formal', label: 'Formal' },
  { id: 'assertive', label: 'Assertive' },
  { id: 'curious', label: 'Curious' },
];

const REPLY_VARIANTS = {
  direct: ANALYSIS.reply.body,
  warm: `Hi Marcus,

Thank you for laying these out so clearly — and for moving your calendar around today. I know this isn't where you wanted to be at 11:42 on a Wednesday.

Here's where I am on each item:

The Vector memo — fully executed copy is attached. Apologies for the Friday confusion; that draft shouldn't have left the building.

The £284k swing — yes, this is the Helix renegotiation we walked through last month. We moved them from a 36-month schedule to a 24-month accelerated structure, which is what produced the snapshot delta. You can treat this email as the formal attribution line for the file.

The Sentinel wire reference — Devon is pulling it now and I've copied him directly. You'll have it within 30 minutes; if anything looks off, I'm staying at my desk through the deadline.

Really appreciate the heads-up on the penalty. Speak soon.

Warm regards,
Alex`,
  concise: `Marcus —

1. Vector memo — executed copy attached.
2. £284k swing — Helix renegotiation; 36→24mo accelerated. Treat this as the attribution line.
3. Sentinel wire — Devon pulling now (cc'd); within 30 min.

At my desk through 17:00. Direct line in signature.

Alex`,
  apologetic: `Hi Marcus,

I'm sorry you're chasing these on the day of the deadline — that's on us. Here's everything you need:

1. Vector memo — the executed copy is attached. The Friday version was a draft; that shouldn't have been the one Eleanor sent.
2. £284k deferred-revenue swing — confirming on the record that it's the Helix renegotiation (36→24mo accelerated). This email is the attribution line for the file.
3. Sentinel wire reference — Devon is pulling it now, copied here directly. With you within 30 minutes.

I'll stay at my desk until you've signed off. Apologies again for the scramble.

Best,
Alex`,
  formal: `Dear Marcus,

Thank you for the consolidated list. Please find responses to each item below.

1. Vector intercompany transfer — the fully executed memorandum is enclosed herewith.
2. Q3 deferred-revenue variance of £284,000 — confirmed as attributable to the Helix Industries contract renegotiation, specifically the migration from a 36-month to a 24-month accelerated revenue-recognition schedule. This correspondence may serve as the formal attribution.
3. Sentinel retainer wire — Mr. Mireles is retrieving the bank reference at the time of writing and has been copied to this thread. You should have it within thirty minutes.

I will remain available at the number below until the filing is complete.

Kind regards,
Alex`,
  assertive: `Marcus,

All three resolved or in motion:

1. Vector — executed memo attached. The Friday PDF was a draft, full stop.
2. £284k — Helix renegotiation, 36→24mo. This email is the attribution. File it.
3. Sentinel — Devon has the wire reference and is copied here. With you in 30 minutes or you call me.

I'm not letting this slip the deadline. Direct line if you need it.

Alex`,
  curious: `Hi Marcus,

Working through each — quick questions where I have them:

1. Vector memo — executed copy attached. Did you also need the schedule of attached transfers, or just the memo itself?
2. £284k swing — this is the Helix renegotiation (36→24mo accelerated). Happy for this email to be the attribution; let me know if you'd prefer a separate memo for the file.
3. Sentinel wire — Devon is pulling the bank reference and is on this thread. While he's looking — was the question only about the retainer, or do you also need the second tranche?

Standing by.

Best,
Alex`,
};

const THREAD = [
  {
    id: 't1',
    from: 'You',
    initials: 'AK',
    hue: 'from-cyan',
    to: 'Marcus Whitfield',
    time: 'Fri, May 3 · 17:08',
    body: `Hi Marcus,\n\nQuarter close items from your last note are mostly cleared. Vector memo is with Eleanor for final exec. Sentinel retainer paid Wednesday — Devon has the reference. Helix attribution memo will follow Monday.\n\nAnything else outstanding from your side?\n\nAlex`,
    insight: { kind: 'tone', text: 'Cooperative, low-urgency check-in.' },
  },
  {
    id: 't2',
    from: 'Marcus Whitfield',
    initials: 'MW',
    hue: 'from-rose',
    to: 'you',
    time: 'Fri, May 3 · 18:42',
    body: `Thanks Alex. I'll circle back Monday with anything I'm missing once I've reviewed Vector. The Helix attribution can wait until close, but I'd like the wording locked before the filing.`,
    insight: { kind: 'tone', text: 'Neutral, deferred. Sets a soft expectation for Monday follow-up.' },
  },
  {
    id: 'collapse',
    kind: 'collapse',
    text: 'Two scheduling messages and an out-of-office notice',
    count: 3,
  },
  {
    id: 't3',
    from: 'Marcus Whitfield',
    initials: 'MW',
    hue: 'from-rose',
    to: 'you, +2',
    time: 'Mon, May 6 · 09:14',
    body: `Alex — flagging early. The Vector memo Eleanor sent is a draft (no counter-sig). I'm holding the close until I see the executed version. Filing window is Wednesday 17:00; please don't let this drift to Wednesday morning.`,
    insight: { kind: 'urgency', text: 'Urgency rising. First explicit deadline mention; tone moves from neutral to firm.' },
  },
  {
    id: 't4',
    from: 'Marcus Whitfield',
    initials: 'MW',
    hue: 'from-rose',
    to: 'you, +2',
    time: 'Wed, May 8 · 11:42',
    body: ACTIVE_EMAIL.body,
    insight: { kind: 'critical', text: 'Critical. Three blocking items, hard deadline, financial penalty cited. Recommended response window: 30 min.' },
    highlight: true,
  },
];

const HUES = {
  'from-rose':   'linear-gradient(135deg, oklch(0.62 0.16 25), oklch(0.50 0.18 15))',
  'from-violet': 'linear-gradient(135deg, oklch(0.65 0.13 320), oklch(0.55 0.14 280))',
  'from-amber':  'linear-gradient(135deg, oklch(0.74 0.13 70), oklch(0.62 0.14 50))',
  'from-cyan':   'linear-gradient(135deg, oklch(0.72 0.12 195), oklch(0.55 0.10 215))',
  'from-green':  'linear-gradient(135deg, oklch(0.70 0.13 155), oklch(0.55 0.13 175))',
};

window.MailLensData = { HISTORY, ACTIVE_EMAIL, ANALYSIS, TONES, REPLY_VARIANTS, THREAD, HUES };
