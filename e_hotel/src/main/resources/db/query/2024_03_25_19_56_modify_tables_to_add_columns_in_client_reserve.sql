-- Modifie client_reserve
ALTER TABLE client_reserve
ADD paiement_complete BOOLEAN DEFAULT FALSE,
ADD date_paiement_complete timestamp without time zone DEFAULT NULL;

-- Modifie loue_chambre
ALTER TABLE loue_chambre
ALTER COLUMN date_paiement_complete TYPE timestamp without time zone;