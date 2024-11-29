-- Criação do banco de dados. O banco utilizado foi o PostgreSQL 15.8, hospedado localmente.
-- Caso o DB utilizado não suporte a sintaxe à seguir, fazer alterações de acordo
CREATE DATABASE "task_manager"
WITH ENCODING = 'UTF8'
LC_COLLATE = 'en_US.utf8'
LC_CTYPE = 'en_US.utf8'
TEMPLATE = template0;

\c task_manager;


-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(65) NOT NULL,
    "email" VARCHAR(65) NOT NULL,
    "password" VARCHAR(65) NOT NULL
);


-- Criação das tabelas de tarefas e referência para a tabela de usuários
CREATE TABLE IF NOT EXISTS "task" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "name" VARCHAR(65) NOT NULL,
    "description" VARCHAR(255),
    "categories" VARCHAR(120),
    "due_date" VARCHAR(10) NOT NULL,
    "due_time" VARCHAR(5) NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
);


-- Criação da tabela de lembartes e referência para a tabela de usuários
CREATE TABLE IF NOT EXISTS "reminder" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "name" VARCHAR(65) NOT NULL,
    "description" VARCHAR(255),
    "due_date" VARCHAR(10) NOT NULL,
    "due_time" VARCHAR(5) NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
);
