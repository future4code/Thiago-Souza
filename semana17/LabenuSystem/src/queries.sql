
SHOW DATABASES;

SHOW TABLES;

SELECT * FROM information_schema.columns WHERE TABLE_NAME LIKE "LabenuSystem%";

SELECT TABLE_NAME, COLUMN_NAME, COLUMN_DEFAULT, COLUMN_TYPE, COLUMN_KEY FROM information_schema.columns WHERE TABLE_NAME LIKE "LabenuSystem%";

DROP TABLE LabenuSystem_Professor_Especialidade;

DROP TABLE LabenuSystem_Estudante_Passatempo;

DROP TABLE LabenuSystem_Especialidade;

DROP TABLE LabenuSystem_Passatempo;

DROP TABLE LabenuSystem_Professor;

DROP TABLE LabenuSystem_Estudante;

DROP TABLE LabenuSystem_Turma;

CREATE TABLE LabenuSystem_Turma (
  id CHAR(36) PRIMARY KEY NOT NULL,
  nome VARCHAR(255) UNIQUE NOT NULL,
  data_inicio DATE NOT NULL,
  data_final DATE NOT NULL,
  modulo TINYINT UNSIGNED NOT NULL DEFAULT 0,
  tipo ENUM("Integral", "Noturno") NOT NULL
);

CREATE TABLE LabenuSystem_Estudante (
  id CHAR(36) PRIMARY KEY NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  data_de_nascimento DATE NOT NULL,
  turma_id CHAR(36) NOT NULL,
  FOREIGN KEY (turma_id) REFERENCES LabenuSystem_Turma(id)
);

CREATE TABLE LabenuSystem_Passatempo (
  id CHAR(36) PRIMARY KEY NOT NULL,
  nome VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE LabenuSystem_Estudante_Passatempo (
  estudante_id CHAR(36) NOT NULL,
  passatempo_id CHAR(36) NOT NULL,
  FOREIGN KEY (estudante_id) REFERENCES LabenuSystem_Estudante(id),
  FOREIGN KEY (passatempo_id) REFERENCES LabenuSystem_Passatempo(id)
);

CREATE TABLE LabenuSystem_Professor (
  id CHAR(36) PRIMARY KEY NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  data_de_nascimento DATE NOT NULL,
  turma_id CHAR(36) NOT NULL,
  FOREIGN KEY (turma_id) REFERENCES LabenuSystem_Turma(id)
);

CREATE TABLE LabenuSystem_Especialidade (
  id CHAR(36) PRIMARY KEY NOT NULL,
  nome ENUM("React", "Redux", "CSS", "Testes", "Typescript", "POO", "Backend") 
    NOT NULL
);

CREATE TABLE LabenuSystem_Professor_Especialidade (
  especialidade_id CHAR(36) NOT NULL,
  professor_id CHAR(36) NOT NULL,
  FOREIGN KEY (especialidade_id) REFERENCES LabenuSystem_Especialidade(id),
  FOREIGN KEY (professor_id) REFERENCES LabenuSystem_Professor(id)
);

