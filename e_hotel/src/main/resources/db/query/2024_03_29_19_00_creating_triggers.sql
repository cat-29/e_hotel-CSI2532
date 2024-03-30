-- Active: 1709601080698@@localhost@5432@e_hotel_projet

-- Creation des triggers

-- FONCTIONS POUR LE TRIGGER 1
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
$$ 

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
$$

-- TRIGGER 1
-- Quand une chambre d'hotel est ajoutee, incremente le nombre de chambre
CREATE TRIGGER add_chambre_hotel
AFTER INSERT ON chambre FOR EACH ROW
EXECUTE PROCEDURE add_chambre_hotel ();

-- Quand une chambre d'hotel est supprimee, decremente le nombre de chambre
CREATE TRIGGER remove_chambre_hotel
AFTER DELETE ON chambre FOR EACH ROW
EXECUTE PROCEDURE remove_chambre_hotel ();

INSERT INTO
    chambre (
        numero_chambre, id_hotel, prix, capacite_chambre, vue_chambre, capacite_a_etendre
    )
VALUES (
        300, 1, 115.00, 'SIMPLE', 'MER', true
    )
ON CONFLICT DO NOTHING;

DELETE FROM chambre WHERE numero_chambre = 300 AND id_hotel = 1;

-- TRIGGER 2

-- CREATION DES FONCTIONS POUR LE TRIGGER 2
CREATE OR REPLACE FUNCTION modifie_nom_chaine_dans_hotel() RETURNS 
TRIGGER 
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
	UPDATE telephone_chaine_hoteliere SET
	    nom_chaine = NEW.nom_chaine
	WHERE
	    nom_chaine = OLD.nom_chaine;
	-- RETURN NEW;

	-- Update le nom de la chaine dans email_chaine_hoteliere
	UPDATE email_chaine_hoteliere SET
	    nom_chaine = NEW.nom_chaine
	WHERE
	    nom_chaine = OLD.nom_chaine;
	RETURN NEW;
END;
$$

-- Quand on modifie le nom de la chaine, on la modifie aussi dans hotel
CREATE TRIGGER modifie_nom_chaine
AFTER UPDATE ON chaine_hoteliere FOR EACH ROW
EXECUTE PROCEDURE modifie_nom_chaine_dans_hotel ();

UPDATE chaine_hoteliere SET nom_chaine = 'Hotels Bellevue' where nom_chaine = 'TEST';
UPDATE chaine_hoteliere SET nom_chaine = 'TEST' where nom_chaine = 'Hotels Bellevue';