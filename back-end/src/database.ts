import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function openDb() {
  return open({
    filename: './src/database.sqlite',
    driver: sqlite3.Database,
  });
}

export async function createTables() {
  const db = await openDb();
  
  // Criação da tabela de produtos
  await db.exec(`
    CREATE TABLE IF NOT EXISTS produto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL,
      imagem TEXT,
      fornecedorId INTEGER,
      FOREIGN KEY (fornecedorId) REFERENCES fornecedor(id)
    )
  `);
  console.log('Table produto created');

  // Criação da tabela de fornecedores
  await db.exec(`
    CREATE TABLE IF NOT EXISTS fornecedor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cnpj TEXT NOT NULL UNIQUE,
      contato TEXT NOT NULL,
      endereco TEXT
    )
  `);
  console.log('Table fornecedor created');

  // Criação da tabela de clientes
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cliente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf_cnpj TEXT NOT NULL UNIQUE,
      contato TEXT NOT NULL,
      endereco TEXT,
      ativo INTEGER NOT NULL DEFAULT 1  
    )
  `);
  console.log('Table cliente created');

  // Criação da tabela de transações
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE NOT NULL
    )
  `);
  console.log('Table transacao created');
}
