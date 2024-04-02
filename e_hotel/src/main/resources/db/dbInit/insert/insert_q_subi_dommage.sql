INSERT INTO
    subi_dommage (
        id_dommage, numero_chambre, id_hotel
    )
VALUES (1, 100, 1),
    (2, 102, 1),
    (3, 104, 1)
ON CONFLICT DO NOTHING;