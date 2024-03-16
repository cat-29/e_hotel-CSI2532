ALTER TABLE employe ADD role roleEmployeEnum NOT NULL DEFAULT 'EMPLOYE';
ALTER TABLE employe 
ADD id_hotel INTEGER, ADD CONSTRAINT fk_id_hotel FOREIGN KEY (id_hotel) REFERENCES hotel(id_hotel);