/* MailLens — sidebar with search, urgency filters, hover-delete + toast */

const URGENCY_BUCKET = (u) => (u === 'crit' ? 'high' : u);

const highlight = (text, query) => {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = String(text).split(new RegExp(`(${safe})`, 'ig'));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? React.createElement('mark', { key: i, className: 'sb-hl' }, p)
      : React.createElement('span', { key: i }, p)
  );
};

const Sidebar = () => {
  const { HISTORY, HUES } = window.MailLensData;
  const [items, setItems] = React.useState(HISTORY);
  const [tab, setTab] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [confirmId, setConfirmId] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const searchRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        if (searchRef.current) {
          e.preventDefault();
          searchRef.current.focus();
        }
      }
      if (e.key === 'Escape') {
        setConfirmId(null);
        if (document.activeElement === searchRef.current) setQuery('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = items.filter(e => {
    if (tab !== 'all' && URGENCY_BUCKET(e.urgency) !== tab) return false;
    if (!q) return true;
    const hay = [
      e.from, e.fromEmail, e.subject, e.snippet,
      e.urgency, URGENCY_BUCKET(e.urgency),
      ...(e.tags || []),
    ].join(' ').toLowerCase();
    return hay.includes(q);
  });

  const grouped = [];
  filtered.forEach(e => {
    let g = grouped.find(x => x.group === e.group);
    if (!g) { g = { group: e.group, items: [] }; grouped.push(g); }
    g.items.push(e);
  });

  const counts = {
    all:  items.length,
    high: items.filter(e => URGENCY_BUCKET(e.urgency) === 'high').length,
    med:  items.filter(e => URGENCY_BUCKET(e.urgency) === 'med').length,
    low:  items.filter(e => URGENCY_BUCKET(e.urgency) === 'low').length,
  };

  const onDelete = (e) => {
    setItems(prev => prev.filter(x => x.id !== e.id));
    setConfirmId(null);
    setToast({ id: e.id, message: 'Analysis deleted' });
    try {
      fetch(`/history/${e.id}`, { method: 'DELETE' }).catch(() => {});
    } catch (err) { /* ignore */ }
    window.setTimeout(() => setToast(t => (t && t.id === e.id ? null : t)), 2400);
  };

  return (
    <aside className="sidebar">
      <div className="sb-section">
        <button className="sb-new">
          <span className="plus">+</span>
          <span>New analysis</span>
          <span className="kbd">⌘N</span>
        </button>
      </div>

      <div className="sb-search-wrap">
        <span className="sb-search-ico"><Icon name="search" size={13} /></span>
        <input
          ref={searchRef}
          className="sb-search"
          placeholder="Search history…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck={false}
        />
        {query && (
          <button
            className="sb-search-clear"
            onClick={() => { setQuery(''); searchRef.current && searchRef.current.focus(); }}
            aria-label="Clear search"
            title="Clear"
          >
            <Icon name="x" size={11} stroke={2} />
          </button>
        )}
      </div>

      <div className="sb-pills">
        <FilterPill label="All"  count={counts.all}  level="all"  active={tab==='all'}  onClick={() => setTab('all')} />
        <FilterPill label="High" count={counts.high} level="high" active={tab==='high'} onClick={() => setTab('high')} />
        <FilterPill label="Med"  count={counts.med}  level="med"  active={tab==='med'}  onClick={() => setTab('med')} />
        <FilterPill label="Low"  count={counts.low}  level="low"  active={tab==='low'}  onClick={() => setTab('low')} />
      </div>

      <div className="sb-list">
        {grouped.length === 0 ? (
          <SidebarEmpty query={query} tab={tab} />
        ) : (
          grouped.map(({ group, items: gItems }) => (
            <div key={group}>
              <div className="sb-group-label">{group}</div>
              {gItems.map(e => (
                <SidebarItem
                  key={e.id}
                  e={e}
                  hue={HUES[e.avatarHue]}
                  query={q}
                  confirming={confirmId === e.id}
                  onAskDelete={() => setConfirmId(e.id)}
                  onCancel={() => setConfirmId(null)}
                  onConfirm={() => onDelete(e)}
                />
              ))}
            </div>
          ))
        )}
      </div>

      <div className="sb-foot">
        <div className="sb-foot-stats">
          <div><strong>{items.length}</strong> of 100 analyses this month</div>
          <div className="sb-foot-bar">
            <div className="sb-foot-bar-fill" style={{ width: `${Math.min(100, items.length / 100 * 100)}%` }} />
          </div>
        </div>
        <button className="nav-icon-btn" title="Settings">
          <Icon name="settings" size={14} />
        </button>
      </div>

      <SidebarToast toast={toast} />
    </aside>
  );
};

const SidebarItem = ({ e, hue, query, confirming, onAskDelete, onCancel, onConfirm }) => (
  <div
    className={`sb-item ${e.active ? 'active' : ''} ${e.unread ? 'unread' : ''} ${confirming ? 'confirming' : ''}`}
  >
    <div className="sb-avatar" style={{ background: hue, color: 'white' }}>
      {e.initials}
    </div>
    <div className="sb-body">
      <div className="sb-row1">
        <div className="sb-from">{highlight(e.from, query)}</div>
        <div className="sb-time">{e.ago || e.time}</div>
      </div>
      <div className="sb-subj">{highlight(e.subject, query)}</div>
      <div className="sb-snip">{highlight(e.snippet, query)}</div>
      <div className="sb-meta">
        <UrgencyBadge level={e.urgency} />
        {(e.tags || []).map(t => (
          <span key={t} className="tag">{highlight(t, query)}</span>
        ))}
      </div>
    </div>

    {!confirming && (
      <button
        className="sb-trash"
        onClick={(ev) => { ev.stopPropagation(); onAskDelete(); }}
        aria-label="Delete analysis"
        title="Delete"
      >
        <Icon name="trash" size={12} stroke={1.7} />
      </button>
    )}

    {confirming && (
      <div className="sb-confirm" role="alertdialog" aria-label="Delete this analysis?">
        <span className="sb-confirm-text">Delete?</span>
        <div className="sb-confirm-actions">
          <button
            className="sb-confirm-btn no"
            onClick={(ev) => { ev.stopPropagation(); onCancel(); }}
          >No</button>
          <button
            className="sb-confirm-btn yes"
            onClick={(ev) => { ev.stopPropagation(); onConfirm(); }}
          >Yes</button>
        </div>
      </div>
    )}
  </div>
);

const FilterPill = ({ label, count, level, active, onClick }) => (
  <button
    className={`sb-pill ${active ? 'active' : ''} ${level !== 'all' ? `lvl-${level}` : ''}`}
    onClick={onClick}
  >
    {level !== 'all' && <span className="sb-pill-dot" />}
    <span>{label}</span>
    <span className="sb-pill-count">{count}</span>
  </button>
);

const SidebarEmpty = ({ query, tab }) => (
  <div className="sb-empty">
    <div className="sb-empty-art" aria-hidden="true">
      <svg viewBox="0 0 80 64" width="80" height="64" fill="none">
        <rect x="6" y="14" width="68" height="42" rx="6"
              stroke="var(--border-strong)" strokeWidth="1.2" fill="var(--bg-1)" />
        <path d="M6 18 L40 38 L74 18"
              stroke="var(--border-strong)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <circle cx="58" cy="14" r="9"
                stroke="var(--teal)" strokeWidth="1.4" fill="var(--bg-0)" />
        <path d="M64 20 L70 26"
              stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M53 14 H63 M58 9 V19"
              stroke="var(--teal-dim)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
    <div className="sb-empty-title">
      {query ? 'No analyses match your search' : 'No analyses found'}
    </div>
    <div className="sb-empty-sub">
      {query
        ? 'Try a different keyword' + (tab !== 'all' ? ` or clear the ${tab.toUpperCase()} filter` : '') + '.'
        : `Nothing in ${tab === 'all' ? 'history' : tab.toUpperCase()} yet.`}
    </div>
  </div>
);

const SidebarToast = ({ toast }) => (
  <div className={`sb-toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
    {toast && (
      <React.Fragment>
        <span className="sb-toast-ico"><Icon name="check" size={11} stroke={2.2} /></span>
        <span>{toast.message}</span>
      </React.Fragment>
    )}
  </div>
);

const UrgencyBadge = ({ level }) => {
  const labels = { low: 'Low', med: 'Medium', high: 'High', crit: 'Critical' };
  return (
    <span className={`u-badge ${level}`}>
      <span className="dot" />
      {labels[level]}
    </span>
  );
};

window.Sidebar = Sidebar;
window.UrgencyBadge = UrgencyBadge;
