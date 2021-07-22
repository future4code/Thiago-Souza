
CREATE TABLE TodoListUser (
  id VARBINARY(16) PRIMARY KEY NOT NULL, 
  name VARCHAR(255) NOT NULL, 
  nickname VARCHAR(255) UNIQUE NOT NULL, 
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE TodoListTask (
  id VARBINARY(16) PRIMARY KEY NOT NULL, 
  title VARCHAR(255) NOT NULL, 
  description TEXT NOT NULL, 
  status VARCHAR(255) NOT NULL DEFAULT "to_do",
  limit_date DATE NOT NULL,
  creator_user_id BINARY(16) NOT NULL,
  FOREIGN KEY (creator_user_id) REFERENCES TodoListUser(id)
);

CREATE TABLE TodoListResponsibleUserTaskRelation (
  task_id VARBINARY(16) NOT NULL,
  responsible_user_id VARBINARY(16) NOT NULL,
  FOREIGN KEY (task_id) REFERENCES TodoListTask(id),
  FOREIGN KEY (responsible_user_id) REFERENCES TodoListUser(id)
);

SHOW TABLES;

DESCRIBE TodoListUser;

DESCRIBE TodoListTask;

DESCRIBE TodoListResponsibleUserTaskRelation;

DROP TABLE TodoListUser;

DROP TABLE TodoListTask;

DROP TABLE TodoListResponsibleUserTaskRelation;

