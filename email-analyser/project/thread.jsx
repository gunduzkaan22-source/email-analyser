/* MailLens — thread view */

const ThreadView = () => {
  const { THREAD, HUES, ACTIVE_EMAIL } = window.MailLensData;

  return (
    <div className="thread">
      <div className="thread-grid">
        <div>
          <div className="thread-head">
            <h1 className="thread-title">{ACTIVE_EMAIL.subject}</h1>
            <div className="thread-meta">
              <span className="stars">5 messages</span>
              <span>•</span>
              <span>3 participants</span>
              <span>•</span>
              <span>Started May 3, 2026</span>
              <span style={{ flex: 1 }} />
              <UrgencyBadge level="crit" />
            </div>
          </div>

          <div className="t-msgs">
            {THREAD.map(m => {
              if (m.kind === 'collapse') {
                return (
                  <div key={m.id} className="t-collapse">
                    <div className="t-collapse-bar">
                      <Icon name="chevronDown" size={11} />
                      <span>{m.text}</span>
                      <span style={{ flex: 1 }} />
                      <span className="count">{m.count} hidden</span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={m.id} className="t-msg">
                  <div className="t-msg-avatar" style={{ background: HUES[m.hue], color: 'white' }}>
                    {m.initials}
                  </div>
                  <div className={`t-msg-card ${m.highlight ? 'highlight' : ''}`}>
                    <div className="t-msg-head">
                      <span className="t-msg-from">{m.from}</span>
                      <span className="t-msg-to">to {m.to}</span>
                      <span className="t-msg-time">{m.time}</span>
                    </div>
                    <div className="t-msg-body">
                      {m.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    {m.insight && (
                      <div className="t-insight">
                        <span className="ico"><Icon name="lens" size={11} /></span>
                        <strong>{insightLabel(m.insight.kind)}</strong>
                        <span>· {m.insight.text}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="thread-rail">
          <div className="rail-section">
            <div className="rail-label">Thread health</div>
            <div className="rail-stat" style={{ color: 'var(--u-crit)' }}>Escalating</div>
            <div className="rail-stat-sub">Tone climbed 3 levels in 5 days</div>
            <div className="rail-spark">
              <div className="b cool" style={{ height: '20%' }} />
              <div className="b cool" style={{ height: '25%' }} />
              <div className="b" style={{ height: '15%' }} />
              <div className="b warm" style={{ height: '55%' }} />
              <div className="b warm" style={{ height: '60%' }} />
              <div className="b hot" style={{ height: '85%' }} />
              <div className="b hot" style={{ height: '100%' }} />
            </div>
          </div>

          <div className="rail-section">
            <div className="rail-label">Average response</div>
            <div className="rail-stat" style={{ fontFamily: 'var(--font-mono)' }}>4h 12m</div>
            <div className="rail-stat-sub">Yours · across 3 replies</div>
          </div>

          <div className="rail-section">
            <div className="rail-label">Participants</div>
            <div className="rail-people">
              <div className="rail-person">
                <span className="av" style={{ background: 'linear-gradient(135deg, oklch(0.62 0.16 25), oklch(0.50 0.18 15))' }}>MW</span>
                <span>Marcus W.</span>
                <span className="role">SENDER</span>
              </div>
              <div className="rail-person">
                <span className="av" style={{ background: 'linear-gradient(135deg, oklch(0.72 0.12 195), oklch(0.55 0.10 215))' }}>AK</span>
                <span>Alex K. (you)</span>
                <span className="role">OWNER</span>
              </div>
              <div className="rail-person">
                <span className="av" style={{ background: 'linear-gradient(135deg, oklch(0.74 0.13 70), oklch(0.62 0.14 50))' }}>DM</span>
                <span>Devon M.</span>
                <span className="role">CC</span>
              </div>
              <div className="rail-person">
                <span className="av" style={{ background: 'linear-gradient(135deg, oklch(0.65 0.13 320), oklch(0.55 0.14 280))' }}>EP</span>
                <span>Eleanor P.</span>
                <span className="role">CC</span>
              </div>
            </div>
          </div>

          <div className="rail-section">
            <div className="rail-label">Topics</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              <span className="tag">Q3 close</span>
              <span className="tag">HMRC filing</span>
              <span className="tag">Vector memo</span>
              <span className="tag">Helix renegotiation</span>
              <span className="tag">Sentinel wire</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const insightLabel = (kind) => ({
  tone: 'Tone',
  urgency: 'Shift',
  critical: 'Critical',
}[kind] || 'Insight');

window.ThreadView = ThreadView;
