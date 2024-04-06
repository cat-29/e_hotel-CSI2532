-- Remove All Enums
DROP TYPE IF EXISTS capaciteEnum CASCADE;
DROP TYPE IF EXISTS vueEnum CASCADE;
DROP TYPE IF EXISTS roleEmployeEnum CASCADE;


-- Create tables to replace the enums
CREATE TABLE IF NOT EXISTS capacite_chambre_type(
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY(type)
);

CREATE TABLE IF NOT EXISTS vue_chambre_type(
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY(type)
);

CREATE TABLE IF NOT EXISTS role_employe_type(
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY(type)
)


-- Modify all tables that contained Enums and replace them as a reference to their new tables
ALTER TABLE chambre DROP capacite_chambre;
ALTER TABLE chambre ADD capacite_chambre VARCHAR(255), ADD CONSTRAINT fk_cpacite_chambre FOREIGN KEY (capacite_chambre) REFERENCES capacite_chambre_type(type);

ALTER TABLE chambre DROP vue;
ALTER TABLE chambre ADD vue_chambre VARCHAR(255), ADD CONSTRAINT fk_vue_chambre FOREIGN KEY (vue_chambre) REFERENCES vue_chambre_type(type);

ALTER TABLE employe DROP role;
ALTER TABLE employe ADD role VARCHAR(255), ADD CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES role_employe_type(type);

-- Populate the tables
INSERT INTO capacite_chambre_type VALUES ('SIMPLE'), ('DOUBLE'), ('TRIPLE') ON CONFLICT DO NOTHING;
INSERT INTO vue_chambre_type VALUES ('MER'), ('MONTAGNE') ON CONFLICT DO NOTHING;
INSERT INTO role_employe_type VALUES ('SUPERVISEUR'), ('GESTIONNAIRE'), ('EMPLOYE') ON CONFLICT DO NOTHING;