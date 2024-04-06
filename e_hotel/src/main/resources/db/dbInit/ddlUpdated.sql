-- Generated by the database client.

-- Sequences
CREATE SEQUENCE hotel_id_seq;

-- TABLES DECLARATION

-- Chaine_hoteliere
CREATE TABLE IF NOT EXISTS chaine_hoteliere (
    nom_chaine VARCHAR(255) NOT NULL check (length(nom_chaine) > 2), nbr_hotel INTEGER CHECK (nbr_hotel >= 0), numero INTEGER NOT NULL check (numero > 0), rue VARCHAR NOT NULL check (length(rue) > 2), ville VARCHAR(255) NOT NULL check (length(ville) > 2), province CHAR(2) NOT NULL check (province ~ '^[A-Z]{2}$'), pays VARCHAR(255) NOT NULL check (length(pays) > 2), code_postal CHAR(6) Unique check (
        code_postal ~ '^([A-Z][0-9]){3}$'
    ), PRIMARY KEY (nom_chaine)
);

-- Telephone_chaine_hoteliere
CREATE TABLE IF NOT EXISTS telephone_chaine_hoteliere (
    num_telephone numeric check (
        length(num_telephone::numeric::text) = 10
    ), nom_chaine VARCHAR(255), PRIMARY KEY (num_telephone), FOREIGN KEY (nom_chaine) REFERENCES chaine_hoteliere
);

-- Email_chaine_hoteliere
CREATE TABLE IF NOT EXISTS email_chaine_hoteliere (
    email VARCHAR(255) CHECK (
        email ~ * '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    ), nom_chaine VARCHAR(255), PRIMARY KEY (email), FOREIGN KEY (nom_chaine) REFERENCES chaine_hoteliere
);

-- Hotel
CREATE TABLE IF NOT EXISTS hotel (
    id_hotel INTEGER NOT NULL DEFAULT nextval('hotel_id_seq'), nom_chaine VARCHAR(255), nom VARCHAR(255) check (length(nom) > 2), num_etoile INTEGER check (num_etoile BETWEEN 1 AND 5), nbr_chambre INTEGER check (nbr_chambre >= 0), numero INTEGER check (numero > 0), rue VARCHAR(255) check (length(rue) > 2), ville VARCHAR(255) check (length(ville) > 2), province CHAR(2) check (length(province) = 2), code_postal CHAR(6) Unique check (
        code_postal ~ '^([A-Z][0-9]){3}$'
    ), pays VARCHAR(255) check (length(pays) > 2), PRIMARY KEY (id_hotel), FOREIGN KEY (nom_chaine) REFERENCES chaine_hoteliere (nom_chaine)
);

-- Telephone_hotel
CREATE TABLE IF NOT EXISTS telephone_hotel (
    num_telephone NUMERIC check (
        length(num_telephone::numeric::text) = 10
    ), id_hotel INTEGER, PRIMARY KEY (num_telephone), FOREIGN KEY (id_hotel) REFERENCES hotel
);

-- Email_hotel
CREATE TABLE IF NOT EXISTS email_hotel (
    email VARCHAR(255) CHECK (
        email ~ * '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    ), id_hotel INTEGER, PRIMARY KEY (email), FOREIGN KEY (id_hotel) REFERENCES hotel
);

CREATE TABLE IF NOT EXISTS capacite_chambre_type (
    type VARCHAR(255) NOT NULL, PRIMARY KEY (type)
);

CREATE TABLE IF NOT EXISTS vue_chambre_type (
    type VARCHAR(255) NOT NULL, PRIMARY KEY (type)
);

CREATE TABLE IF NOT EXISTS role_employe_type (
    type VARCHAR(255) NOT NULL, PRIMARY KEY (type)
);
-- Chambre
CREATE TABLE IF NOT EXISTS chambre (
    numero_chambre INTEGER NOT NULL, id_hotel INTEGER, prix decimal(8, 2) not null check (
        prix > 0.00
        AND prix < 999999.99
    ), capacite_chambre VARCHAR(255), vue_chambre VARCHAR(255), capacite_a_etendre BOOLEAN, PRIMARY KEY (numero_chambre, id_hotel), FOREIGN KEY (id_hotel) REFERENCES hotel (id_hotel), FOREIGN KEY (capacite_chambre) REFERENCES capacite_chambre_type (type), FOREIGN KEY (vue_chambre) REFERENCES vue_chambre_type (type)
);

CREATE TABLE IF NOT EXISTS client (
    nas CHAR(9) check (nas ~ '^[0-9]{9}$'), prenom VARCHAR(255), nom_famille VARCHAR(255), numero INTEGER NOT NULL check (numero > 0), rue VARCHAR(255) NOT NULL check (length(rue) > 2), ville VARCHAR(255) NOT NULL check (length(ville) > 2), province CHAR(2) NOT NULL check (province ~ '^[A-Z]{2}$'), pays VARCHAR(255) NOT NULL check (length(pays) > 2), code_postal CHAR(6) check (
        code_postal ~ '^([A-Z][0-9]){3}$'
    ), PRIMARY KEY (nas)
);

-- Employe
CREATE TABLE IF NOT EXISTS employe (
    nas CHAR(9) check (nas ~ '^[0-9]{9}$'), prenom VARCHAR(255) NOT NULL, nom_famille VARCHAR(255) NOT NULL, numero INTEGER NOT NULL check (numero > 0), rue VARCHAR(255) NOT NULL check (length(rue) > 2), ville VARCHAR(255) NOT NULL check (length(ville) > 2), province CHAR(2) NOT NULL check (province ~ '^[A-Z]{2}$'), pays VARCHAR(255) NOT NULL check (length(pays) > 2), code_postal CHAR(6) Unique check (
        code_postal ~ '^([A-Z][0-9]){3}$'
    ), role VARCHAR(255), id_hotel INTEGER, PRIMARY KEY (nas), FOREIGN KEY (id_hotel) REFERENCES hotel (id_hotel), FOREIGN KEY (role) REFERENCES role_employe_type (type)
);

-- Travaille_pour
CREATE TABLE IF NOT EXISTS travaille_pour (
    id_hotel INTEGER, id_employe CHAR(9), role VARCHAR(255), PRIMARY KEY (id_hotel, id_employe), FOREIGN KEY (id_hotel) REFERENCES hotel (id_hotel), FOREIGN KEY (id_employe) REFERENCES employe (nas), FOREIGN KEY (role) REFERENCES role_employe_type (type)
);

-- Supervise
CREATE TABLE IF NOT EXISTS supervise (
    id_superviseur CHAR(9), id_employe CHAR(9) CHECK (id_superviseur <> id_employe), PRIMARY KEY (id_superviseur, id_employe), FOREIGN KEY (id_employe) REFERENCES employe (nas), FOREIGN KEY (id_superviseur) REFERENCES employe (nas)
);

-- Dommage
CREATE TABLE IF NOT EXISTS dommage (
    ID_DOMMAGE SERIAL, TYPE_DOMMAGE VARCHAR(255) CHECK (LENGTH(TYPE_DOMMAGE) > 2), UNIQUE (TYPE_DOMMAGE), PRIMARY KEY (ID_DOMMAGE)
);

-- Commodite
CREATE TABLE IF NOT EXISTS commodite (
    id_commodite SERIAL NOT NULL, type_commodite VARCHAR(255) check (length(type_commodite) > 2), UNIQUE (type_commodite), PRIMARY KEY (id_commodite)
);

-- Subi_Dommage
CREATE TABLE IF NOT EXISTS subi_dommage (
    id_dommage SERIAL, numero_chambre INTEGER, id_hotel INTEGER, PRIMARY KEY (
        id_dommage, numero_chambre, id_hotel
    ), FOREIGN KEY (id_dommage) REFERENCES dommage (id_dommage), FOREIGN KEY (numero_chambre, id_hotel) REFERENCES chambre (numero_chambre, id_hotel)
);

-- contient_commodite
CREATE TABLE IF NOT EXISTS contient_commodite (
    id_commodite SERIAL, numero_chambre INTEGER, id_hotel INTEGER, PRIMARY KEY (
        id_commodite, numero_chambre, id_hotel
    ), FOREIGN KEY (id_commodite) REFERENCES commodite (id_commodite), FOREIGN KEY (numero_chambre, id_hotel) REFERENCES chambre (numero_chambre, id_hotel)
);

CREATE TABLE IF NOT EXISTS client_reserve (
    id_client CHAR(9), numero_chambre INTEGER, id_hotel INTEGER, date_checkin DATE NOT NULL, date_checkout DATE NOT NULL check (date_checkout > date_checkin), prix decimal(8, 2) check (
        prix > 0.00
        AND prix < 999999.99
    ), date_paiement_complete timestamp without time zone DEFAULT NULL, paiement_complete BOOLEAN DEFAULT FALSE, PRIMARY KEY (
        id_client, numero_chambre, id_hotel, date_checkin, date_checkout
    ), FOREIGN KEY (numero_chambre, id_hotel) REFERENCES chambre (numero_chambre, id_hotel), FOREIGN KEY (id_client) REFERENCES client (nas)
);

-- Loue_chambre
CREATE TABLE IF NOT EXISTS loue_chambre (
    numero_chambre INTEGER, id_hotel INTEGER, id_client CHAR(9), id_employe CHAR(9), date_checkin DATE NOT NULL, date_checkout DATE NOT NULL check (date_checkout > date_checkin), montant_du decimal(8, 2) NOT NULL, paiement_complete BOOLEAN DEFAULT NULL, date_paiement_complete TIMESTAMP WITHOUT TIME ZONE, PRIMARY KEY (
        numero_chambre, id_hotel, id_client, id_employe, date_checkin, date_checkout
    ), FOREIGN KEY (numero_chambre, id_hotel) REFERENCES chambre (numero_chambre, id_hotel), FOREIGN KEY (id_client) REFERENCES client (nas), FOREIGN KEY (id_employe) REFERENCES employe (nas)
);

-- Enregistre_client
CREATE TABLE IF NOT EXISTS enregistre_client (
    id_employe CHAR(9), id_client CHAR(9), email VARCHAR(255) CHECK (
        email ~ * '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    ), date_enregistrement DATE NOT NULL, id SERIAL, PRIMARY KEY (id), FOREIGN KEY (id_employe) REFERENCES employe (nas), FOREIGN KEY (id_client) REFERENCES client (nas)
);

-- COMPTE CLIENT
CREATE TABLE IF NOT EXISTS compte_client (
    id_compte SERIAL, id_client CHAR(9), email VARCHAR(255) check (
        email ~ * '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    ), password VARCHAR(255) check (length(password) >= 8), UNIQUE (id_client), UNIQUE (email, password), PRIMARY KEY (id_compte), FOREIGN KEY (id_client) REFERENCES client (nas)
);

CREATE TABLE IF NOT EXISTS compte_employe (
    id_compte SERIAL, id_employe CHAR(9), email VARCHAR(255) check (
        email ~ * '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
    ), password VARCHAR(255) check (length(password) >= 8), UNIQUE (id_employe), UNIQUE (email, password), PRIMARY KEY (id_compte), FOREIGN KEY (id_employe) REFERENCES employe (nas)
);

-- COMPTE EMPLOYE & ADMIN
-- Ajoute des index
-- Ajout d'un index pour le email du client lorsqu'on enregistre un client
-- Pour ne pas avoir a passer au travers de toute la table
CREATE INDEX idx_email ON enregistre_client (email);

-- Ajout index pour le prenom du client dans la table client
CREATE INDEX idx_prenom ON client (prenom);

-- Ajout index pour le prenom de l'employe dans la table employe
CREATE INDEX idx_prenom_employe ON employe (prenom);

-- Creation des triggers

-- FONCTION POUR LE TRIGGER 1
-- Incremente le nombre de chambre dans hotel
CREATE OR REPLACE FUNCTION add_chambre_hotel() RETURNS 
TRIGGER 
LANGUAGE PLPGSQL AS 
$$
BEGIN
	UPDATE hotel
	SET
	    nbr_chambre = (nbr_chambre + 1)
	WHERE
	    id_hotel = NEW.id_hotel;
	RETURN NEW;
END;
$$; 
-- TRIGGER 1
-- Quand une chambre d'hotel est ajoutee, incremente le nombre de chambre
CREATE TRIGGER add_chambre_hotel
AFTER INSERT ON chambre FOR EACH ROW
EXECUTE PROCEDURE add_chambre_hotel ();

-- FONCTION POUR LE TRIGGER 2
-- Decremente le nombre de chambre dans la table hotel
CREATE OR REPLACE FUNCTION remove_chambre_hotel() RETURNS 
TRIGGER 
LANGUAGE PLPGSQL AS 
$$
BEGIN
	UPDATE hotel
	SET
	    nbr_chambre = (nbr_chambre - 1)
	WHERE
	    id_hotel = OLD.id_hotel;
	RETURN NEW;
END;
$$; 
-- TRIGGER 2
-- Quand une chambre d'hotel est supprimee, decremente le nombre de chambre
CREATE TRIGGER remove_chambre_hotel
AFTER DELETE ON chambre FOR EACH ROW
EXECUTE PROCEDURE remove_chambre_hotel ();

-- FONCTION POUR LE TRIGGER 3
CREATE OR REPLACE FUNCTION modifie_nom_chaine_dans_hotel
() RETURNS TRIGGER 
LANGUAGE PLPGSQL AS 
$$
BEGIN
	-- Update le nom de la chaine dans la table hotel
	UPDATE hotel
	SET
	    nom_chaine = NEW.nom_chaine
	WHERE
	    nom_chaine = OLD.nom_chaine;
	-- Update le nom de la chaine dans telephone_chaine_hoteliere
	UPDATE telephone_chaine_hoteliere
	SET
	    nom_chaine = NEW.nom_chaine
	WHERE
	    nom_chaine = OLD.nom_chaine;
	-- Update le nom de la chaine dans email_chaine_hoteliere
	UPDATE email_chaine_hoteliere
	SET
	    nom_chaine = NEW.nom_chaine
	WHERE
	    nom_chaine = OLD.nom_chaine;
	RETURN NEW;
END;
$$; 
-- TRIGGER 3
-- Quand on modifie le nom de la chaine, on la modifie aussi dans hotel
CREATE TRIGGER modifie_nom_chaine
AFTER
UPDATE ON chaine_hoteliere FOR EACH ROW
EXECUTE PROCEDURE modifie_nom_chaine_dans_hotel ();

-- Cree des views

-- Vue 1: Nombre de chambres disponibles par province
create view chambre_disponibles as
-- et puis on calcule le nombre de chambre dispo en groupant par la province
select province, count((numero_chambre, id_hotel)) as total_chambre_dispo
from (
        -- on veut grouper par province, donc on selectionne toutes les chambres disponibles
        -- avec leurs provinces
        select
            numero_chambre, id_hotel, province
        from chambre
            natural join hotel
        where (numero_chambre, id_hotel) in (
                -- 	ici ce sont les chambres valables disponibles, 
                -- toutes provinces sans exception
                select numero_chambre, id_hotel
                from chambre
                    natural join hotel
                except
                (
                    -- 	enlevons les chambres non disponibles	
                    (
                        select distinct
                            numero_chambre, id_hotel
                        from client_reserve
                        where (
                                CURRENT_DATE + 1 BETWEEN date_checkin and date_checkout
                            )
                            or (
                                CURRENT_DATE + 2 BETWEEN date_checkin and date_checkout
                            )
                    )
                    UNION
                    (
                        select distinct
                            numero_chambre, id_hotel
                        from loue_chambre
                        where (
                                CURRENT_DATE + 1 BETWEEN date_checkin and date_checkout
                            )
                            or (
                                CURRENT_DATE + 2 BETWEEN date_checkin and date_checkout
                            )
                    )
                )
            )
    )
group by
    province;

-- Vue 2: capacite de toutes les chambres de tous les hôtels
create view capacite_chambres_tous_hotels as
select distinct
    nom,
    capacite_chambre
from hotel
    natural join chambre
order by nom, capacite_chambre;

-- Vue 3: Vue montrant les détails de tous les chambres et leurs hôtels respectifs
create view chambreXhotel as (
    select *
    from chambre
        natural join hotel
);

-- Vue 4: Vue montrant le nombre total de chambres (disponibles et non) par hôtel.
create view tot_chambres_per_hotel as
select id_hotel, count(numero_chambre) as tot_chambres
from chambreXHotel
group by
    id_hotel;

-- Vue 5: Vue montrant les détails des chambres, des hôtels et une colonne pour le nombre total
-- de chambre dans chaque hôtel

create view chambreXhotelTotalChambre as
select *
from
    chambreXHotel
    natural join tot_chambres_per_hotel;

-- Vue 6: Vue montrant les commodites dans chaque chambre;
create view chambreXcommodite as
select *
from contient_commodite
    natural join commodite;

-- Cree une table pour inserer les logs quand on supprime une reservation
CREATE TABLE IF NOT EXISTS log_client_reserve (
    id SERIAL, id_client CHAR(9), numero_chambre INTEGER, id_hotel INTEGER, date_checkin DATE NOT NULL, date_checkout DATE NOT NULL, prix decimal(8, 2) check (
        prix > 0.00
        AND prix < 999999.99
    ), paiement_complete BOOLEAN, date_paiement_complete TIMESTAMP, PRIMARY KEY (id)
);

-- Cree table pour garder compte des entrees dans loue_chambre apres avoir supprimee une chambre
CREATE TABLE IF NOT EXISTS log_loue_chambre (
    id SERIAL, numero_chambre INTEGER NOT NULL, id_hotel INTEGER, id_client CHAR(9), id_employe CHAR(9), date_checkin DATE NOT NULL, date_checkout DATE NOT NULL check (date_checkout > date_checkin), montant_du decimal(8, 2) NOT NULL, paiement_complete BOOLEAN DEFAULT NULL, date_paiement_complete DATE DEFAULT NULL, PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION add_logs_before_deleting_chambre
() RETURNS TRIGGER 
LANGUAGE PLPGSQL AS 
$$
BEGIN
	-- Ajoute toutes les lignes dans client_reserve qui doivent etres supprimees
	INSERT INTO
	    log_client_reserve (
	        id_client, numero_chambre, id_hotel, date_checkin, date_checkout, prix, paiement_complete, date_paiement_complete
	    )
	SELECT *
	FROM client_reserve
	WHERE
	    numero_chambre = OLD.numero_chambre;
	-- Ajoute toutes les lignes dans loue_chambre qui doivent etres supprimees
	INSERT INTO
	    log_loue_chambre (
	        numero_chambre, id_hotel, id_client, id_employe, date_checkin, date_checkout, montant_du, paiement_complete, date_paiement_complete
	    )
	SELECT *
	FROM loue_chambre
	WHERE
	    numero_chambre = OLD.numero_chambre;
	-- Supprime les lignes dans client_reserve et loue_chambre
	DELETE FROM client_reserve
	where
	    id_hotel = OLD.id_hotel
	    and numero_chambre = OLD.numero_chambre;
	DELETE FROM loue_chambre
	where
	    id_hotel = OLD.id_hotel
	    and numero_chambre = OLD.numero_chambre;
	RETURN OLD;
END;
$$; 
-- TRIGGER

CREATE TRIGGER add_logs_before_deleting_chambre BEFORE DELETE ON chambre FOR EACH ROW
EXECUTE PROCEDURE add_logs_before_deleting_chambre ();

CREATE OR REPLACE FUNCTION add_logs_before_deleting_chambre
() RETURNS TRIGGER 
LANGUAGE PLPGSQL AS 
$$
BEGIN
	-- Ajoute toutes les lignes dans client_reserve qui doivent etres supprimees
	INSERT INTO
	    log_client_reserve (
	        id_client, numero_chambre, id_hotel, date_checkin, date_checkout, prix, paiement_complete, date_paiement_complete
	    )
	SELECT *
	FROM client_reserve
	WHERE
	    numero_chambre = OLD.numero_chambre;
	-- Ajoute toutes les lignes dans loue_chambre qui doivent etres supprimees
	INSERT INTO
	    log_loue_chambre (
	        numero_chambre, id_hotel, id_client, id_employe, date_checkin, date_checkout, montant_du, paiement_complete, date_paiement_complete
	    )
	SELECT *
	FROM loue_chambre
	WHERE
	    numero_chambre = OLD.numero_chambre;
	-- Supprime les lignes dans client_reserve et loue_chambre
	DELETE FROM client_reserve
	where
	    id_hotel = OLD.id_hotel
	    and numero_chambre = OLD.numero_chambre;
	DELETE FROM loue_chambre
	where
	    id_hotel = OLD.id_hotel
	    and numero_chambre = OLD.numero_chambre;
	RETURN OLD;
END;
$$; 
-- TRIGGER

-- FONCTION POUR LE TRIGGER
-- Incremente le nombre d'hotel dans chaine
CREATE OR REPLACE FUNCTION add_hotel_chaine() RETURNS 
TRIGGER 
LANGUAGE PLPGSQL AS 
$$
BEGIN
	UPDATE chaine_hoteliere
	SET
	    nbr_hotel = (nbr_hotel + 1)
	WHERE
	    nom_chaine = NEW.nom_chaine;
	RETURN NEW;
END;
$$; 
-- TRIGGER
-- Quand un hotel est ajoute, incremente le nombre d'hotel dans chaine
CREATE TRIGGER add_hotel_chaine
AFTER INSERT ON hotel FOR EACH ROW
EXECUTE PROCEDURE add_hotel_chaine ();

-- FONCTION POUR LE TRIGGER
-- Decremente le nombre d'hotel dans la table chaine
CREATE OR REPLACE FUNCTION remove_hotel_chaine() RETURNS 
TRIGGER 
LANGUAGE PLPGSQL AS 
$$
BEGIN
	UPDATE chaine_hoteliere
	SET
	    nbr_hotel = (nbr_hotel - 1)
	WHERE
	    nom_chaine = OLD.nom_chaine;
	RETURN NEW;
END;
$$; 
-- TRIGGER
-- Quand un hotel est supprime, decremente le nombre d'hotel dans chaine
CREATE TRIGGER remove_hotel_chaine
AFTER DELETE ON hotel FOR EACH ROW
EXECUTE PROCEDURE remove_hotel_chaine ();