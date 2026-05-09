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

-- Make session_id nullable — new rows use user_id and omit session_id
ALTER TABLE email_history ALTER COLUMN session_id DROP NOT NULL;

-- Partial index: session_id is legacy and no longer written, so exclude NULLs
CREATE INDEX IF NOT EXISTS email_history_session_idx
    ON email_history(session_id, created_at DESC)
    WHERE session_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS email_history_user_idx
    ON email_history(user_id, created_at DESC)
    WHERE user_id IS NOT NULL;

ALTER TABLE email_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can read own history"
  ON email_history FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Users can insert own history"
  ON email_history FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Users can update own history"
  ON email_history FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Users can delete own history"
  ON email_history FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ── allowed_emails (invite-only access control) ──────────────────────────────

CREATE TABLE IF NOT EXISTS allowed_emails (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- No user-facing policies needed: the Supabase service role key bypasses RLS
-- entirely (documented behaviour), so the server can still read this table.
-- Anon and authenticated roles get no access by default when RLS is enabled
-- and no permissive policy exists.
ALTER TABLE allowed_emails ENABLE ROW LEVEL SECURITY;

-- Seed the admin / first user
INSERT INTO allowed_emails (email) VALUES ('gunduzkaan22@gmail.com')
    ON CONFLICT (email) DO NOTHING;
