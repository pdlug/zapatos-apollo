-- migrate:up
CREATE TABLE items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id          UUID,
  title             TEXT NOT NULL,
  description       TEXT,
  content           TEXT,
  keywords          TEXT[],
  published_on      DATE NOT NULL DEFAULT NOW(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  searchable_index  TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(description, '') || ' ' ||
      coalesce(content, '')
    )
  ) STORED,
  FOREIGN KEY (owner_id) REFERENCES users (id)
);

CREATE INDEX textsearch_idx ON items USING GIN (searchable_index);

CREATE TRIGGER set_updated_at_ts
AFTER UPDATE ON items
FOR EACH ROW
WHEN (NEW IS DISTINCT FROM OLD)
EXECUTE PROCEDURE set_updated_at_ts();

-- migrate:down
DROP TABLE items;