
SHOW TABLES;

DESCRIBE LaBook_User;

DESCRIBE LaBook_Post;

DESCRIBE LaBook_Like;

DESCRIBE LaBook_Friend;

DROP TABLE LaBook_Friend;

DROP TABLE LaBook_Like;

DROP TABLE LaBook_Post;

DROP TABLE LaBook_User;

SELECT * FROM LaBook_User;

SELECT * FROM LaBook_Post;

SELECT * FROM LaBook_Friend;

SELECT * FROM LaBook_Like;

INSERT INTO LaBook_Friend (user1, user2)
VALUES
('00562f80-0098-11ec-8561-977ba7128b14', '4a9eab90-00a1-11ec-aa03-e58e4275381e'),
('00562f80-0098-11ec-8561-977ba7128b14', '4e75e160-0098-11ec-ad4e-c3ae82604a9b');

DELETE FROM LaBook_Friend WHERE user1 = '00562f80-0098-11ec-8561-977ba7128b14';

CREATE TABLE LaBook_User (
  id CHAR(36) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE LaBook_Post (
  id CHAR(36) UNIQUE NOT NULL,
  author_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  potho_url VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type_of ENUM("NORMAL", "EVENT") NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES LaBook_User(id)
);

CREATE TABLE LaBook_Like (
  user_id CHAR(36) NOT NULL, 
  post_id CHAR(36) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES LaBook_User(id),
  FOREIGN KEY (post_id) REFERENCES LaBook_Post(id)
);

CREATE TABLE LaBook_Friend (
  user1 CHAR(36) NOT NULL,
  user2 CHAR(36) NOT NULL,
  FOREIGN KEY (user1) REFERENCES LaBook_User(id),
  FOREIGN KEY (user2) REFERENCES LaBook_User(id)
);

SELECT *
FROM (
  SELECT * FROM LaBook_Friend
  WHERE user1 = "4a9eab90-00a1-11ec-aa03-e58e4275381e"
  OR user2 = "0"
) AS User
INNER JOIN LaBook_User
ON User.user1 = LaBook_User.id
OR User.user2 = LaBook_User.id
;

SELECT *
FROM ( 
  SELECT * FROM LaBook_Friend
  WHERE user1 = 'dcfd07e0-0095-11ec-9c00-fff462081313'
  OR user2 = 'dcfd07e0-0095-11ec-9c00-fff462081313'
) AS Friend
INNER JOIN (
  SELECT * FROM LaBook_User
  WHERE id != 'dcfd07e0-0095-11ec-9c00-fff462081313'
) AS User 
ON Friend.user1 = User.id
OR Friend.user2 = User.id;

