-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)
-- Creates / migrates the MailLens schema (safe to re-run — all statements are idempotent)

-- ── email_history ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS email_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT,                          -- legacy anonymous id (no longer written)
    user_id UUID,                             -- Supabase Auth user id
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

-- Add user_id column if the table already exists from a previous migration
ALTER TABLE email_history ADD COLUMN IF NOT EXISTS user_id UUID;

CREATE INDEX IF NOT EXISTS email_history_session_idx
    ON email_history(session_id, created_at DESC);

CREATE INDEX IF NOT EXISTS email_history_user_idx
    ON email_history(user_id, created_at DESC)
    WHERE user_id IS NOT NULL;

ALTER TABLE email_history DISABLE ROW LEVEL SECURITY;

-- ── allowed_emails (invite-only access control) ──────────────────────────────

CREATE TABLE IF NOT EXISTS allowed_emails (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE allowed_emails DISABLE ROW LEVEL SECURITY;

-- Seed the admin / first user
INSERT INTO allowed_emails (email) VALUES ('gunduzkaan22@gmail.com')
    ON CONFLICT (email) DO NOTHING;
