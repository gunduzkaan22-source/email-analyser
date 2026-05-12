/* MailLens — analyze view: input panel + results cards + suggested reply */

const AnalyzeView = () => {
  const { ACTIVE_EMAIL, ANALYSIS, TONES, REPLY_VARIANTS, HUES } = window.MailLensData;
  const [tone, setTone] = React.useState('direct');
  const [actions, setActions] = React.useState(ANALYSIS.actions);

  const toggleAction = id =>
    setActions(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a));

  return (
    <div className="ws-inner">
      <EmailInputPanel email={ACTIVE_EMAIL} />

      <div className="results-head">
        <h2>Analysis</h2>
        <div className="dot" />
        <div className="ts">{ANALYSIS.ts}</div>
        <div style={{ flex: 1 }} />
        <button className="btn-ghost">
          <Icon name="refresh" size={12} /> Re-run
        </button>
      </div>

      <div className="grid">
        <MoodCard mood={ANALYSIS.mood} />
        <UrgencyCard urgency={ANALYSIS.urgency} />
        <ResponseTimeCard rt={ANALYSIS.responseTime} />

        <div className="card col-12">
          <div className="card-head">
            <span className="ico"><Icon name="lens" size={11} /></span>
            <span>Summary</span>
            <span className="spacer" />
            <span className="conf">3 sentences · {ANALYSIS.mood.confidence}% confidence</span>
          </div>
          <div className="summary-text">
            {ANALYSIS.summary.parts.map((p, i) => {
              if (typeof p === 'string') return <span key={i}>{p}</span>;
              if (p.mark) return <mark key={i}>{p.mark}</mark>;
              if (p.strong) return <strong key={i}>{p.strong}</strong>;
              return null;
            })}
          </div>
        </div>

        <div className="card col-12">
          <div className="card-head">
            <span className="ico"><Icon name="list" size={11} /></span>
            <span>Action items</span>
            <span className="spacer" />
            <span className="conf">{actions.filter(a => !a.done).length} open · {actions.filter(a => a.done).length} done</span>
          </div>
          <div className="action-list">
            {actions.map(a => (
              <div key={a.id} className={`action ${a.done ? 'done' : ''}`}>
                <button className="action-check" onClick={() => toggleAction(a.id)}>
                  {a.done && <Icon name="check" size={11} stroke={2.2} />}
                </button>
                <div className="action-text">{a.text}</div>
                <div className="action-meta">
                  <span className={`action-due ${a.overdue ? 'overdue' : ''}`}>{a.due}</span>
                  <span className="tag">{a.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reply-card" style={{ marginTop: 14 }}>
        <div className="reply-head">
          <span className="ico"><Icon name="sparkles" size={12} /></span>
          <div>
            <h3>Suggested reply</h3>
            <div className="sub">Drafted in your voice · ready to paste</div>
          </div>
          <span className="spacer" />
          <button className="reply-action"><Icon name="copy" size={11} /> Copy</button>
          <button className="reply-action"><Icon name="refresh" size={11} /> Regenerate</button>
        </div>
        <div className="reply-body">
          {REPLY_VARIANTS[tone].split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="tone-bar">
          <span className="tone-label">Tone</span>
          <div className="tone-pills">
            {TONES.map(t => (
              <button
                key={t.id}
                className={`tone-pill ${tone === t.id ? 'active' : ''}`}
                onClick={() => setTone(t.id)}
              >
                <span className="swatch" />
                {t.label}
              </button>
            ))}
          </div>
          <div className="tone-foot-actions">
            <button className="btn-ghost"><Icon name="eye" size={12} /> Preview in Gmail</button>
            <button className="btn-primary">
              <Icon name="reply" size={12} stroke={2} /> Use this reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailInputPanel = ({ email }) => (
  <div className="input-panel">
    <div className="ip-head">
      <div className="from-block">
        <div className="ip-avatar">{email.initials}</div>
        <div>
          <div className="ip-from-name">{email.from} <span style={{ color: 'var(--text-3)', fontWeight: 400, marginLeft: 4 }}>· {email.fromTitle}</span></div>
          <div className="ip-from-email">{email.fromEmail}</div>
        </div>
      </div>
      <div className="ip-meta">
        <span className="ip-meta-item"><Icon name="clock" size={11} /> {email.date}</span>
        <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
        <span className="ip-meta-item">{email.meta.wordCount} words</span>
        <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
        <button className="nav-icon-btn"><Icon name="star" size={13} /></button>
        <button className="nav-icon-btn"><Icon name="flag" size={13} /></button>
      </div>
    </div>
    <div className="ip-subject">
      <span className="label">Subject</span>
      <span>{email.subject}</span>
    </div>
    <textarea
      className="ip-textarea"
      defaultValue={email.body}
      spellCheck={false}
    />
    <div className="ip-foot">
      <div className="meta">
        <span>{email.body.split(/\s+/).length} words</span>
        <span className="sep" />
        <span>{email.meta.readTime} read</span>
        <span className="sep" />
        <span>EN-GB</span>
      </div>
      <div style={{ flex: 1 }} />
      <button className="btn-ghost"><Icon name="paperclip" size={12} /> Attach thread</button>
      <button className="btn-primary"><Icon name="sparkles" size={12} /> Re-analyze</button>
    </div>
  </div>
);

const MoodCard = ({ mood }) => (
  <div className="card col-4">
    <div className="card-head">
      <span className="ico"><Icon name="moodSad" size={11} /></span>
      <span>Sender mood</span>
      <span className="spacer" />
      <span className="conf">{mood.confidence}%</span>
    </div>
    <div className="card-h1">{mood.label}</div>
    <div className="card-sub">{mood.description}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
      {mood.tones.map(t => (
        <div key={t.label} style={{ display: 'grid', gridTemplateColumns: '78px 1fr 26px', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{t.label}</span>
          <div className="tb"><div className="fill" style={{ width: `${t.val * 100}%` }} /></div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-3)', textAlign: 'right' }}>
            {Math.round(t.val * 100)}
          </span>
        </div>
      ))}
    </div>
    <div className="mood-tags">
      {mood.tags.map(t => <span key={t} className="tag">{t}</span>)}
    </div>
  </div>
);

const UrgencyCard = ({ urgency }) => {
  const stepClass = i => {
    if (i >= urgency.level) return '';
    if (urgency.level === 4) return 'on-crit';
    if (urgency.level === 3) return 'on-high';
    if (urgency.level === 2) return 'on-med';
    return 'on-low';
  };
  return (
    <div className="card col-4">
      <div className="card-head">
        <span className="ico" style={{ color: 'var(--u-crit)' }}><Icon name="bolt" size={11} /></span>
        <span>Urgency</span>
        <span className="spacer" />
        <UrgencyBadge level="crit" />
      </div>
      <div className="card-h1" style={{ color: 'var(--u-crit)' }}>{urgency.label}</div>
      <div className="card-sub">{urgency.rationale}</div>
      <div className="urg-meter">
        <div className={`urg-step ${stepClass(0)}`} />
        <div className={`urg-step ${stepClass(1)}`} />
        <div className={`urg-step ${stepClass(2)}`} />
        <div className={`urg-step ${stepClass(3)}`} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <span>Low</span><span>Medium</span><span>High</span><span>Critical</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-2)', paddingTop: 4, borderTop: '1px solid var(--border-soft)' }}>
        <Icon name="clock" size={12} stroke={1.8} />
        <span>Deadline:</span>
        <span style={{ color: 'var(--u-crit)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{urgency.deadline}</span>
      </div>
    </div>
  );
};

const ResponseTimeCard = ({ rt }) => (
  <div className="card col-4">
    <div className="card-head">
      <span className="ico"><Icon name="timer" size={11} /></span>
      <span>Response time</span>
      <span className="spacer" />
      <span className="conf">recommended</span>
    </div>
    <div className="rt-clock">
      <span className="rt-num">{rt.num}</span>
      <span className="rt-unit">{rt.unit}</span>
    </div>
    <div className="rt-by">
      <span className="pip">●</span>
      <span>{rt.by}</span>
    </div>
    <div className="card-sub" style={{ marginTop: 4 }}>{rt.reason}</div>
    <div style={{ display: 'flex', gap: 4, marginTop: 'auto', paddingTop: 8 }}>
      {[12, 18, 28, 22, 14, 9, 6].map((h, i) => (
        <div key={i} style={{
          flex: 1,
          height: h,
          background: i < 2 ? 'var(--teal)' : 'var(--bg-2)',
          borderRadius: 2,
          alignSelf: 'flex-end',
        }} />
      ))}
    </div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      Reply latency · last 7 messages
    </div>
  </div>
);

window.AnalyzeView = AnalyzeView;
