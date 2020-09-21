-- migrate:up
CREATE OR REPLACE FUNCTION set_updated_at_ts()
RETURNS TRIGGER AS $$
BEGIN
  IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
    NEW.updated_at = NOW();
    RETURN NEW;
  ELSE
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- migrate:down
DROP FUNCTION set_updated_at_ts();