-- Active: 1709601080698@@localhost@5432@e_hotel_projet@public
-- Ajoute des index

-- Ajout d'un index pour le email du client lorsqu'on enregistre un client
-- Pour ne pas avoir a passer au travers de toute la table
CREATE INDEX idx_email ON enregistre_client (email);

-- Ajout index pour le prenom du client dans la table client
CREATE INDEX idx_prenom ON client (prenom);

-- Ajout index pour le prenom de l'employe dans la table employe
CREATE INDEX idx_prenom_employe ON employe (prenom);