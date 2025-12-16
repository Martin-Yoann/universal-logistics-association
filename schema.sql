-- schema.sql
CREATE TABLE IF NOT EXISTS membership_applications (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  title TEXT NOT NULL,
  membership_type TEXT,
  message TEXT NOT NULL,
  heard_from TEXT,
  file_urls TEXT, -- JSON 数组存储文件URL
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

CREATE INDEX idx_email ON membership_applications(email);
CREATE INDEX idx_submitted_at ON membership_applications(submitted_at);