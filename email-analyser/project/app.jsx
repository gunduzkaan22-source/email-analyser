/* MailLens — top nav + app shell */

const TopNav = ({ theme, setTheme }) => (
  <header className="topnav">
    <div className="brand">
      <div className="brand-mark" />
      <span>MailLens</span>
    </div>
    <span className="beta-badge">Beta</span>

    <div className="topnav-divider" />

    <div className="crumb">
      <span>Inbox</span>
      <span className="crumb-sep">/</span>
      <strong>Marcus Whitfield</strong>
      <span className="crumb-sep">/</span>
      <span>Q3 audit</span>
    </div>

    <div className="topnav-spacer" />

    <div className="nav-search">
      <Icon name="search" size={13} />
      <span>Search emails, threads, contacts…</span>
      <span className="kbd">⌘K</span>
    </div>

    <ThemeToggle theme={theme} setTheme={setTheme} />

    <button className="nav-icon-btn" title="Notifications">
      <Icon name="bell" size={14} />
    </button>
    <button className="nav-icon-btn" title="Settings">
      <Icon name="settings" size={14} />
    </button>

    <div className="user-chip">
      <span className="avatar">AK</span>
      <span>Alex Keane</span>
    </div>
  </header>
);

const ThemeToggle = ({ theme, setTheme }) => (
  <div className="theme-toggle" role="group" aria-label="Theme">
    <button
      className={`tt-btn ${theme === 'light' ? 'active' : ''}`}
      onClick={() => setTheme('light')}
      title="Light mode"
      aria-label="Light mode"
      aria-pressed={theme === 'light'}
    >
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1.5v1.5M8 13v1.5M2.5 8H1M15 8h-1.5M3.5 3.5l1 1M11.5 11.5l1 1M12.5 3.5l-1 1M4.5 11.5l-1 1" />
      </svg>
    </button>
    <button
      className={`tt-btn ${theme === 'dark' ? 'active' : ''}`}
      onClick={() => setTheme('dark')}
      title="Dark mode"
      aria-label="Dark mode"
      aria-pressed={theme === 'dark'}
    >
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.5 9.5A5.5 5.5 0 1 1 6.5 2.5a4 4 0 0 0 7 7z" />
      </svg>
    </button>
  </div>
);

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "teal",
  "density": "regular",
  "showRail": true
}/*EDITMODE-END*/;

const ACCENT_HUES = {
  teal:    { teal: 'oklch(0.80 0.135 195)', teal2: 'oklch(0.72 0.130 195)', dim: 'oklch(0.55 0.090 195)', bg: 'oklch(0.32 0.060 195 / 0.25)', glow: 'oklch(0.80 0.135 195 / 0.15)' },
  cobalt:  { teal: 'oklch(0.74 0.150 245)', teal2: 'oklch(0.66 0.150 245)', dim: 'oklch(0.50 0.110 245)', bg: 'oklch(0.34 0.080 245 / 0.30)', glow: 'oklch(0.74 0.150 245 / 0.18)' },
  violet:  { teal: 'oklch(0.74 0.155 305)', teal2: 'oklch(0.66 0.150 305)', dim: 'oklch(0.50 0.120 305)', bg: 'oklch(0.34 0.080 305 / 0.30)', glow: 'oklch(0.74 0.155 305 / 0.18)' },
  amber:   { teal: 'oklch(0.78 0.140 75)',  teal2: 'oklch(0.70 0.135 75)',  dim: 'oklch(0.54 0.100 75)',  bg: 'oklch(0.36 0.080 75 / 0.30)',  glow: 'oklch(0.78 0.140 75 / 0.18)'  },
};
const ACCENT_LIGHT = {
  teal:   { teal: 'oklch(0.58 0.130 195)', dim: 'oklch(0.42 0.110 195)', bg: 'oklch(0.92 0.040 195 / 0.6)', glow: 'oklch(0.58 0.130 195 / 0.15)' },
  cobalt: { teal: 'oklch(0.52 0.150 245)', dim: 'oklch(0.40 0.120 245)', bg: 'oklch(0.92 0.045 245 / 0.6)', glow: 'oklch(0.52 0.150 245 / 0.15)' },
  violet: { teal: 'oklch(0.52 0.150 305)', dim: 'oklch(0.40 0.120 305)', bg: 'oklch(0.93 0.045 305 / 0.6)', glow: 'oklch(0.52 0.150 305 / 0.15)' },
  amber:  { teal: 'oklch(0.58 0.140 75)',  dim: 'oklch(0.46 0.115 75)',  bg: 'oklch(0.94 0.060 80 / 0.7)',  glow: 'oklch(0.58 0.140 75 / 0.15)'  },
};

const DENSITY_FONT = { compact: 13, regular: 14, comfy: 15 };

const App = () => {
  const [view, setView] = React.useState('analyze');
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', t.theme);
    root.setAttribute('data-density', t.density);

    const a = (t.theme === 'light' ? ACCENT_LIGHT : ACCENT_HUES)[t.accent] || (t.theme === 'light' ? ACCENT_LIGHT.teal : ACCENT_HUES.teal);
    root.style.setProperty('--teal', a.teal);
    if (a.teal2) root.style.setProperty('--teal-2', a.teal2);
    root.style.setProperty('--teal-dim', a.dim);
    root.style.setProperty('--teal-bg', a.bg);
    root.style.setProperty('--teal-glow', a.glow);

    document.body.style.fontSize = DENSITY_FONT[t.density] + 'px';
  }, [t.theme, t.accent, t.density]);

  // Persist user-facing theme choice in localStorage; tweak default seeds the first run.
  React.useEffect(() => {
    const stored = localStorage.getItem('maillens.theme');
    if (stored && stored !== t.theme) setTweak('theme', stored);
  }, []); // eslint-disable-line
  const setTheme = (v) => { localStorage.setItem('maillens.theme', v); setTweak('theme', v); };

  return (
    <div className="app" data-show-rail={t.showRail ? 'on' : 'off'}>
      <TopNav theme={t.theme} setTheme={setTheme} />
      <MailLensTweaks t={t} setTweak={setTweak} />
      <div className="main">
        <Sidebar />
        <section className="workspace">
          <div className="ws-head">
            <div className="ws-title">
              {window.MailLensData.ACTIVE_EMAIL.subject}
              <span className="from-pill">from {window.MailLensData.ACTIVE_EMAIL.from.split(' ')[0].toLowerCase()}@northgate-capital.com</span>
            </div>
            <div style={{ flex: 1 }} />
            <div className="seg">
              <button className={`seg-btn ${view==='analyze' ? 'active' : ''}`} onClick={() => setView('analyze')}>
                <Icon name="lens" size={12} /> Analyze
              </button>
              <button className={`seg-btn ${view==='thread' ? 'active' : ''}`} onClick={() => setView('thread')}>
                <Icon name="chat" size={12} /> Thread
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
                  padding: '0 5px', borderRadius: 4,
                  background: 'var(--bg-1)', color: 'var(--text-3)',
                  border: '1px solid var(--border)',
                }}>5</span>
              </button>
            </div>
            <div className="ws-actions">
              <button className="btn-ghost"><Icon name="download" size={12} /> Export</button>
              <button className="btn-ghost"><Icon name="x" size={12} /></button>
            </div>
          </div>
          <div className="ws-body">
            {view === 'analyze' ? <AnalyzeView /> : <ThreadView />}
          </div>
        </section>
      </div>
    </div>
  );
};

const MailLensTweaks = ({ t, setTweak }) => (
  <TweaksPanel title="Tweaks">
    <TweakSection label="Appearance" />
    <TweakRadio label="Theme" value={t.theme}
      options={['dark', 'light']}
      onChange={(v) => setTweak('theme', v)} />
    <TweakSelect label="Accent" value={t.accent}
      options={['teal', 'cobalt', 'violet', 'amber']}
      onChange={(v) => setTweak('accent', v)} />
    <TweakRadio label="Density" value={t.density}
      options={['compact', 'regular', 'comfy']}
      onChange={(v) => setTweak('density', v)} />
    <TweakSection label="Layout" />
    <TweakToggle label="Thread side rail" value={t.showRail}
      onChange={(v) => setTweak('showRail', v)} />
  </TweaksPanel>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
