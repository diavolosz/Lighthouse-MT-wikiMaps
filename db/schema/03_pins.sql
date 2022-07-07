-- Drop and recreate pins table

DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  image VARCHAR (255) DEFAULT NULL,
  address VARCHAR (255) NOT NULL,
  latitude REAL,
  longitude REAL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
