INSERT INTO
    telephone_chaine_hoteliere (num_telephone, nom_chaine)
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