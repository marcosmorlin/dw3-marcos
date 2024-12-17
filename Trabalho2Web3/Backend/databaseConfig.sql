-- Tabela autores
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
    data_criacao DATE,
    deleted boolean DEFAULT false

);

-- Tabela livros
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2),
    data_publicacao DATE,
    autor_id INT REFERENCES autores(id) ON DELETE CASCADE,
    deleted boolean DEFAULT false
);

-- Tabela usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
    data_cadastro DATE,
    saldo DECIMAL(10, 2),
    deleted boolean DEFAULT false
);

-- Tabela emprestimos
CREATE TABLE emprestimos (
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    livro_id INT REFERENCES livros(id) ON DELETE CASCADE,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    taxa_multa DECIMAL(10, 2),
    deleted boolean DEFAULT false,
    PRIMARY KEY (usuario_id, livro_id)
);

--tabela login 
CREATE TABLE login (

id SERIAL PRIMARY KEY,
senha VARCHAR (150)
email(150) UNIQUE NOT NULL,
softDelete boolean default false

)

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;