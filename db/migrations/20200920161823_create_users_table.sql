-- migrate:up
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL,
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_ts
BEFORE UPDATE ON users
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE set_updated_at_ts();

-- migrate:down
DROP TABLE users;
