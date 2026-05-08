-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)
-- Creates the email_history table for MailLens server-side history

CREATE TABLE IF NOT EXISTS email_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    preview TEXT,
    urgency TEXT,
    email_text TEXT,
    analysis_json JSONB,
    is_thread BOOLEAN NOT NULL DEFAULT FALSE,
    thread_count INTEGER NOT NULL DEFAULT 0,
    thread_json JSONB,
    urgency_override BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS email_history_session_idx
    ON email_history(session_id, created_at DESC);

-- Access is controlled server-side via session_id.
-- The anon key is only used server-side and is never exposed to clients,
-- so RLS is intentionally left disabled.
ALTER TABLE email_history DISABLE ROW LEVEL SECURITY;
