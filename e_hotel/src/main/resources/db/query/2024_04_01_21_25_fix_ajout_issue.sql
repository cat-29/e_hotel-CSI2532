-- Active: 1709601758715@@localhost@5432@e_hotel_projet@public
DROP TABLE enregistre_client;

DROP TABLE loue_chambre;

DROP TABLE client_reserve;

DROP TABLE contient_commodite CASCADE;

DROP TABLE subi_dommage;

DROP TABLE commodite CASCADE;

DROP TABLE dommage;

DROP TABLE compte;

DROP TABLE supervise;

DROP TABLE travaille_pour;

DROP TABLE compte_client;

DROP TABLE compte_employe;

DROP TABLE employe;

DROP TABLE client;

DROP TABLE chambre CASCADE;

DROP TABLE email_hotel;

DROP TABLE telephone_hotel;

DROP TABLE hotel CASCADE;

DROP TABLE capacite_chambre_type CASCADE;

DROP TABLE vue_chambre_type CASCADE;

DROP TABLE role_employe_type;

DROP TABLE email_chaine_hoteliere;

DROP TABLE telephone_chaine_hoteliere;

DROP TABLE log_client_reserve;

DROP TABLE log_loue_chambre;

DROP TABLE chaine_hoteliere;

-- Drop views
DROP VIEW IF EXISTS chambre_disponibles CASCADE;

DROP VIEW IF EXISTS capacite_chambres_tous_hotels CASCADE;

DROP VIEW IF EXISTS chambreXhotel CASCADE;

DROP VIEW IF EXISTS tot_chambres_per_hotel CASCADE;

DROP VIEW IF EXISTS chambreXhotelTotalChambre CASCADE;

DROP VIEW IF EXISTS chambreXhotelTotalChambre CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS add_chambre_hotel CASCADE;

DROP FUNCTION IF EXISTS add_logs_before_deleting_chambre CASCADE;

DROP FUNCTION IF EXISTS modifie_nom_chaine_dans_hotel CASCADE;

DROP FUNCTION IF EXISTS remove_chambre_hotel CASCADE;

DROP FUNCTION IF EXISTS add_hotel_chaine CASCADE;

DROP FUNCTION IF EXISTS remove_hotel_chaine CASCADE;

-- Drop sequence
DROP SEQUENCE IF EXISTS hotel_id_seq CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS add_logs_before_deleting_chambre ON chambre CASCADE;

DROP TRIGGER IF EXISTS add_chambre_hotel ON chambre;

DROP TRIGGER IF EXISTS remove_chambre_hotel ON chambre;

DROP TRIGGER IF EXISTS modifie_nom_chaine ON chaine_hoteliere;