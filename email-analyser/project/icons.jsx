/* MailLens — icon set (stroke-based, 16px viewbox) */
const Icon = ({ name, size = 14, stroke = 1.6, ...rest }) => {
  const paths = {
    sparkles: <><path d="M8 2.5l1.2 3.3L12.5 7l-3.3 1.2L8 11.5 6.8 8.2 3.5 7l3.3-1.2L8 2.5z"/><path d="M13 11l.6 1.4 1.4.6-1.4.6L13 15l-.6-1.4-1.4-.6 1.4-.6L13 11z"/></>,
    inbox: <><path d="M2.5 9.5l1.2-5.5a1.5 1.5 0 0 1 1.5-1.2h5.6a1.5 1.5 0 0 1 1.5 1.2l1.2 5.5"/><path d="M2.5 9.5h3l1 2h3l1-2h3v2.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2.5 12V9.5z"/></>,
    bolt: <path d="M9.5 2L4 9h3l-.5 5L12 7H9l.5-5z"/>,
    clock: <><circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 1.2"/></>,
    list: <><path d="M3 4.5h2M3 8h2M3 11.5h2"/><path d="M7 4.5h7M7 8h7M7 11.5h7"/></>,
    reply: <><path d="M6 5l-3 3 3 3"/><path d="M3 8h6.5a3.5 3.5 0 0 1 3.5 3.5V13"/></>,
    chat: <path d="M3 4.5a1.5 1.5 0 0 1 1.5-1.5h7a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H8l-3 2.5V11H4.5A1.5 1.5 0 0 1 3 9.5v-5z"/>,
    search: <><circle cx="7" cy="7" r="4"/><path d="M10 10l3 3"/></>,
    plus: <path d="M8 3v10M3 8h10"/>,
    bell: <><path d="M4 11.5l-.5 1h9l-.5-1V8a4 4 0 0 0-8 0v3.5z"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0"/></>,
    settings: <><circle cx="8" cy="8" r="2"/><path d="M8 1.5v1.5M8 13v1.5M2.5 8H1M15 8h-1.5M3.8 3.8l1 1M11.2 11.2l1 1M12.2 3.8l-1 1M4.8 11.2l-1 1"/></>,
    sliders: <><path d="M3 4.5h10M3 8h10M3 11.5h10"/><circle cx="6" cy="4.5" r="1.5" fill="var(--bg-1)"/><circle cx="11" cy="8" r="1.5" fill="var(--bg-1)"/><circle cx="5" cy="11.5" r="1.5" fill="var(--bg-1)"/></>,
    flag: <path d="M4 13.5V2.5h7l-1.5 2.5L11 7.5H4"/>,
    check: <path d="M3.5 8.2L6.5 11l6-6.5"/>,
    arrowRight: <path d="M3 8h10M9 4l4 4-4 4"/>,
    copy: <><rect x="5" y="3" width="8" height="9" rx="1.5"/><path d="M3 5v8a1.5 1.5 0 0 0 1.5 1.5h7"/></>,
    refresh: <><path d="M2.5 8a5.5 5.5 0 0 1 9.5-3.8M13.5 8a5.5 5.5 0 0 1-9.5 3.8"/><path d="M11 1.5v3h-3M5 14.5v-3h3"/></>,
    user: <><circle cx="8" cy="6" r="2.5"/><path d="M3.5 13.5a4.5 4.5 0 0 1 9 0"/></>,
    paperclip: <path d="M11.5 7.5l-4 4a2.5 2.5 0 0 1-3.5-3.5l5-5a1.5 1.5 0 0 1 2.1 2.1l-5 5a.75.75 0 0 1-1-1l4.5-4.5"/>,
    x: <path d="M4 4l8 8M12 4l-8 8"/>,
    mood: <><circle cx="8" cy="8" r="5.5"/><path d="M5.5 9.5s.8 1.5 2.5 1.5 2.5-1.5 2.5-1.5"/><circle cx="6" cy="6.5" r="0.5" fill="currentColor" stroke="none"/><circle cx="10" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></>,
    moodSad: <><circle cx="8" cy="8" r="5.5"/><path d="M5.5 11s.8-1.5 2.5-1.5 2.5 1.5 2.5 1.5"/><circle cx="6" cy="6.5" r="0.5" fill="currentColor" stroke="none"/><circle cx="10" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></>,
    timer: <><circle cx="8" cy="9" r="5"/><path d="M6.5 2h3M8 4v1.5"/><path d="M8 9l1.5-2"/></>,
    lens: <><circle cx="7" cy="7" r="3.5"/><path d="M9.5 9.5l3 3"/><circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none"/></>,
    info: <><circle cx="8" cy="8" r="5.5"/><path d="M8 7v4M8 5v.5"/></>,
    star: <path d="M8 2l1.8 3.7 4.1.6-3 2.9.7 4-3.6-1.9-3.6 1.9.7-4-3-2.9 4.1-.6L8 2z"/>,
    chevronDown: <path d="M4 6l4 4 4-4"/>,
    download: <><path d="M8 2.5v8M5 8l3 3 3-3"/><path d="M3 13.5h10"/></>,
    eye: <><path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z"/><circle cx="8" cy="8" r="1.8"/></>,
    trash: <><path d="M3 4.5h10"/><path d="M6.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5"/><path d="M4.5 4.5l.6 8.2a1.5 1.5 0 0 0 1.5 1.4h2.8a1.5 1.5 0 0 0 1.5-1.4l.6-8.2"/><path d="M7 7v4M9 7v4"/></>,
  };

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {paths[name] || null}
    </svg>
  );
};

window.Icon = Icon;
