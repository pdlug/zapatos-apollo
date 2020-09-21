-- migrate:up
CREATE EXTENSION pgcrypto;

-- migrate:down
DROP EXTENSION pgcrypto;