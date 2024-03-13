-- Generated by the database client.
-- TYPES
CREATE TYPE capEn AS ENUM (
'Simple',
'Double',
'Triple'
);


CREATE TYPE vueEn AS ENUM (
'mer',
'montagne'
);

CREATE SEQUENCE hot_id START WITH 100;

-- TABLES DECLARATION

-- Chaine_hoteliere
CREATE TABLE IF NOT EXISTS chaine_hoteliere(
nom_chaine VARCHAR(255) NOT NULL check(length(nom_chaine)>2),
nbr_hotel numeric CHECK(nbr_hotel > 0),
numero INTEGER NOT NULL check(numero>0),
rue VARCHAR(255) NOT NULL check(length(rue)>2),
ville VARCHAR(255) NOT NULL check(length(ville)>2),
province CHAR(2) NOT NULL check (length(province)=2),
pays VARCHAR(255) NOT NULL check(length(pays)>2),
code_postal CHAR(6) Unique check (code_postal ~ '^([A-Z][0-9]){3}$'),
PRIMARY KEY (nom_chaine)
);

-- Hotel

CREATE TABLE IF NOT EXISTS hotel(
id_hotel varchar(50) DEFAULT CONCAT('hot-',nextval('hot_id')),
nom_chaine VARCHAR(255) check(length(nom_chaine)>2),
nom VARCHAR(255) Unique check(length(nom)>2),
num_etoile INTEGER check(num_etoile BETWEEN 1 AND 10),
nbr_chambre INTEGER check(nbr_chambre>0),
numero INTEGER check(numero>0),
rue VARCHAR(255) check(length(rue)>2),
ville VARCHAR(255) check(length(ville)>2),
province CHAR(2) check(length(province)=2),
code_postal CHAR(6) Unique check (code_postal ~ '^([A-Z][0-9]){3}$'),
pays VARCHAR(255) check(length(pays)>2),
PRIMARY KEY (id_hotel),
FOREIGN KEY (nom_chaine) REFERENCES chaine_hoteliere(nom_chaine)
);

-- Chambre

CREATE TABLE IF NOT EXISTS Chambre (
numero_Chambre INTEGER,
id_hotel varchar(50) DEFAULT CONCAT('hot-',nextval('hot_id')),
prix decimal(8,2) not null check (prix > 10.00),
capacite capEn,
vue vueEn,
capacite_etendre BOOLEAN,
PRIMARY KEY (Numero_Chambre,id_hotel),
FOREIGN KEY (id_hotel) REFERENCES hotel(id_hotel)
);

-- Client

-- Employe

-- Dommage ajouter ici
-- Commodite ajouter ici
-- Subi_Dommage
CREATE TABLE IF NOT EXISTS Subi_Dommage (
id_dommage serial,
numero_Chambre INTEGER,
id_hotel varchar(50) DEFAULT CONCAT('hot-',nextval('hot_id')),
PRIMARY KEY (id_dommage,numero_Chambre,id_hotel),
FOREIGN KEY (id_dommage) REFERENCES dommage(id_dommage),
FOREIGN KEY (Numero_Chambre,id_hotel) REFERENCES Chambre (Numero_Chambre,id_hotel)
);

-- contient_commodite

CREATE TABLE IF NOT EXISTS contient_commodite (
id_commodite serial,
numero_Chambre INTEGER,
id_hotel varchar(50) DEFAULT CONCAT('hot-',nextval('hot_id')),
PRIMARY KEY (id_commodite,numero_Chambre,id_hotel),
FOREIGN KEY (id_commodite) REFERENCES commodite(id_commodite),
FOREIGN KEY (numero_Chambre,id_hotel) REFERENCES Chambre(Numero_Chambre,id_hotel)
);

CREATE TABLE IF NOT EXISTS client_reserve (
numero_Chambre INTEGER,
id_hotel varchar(50) DEFAULT CONCAT('hot-',nextval('hot_id')),
nas_client char(9) check (nas_client ~ '^[0-9]{9}$'),
date_checkin DATE NOT NULL,
date_checkout DATE NOT NULL,
prix decimal(8,2) check(prix >= 10.00),
PRIMARY KEY (numero_Chambre,id_hotel,nas_client,date_checkin,date_checkout),
FOREIGN KEY (numero_Chambre,id_hotel) REFERENCES ChambreN(numero_Chambre,id_hotel),
FOREIGN KEY (nas_client) REFERENCES client(nas)
);

CREATE TABLE IF NOT EXISTS loue_chambre (
numero_Chambre INTEGER,
id_hotel varchar(50) DEFAULT CONCAT('hot-',nextval('hot_id')),
nas_client char(9) check (nas_client ~ '^[0-9]{9}$'),
nas_employe char(9) check (nas_employe ~ '^[0-9]{9}$'),
date_checkin DATE NOT NULL,
date_checkout DATE NOT NULL,
montant_du decimal(10,2) check (montant_du > 10.00),
paiement_complet BOOLEAN,
date_paiement_complet DATE NOT NULL,
PRIMARY KEY (numero_Chambre,id_hotel,nas_client,nas_employe,date_checkin,date_checkout),
FOREIGN KEY (numero_Chambre,id_hotel) REFERENCES Chambre(numero_Chambre,id_hotel),
FOREIGN KEY (nas_client) REFERENCES client(nas),
FOREIGN KEY (nas_employe) REFERENCES employe(nas)
);








-- Test Table
-- CREATE TABLE chaine_hoteliere(
--     nom_chaine varchar(255) NOT NULL,
--     nbr_hotel integer,
--     numero integer,
--     rue varchar(255),
--     ville varchar(255),
--     province varchar(2),
--     pays varchar(255),
--     code_postal varchar(6),
--     PRIMARY KEY(nom_chaine)
-- );