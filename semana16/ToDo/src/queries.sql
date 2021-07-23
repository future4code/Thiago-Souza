
CREATE TABLE TodoListUser (
  id CHAR(36) PRIMARY KEY NOT NULL, 
  name VARCHAR(255) NOT NULL, 
  nickname VARCHAR(255) UNIQUE NOT NULL, 
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE TodoListTask (
  id CHAR(36) PRIMARY KEY NOT NULL, 
  title VARCHAR(255) NOT NULL, 
  description TEXT NOT NULL, 
  status VARCHAR(255) NOT NULL DEFAULT "to_do",
  limit_date DATE NOT NULL,
  creator_user_id CHAR(36) NOT NULL,
  FOREIGN KEY (creator_user_id) REFERENCES TodoListUser(id)
);

CREATE TABLE TodoListResponsibleUserTaskRelation (
  task_id CHAR(36) NOT NULL,
  responsible_user_id CHAR(36) NOT NULL,
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

SELECT * FROM TodoListUser;

SELECT * FROM TodoListTask;

select TodoListTask.id as taskId, TodoListUser.nickname as userNickname from `TodoListTask` inner join `TodoListUser` on `TodoListUser`.`id` = `TodoListTask`.`creator_user_id` where `TodoListTask`.`id` = '4f3de9a0-ebce-11eb-9e19-4738b8ad2821' limit 1;
