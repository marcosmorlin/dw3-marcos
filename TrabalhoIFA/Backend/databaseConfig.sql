
-- Tabela usuarios
CREATE TABLE usuarios (
    usuarioid SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE,
    descricao VARCHAR(60) NOT NULL,
    deleted boolean DEFAULT false
);

-- Tabela menu
CREATE TABLE menu (
    menuid SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE,
    descricao VARCHAR(60) NOT NULL,
    nivel VARCHAR(50) UNIQUE,
    deleted boolean DEFAULT false,
);

CREATE TABLE menuUsuario(
    usuarioid INT REFERENCES usuarios(usuarioid),
    menuid INT REFERENCES menu(menuid),
    PRIMARY KEY(usuarioid, menuid),
    deleted boolean DEFAULT false,
)


CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;