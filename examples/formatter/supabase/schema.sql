-- Create a table for storing shared code snippets
CREATE TABLE snippets (
  -- Unique ID for each shared snippet (used in the share URL)
  id VARCHAR(8) PRIMARY KEY,
  
  -- The SimC expression code content
  code TEXT NOT NULL,
  
  -- Timestamp for when it was created (automatically set by Supabase)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on the created_at column for efficient querying by date
CREATE INDEX idx_snippets_created_at ON snippets (created_at);

-- Set up Row Level Security (RLS) policies
-- This allows anonymous access for reading snippets but requires authentication for writing
ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;

-- Policy for reading snippets (allow anyone to read)
CREATE POLICY "Allow public read access" ON snippets
  FOR SELECT USING (true);

-- Policy for inserting snippets (allow anyone to insert)
-- In a production environment, you might want to restrict this to authenticated users
CREATE POLICY "Allow public insert access" ON snippets
  FOR INSERT WITH CHECK (true);

-- Prevent updates and deletes for all users
-- Snippets are immutable once created
CREATE POLICY "Prevent updates" ON snippets
  FOR UPDATE USING (false);

CREATE POLICY "Prevent deletes" ON snippets
  FOR DELETE USING (false);