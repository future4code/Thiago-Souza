-- Exercício 1

CREATE TABLE Actor (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    salary FLOAT NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(6) NOT NULL
);

SHOW DATABASES;

SHOW TABLES;

DESCRIBE Actor;

SELECT * FROM Actor;

DROP TABLE Actor;

-- Exercício 2

INSERT INTO Actor (id, name, salary, birth_date, gender) 
VALUES(
  "001", 
  "Tony Ramos",
  400000,
  "1948-08-25", 
  "male"
);


-- Query Do Exercício 2.a
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "002", 
  "Glória Pires",
  1200000,
  "1963-08-23", 
  "female"
);

-- Query Do Exercício 2.b
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "002", 
  "Glória Pires Duplicada",
  1200,
  "1963-08-23", 
  "female"
);

-- Query Do Exercício 2.c 
-- Errada
INSERT INTO Actor (id, name, salary)
VALUES(
  "003", 
  "Fernanda Montenegro",
  300000,
  "1929-10-19", 
  "female"
);

-- Certa
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "003", 
  "Fernanda Montenegro",
  300000,
  "1929-10-19", 
  "female"
);


-- Query Do Exercício 2.c 
-- Errada
INSERT INTO Actor (id, salary, birth_date, gender)
VALUES(
  "004",
  400000,
  "1949-04-18", 
  "male"
);

-- Certa
INSERT INTO Actor (id, salary, birth_date, gender, name)
VALUES(
  "004",
  400000,
  "1949-04-18", 
  "male",
  "Matheus"
);

-- Query Do Exercício 2.c 
-- Errada
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "005", 
  "Juliana Paes",
  719333.33,
  1979-03-26, 
  "female"
);

-- Certa
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "005", 
  "Juliana Paes",
  719333.33,
  "1979-03-26", 
  "female"
);

-- Query Do Exercício 2.d 
-- Errada
INSERT INTO Actor (id, salary, birth_date, gender)
VALUES(
  "004",
  400000,
  "1949-04-18", 
  "male"
);

-- Certa
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "004",
  "Ator Masculino"
  400000,
  "1949-04-18", 
  "male"
);

-- Query Do Exercício 2.e 
-- Errada
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "005", 
  "Juliana Paes",
  719333.33,
  1979-03-26, 
  "female"
);

-- Certa
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "005", 
  "Juliana Paes",
  "719333.33",
  1979-03-26, 
  "female"
);

-- Exercício 2

-- Query Do Exercício 2.a
SELECT id, name FROM Actor WHERE gender = "female";

-- Query Do Exercício 2.b
SELECT salary FROM Actor WHERE name = "Tony Ramos";

-- Query Do Exercício 2.c
SELECT * FROM Actor WHERE gender = "invalid";

-- Query Do Exercício 2.d
SELECT id, name, salary FROM Actor WHERE salary <= 500000;

-- Query Do Exercício 2.e
SELECT id, nome FROM Actor WHERE id = "002";

SELECT id, name FROM Actor WHERE id = "002";

-- Exercício 3

