-- Active: 1709601080698@@localhost@5432@e_hotel_projet@public
-- Cree une table pour inserer les logs quand on supprime une reservation
CREATE TABLE IF NOT EXISTS log_client_reserve (
    id SERIAL, 
    id_client CHAR(9), 
    numero_chambre INTEGER, 
    id_hotel INTEGER, 
    date_checkin DATE NOT NULL, 
    date_checkout DATE NOT NULL, 
    prix decimal(8, 2) check (
        prix > 0.00
        AND prix < 999999.99
    ), 
    paiement_complete BOOLEAN, 
    date_paiement_complete TIMESTAMP, 
    PRIMARY KEY (id)
);

-- Cree table pour garder compte des entrees dans loue_chambre apres avoir supprimee une chambre
CREATE TABLE IF NOT EXISTS log_loue_chambre (
    id SERIAL, 
    numero_chambre INTEGER NOT NULL, 
    id_hotel INTEGER, 
    id_client CHAR(9), 
    id_employe CHAR(9), 
    date_checkin DATE NOT NULL, 
    date_checkout DATE NOT NULL check (date_checkout > date_checkin), 
    montant_du decimal(8, 2) NOT NULL, 
    paiement_complete BOOLEAN DEFAULT NULL, 
    date_paiement_complete DATE DEFAULT NULL, 
    PRIMARY KEY (id)
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
	DELETE FROM loue_chambre where id_hotel = OLD.id_hotel and numero_chambre = OLD.numero_chambre;
	RETURN OLD;
END;
$$ 

-- TRIGGER
CREATE TRIGGER add_logs_before_deleting_chambre BEFORE DELETE ON chambre FOR EACH ROW
EXECUTE PROCEDURE add_logs_before_deleting_chambre ();