-- COMPTE CLIENT
CREATE TABLE IF NOT EXISTS compte_client(
    id_compte SERIAL,
    id_client CHAR(9),
    email VARCHAR(255) check (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    password VARCHAR(255) check (length(password) >= 8),
    UNIQUE(id_client),
    UNIQUE(email, password),
    PRIMARY KEY(id_compte),
    FOREIGN KEY (id_client) REFERENCES client(nas)
);

CREATE TABLE IF NOT EXISTS compte_employe(
    id_compte SERIAL,
    id_employe CHAR(9),
    email VARCHAR(255) check (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    password VARCHAR(255) check (length(password) >= 8),
    UNIQUE(id_employe),
    UNIQUE(email, password),
    PRIMARY KEY(id_compte),
    FOREIGN KEY (id_employe) REFERENCES employe(nas)
)
-- COMPTE EMPLOYE & ADMIN