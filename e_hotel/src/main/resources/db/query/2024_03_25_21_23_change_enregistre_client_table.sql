-- Modification de la table enregistre_client
-- 1. Retire le primary key de la table: colonnes id_employe et id_client
ALTER TABLE enregistre_client DROP constraint enregistre_client_pkey -- primary key

-- 2. Ajoute un nouveau primary key SERIAL
ALTER TABLE enregistre_client ADD id SERIAL PRIMARY KEY;