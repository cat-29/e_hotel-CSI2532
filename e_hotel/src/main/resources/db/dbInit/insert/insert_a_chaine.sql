INSERT INTO
    chaine_hoteliere (
        nom_chaine, nbr_hotel, numero, rue, ville, province, pays, code_postal
    )
VALUES (
        'Hotels Bellevue', 8, 123, 'Rue Hospitalité', 'Quebec', 'QC', 'Canada', 'G0A0P1'
    ),
    (
        'Grand Horizon Hotels', 8, 101, 'Lyon St.', 'Ottawa', 'ON', 'Canada', 'K1R5T9'
    ),
    (
        'Sunset Vista Hotels & Resorts', 8, 23, 'Alberta St.', 'Calgary', 'AB', 'Canada', 'T1X9O4'
    ),
    (
        'The Grand Hotels', 8, 24, 'Morgan Street', 'Toronto', 'ON', 'Canada', 'M4B8G7'
    ),
    (
        'Séjour Bonnaventure', 8, 100, 'Rue Cormier', 'Sherbrooke', 'QC', 'Canada', 'J1C4U4'
    )
ON CONFLICT DO NOTHING;