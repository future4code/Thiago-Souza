## Resolução Do Exercício 1

```SQL
CREATE TABLE Actor (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    salary FLOAT NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(6) NOT NULL
);
```

### A)
Em `id`(indetificador) ultilizamos `VARCHAR(255)` para representar uma string com até 255 caracteres, ela é uma chave primária, ou seja, não podemos ter dois ids iguais nessa tabela.

Em `name`(nome) ultilizamos `VARCHAR(255)` para representar uma string com até 255 caracteres e ela não pode receber um valor nulo(`null`).

Em `birth_date`(data de nascimento) ultilizamos `DATE` para representar uma data que tem que seguir o formato `AAAA-MM-DD`.

Em `gender`(gênero) ultilizamos `VARCHAR(6)` para representar uma string com até 6 caracteres e ela não pode receber um valor nulo(`null`).

### B)
`SHOW DATABASES` mostra os bancos de dados que estou conectado e tenho acesso, já o `SHOW TABLES` mostra as tabelas do meu banco de dados padrão, que é o `paiva-2125814-thiago-souza`

### C)
`DESCRIBE Actor` retorna os campos da tabela e explica como eles são, ou seja, fala o tipo do campo, se pode ser nulo, o tipo da chave e o valor padrão do campo.

## Resolução Do Exercício 2

### A) 
A query criada foi
```SQL
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "002", 
  "Glória Pires",
  1200000,
  "1963-08-23", 
  "female"
);

```


