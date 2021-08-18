/*
  Exercício 1.a)
    O método construtor serve para fazer incializações as nossas
    propriedades privadas

  Exercício 1.b)
    Ela foi imprimida a quantidade de vezes que eu inicializo a clase UserAccount

  Exercício 1.c)
    Conseguimos ter acesso a essa propriedades usando metódos do tipo getters
*/

class Transaction {
  #date: string;

  #value: number;

  #description: string;

  constructor(date: string, value: number, description: string) {
    this.#date = date;
    this.#value = value;
    this.#description = description;
  }

  getDate(): string {
    return this.#date;
  }

  getValue(): number {
    return this.#value;
  }

  getDescription(): string {
    return this.#description;
  }
}

class UserAccount {
  #cpf: string;

  #name: string;

  #age: number;

  #balance = 0;

  #transactions: Transaction[] = [];

  constructor(cpf: string, name: string, age: number) {
    /*eslint-disable-next-line no-console*/
    console.log("Chamando o construtor da classe UserAccount");
    this.#cpf = cpf;
    this.#name = name;
    this.#age = age;
  }

  getCpf(): string {
    return this.#cpf;
  }

  getName(): string {
    return this.#name;
  }

  getAge(): number {
    return this.#age;
  }

  getBalance(): number {
    return this.#balance;
  }

  getTransactions(): Transaction[] {
    return this.#transactions;
  }
}

export class Bank {
  #accounts: UserAccount[];

  constructor(accounts: UserAccount[]) {
    this.#accounts = accounts;
  }

  addAccount(account: UserAccount): void {
    this.#accounts.push(account);
  }

  getAccounts(): UserAccount[] {
    return this.#accounts;
  }
}
