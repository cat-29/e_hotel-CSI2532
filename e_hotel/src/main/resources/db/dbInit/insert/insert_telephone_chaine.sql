-- Active: 1709601758715@@localhost@5432@e_hotel_projet
INSERT INTO
    telephone_chaine_hoteliere
VALUES (4181110000, 'Hotels Bellevue'),
    (
        6132221111, 'Grand Horizon Hotels'
    ),
    (
        4033332222, 'Sunset Vista Hotels & Resorts'
    ),
    (
        4164445555, 'The Grand Hotels'
    ),
    (
        8195556666, 'Séjour Bonnaventure'
    )
ON CONFLICT DO NOTHING;