-- Run once in Neon (SQL Editor) or any Postgres used by WAITLIST_RATE_LIMIT_DATABASE_URL.
CREATE TABLE IF NOT EXISTS waitlist_rate_limits (
  scope TEXT NOT NULL CHECK (scope IN ('ip', 'email')),
  subject TEXT NOT NULL,
  bucket_epoch BIGINT NOT NULL,
  hits INT NOT NULL DEFAULT 0,
  PRIMARY KEY (scope, subject, bucket_epoch)
);
