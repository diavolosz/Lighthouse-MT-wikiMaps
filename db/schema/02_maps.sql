-- Drop and recreate maps table

DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude REAL NOT NULL,            -- integer * 100 for coord?
  longitude REAL NOT NULL,            -- integer * 100 for coord?
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
