
CREATE TABLE Rating (
  id VARCHAR(255) PRIMARY KEY,
  comment TEXT NOT NULL,
  rate FLOAT NOT NULL,
  movie_id VARCHAR(255),
  FOREIGN KEY (movie_id) REFERENCES Movie(id)
);

CREATE TABLE MovieCast (
  movie_id VARCHAR(255),
  actor_id VARCHAR(255),
  FOREIGN KEY (movie_id) REFERENCES Movie(id),
  FOREIGN KEY (actor_id) REFERENCES Actor(id)
);

