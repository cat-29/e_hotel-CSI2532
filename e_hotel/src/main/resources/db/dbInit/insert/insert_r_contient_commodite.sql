INSERT INTO
    contient_commodite (
        id_commodite, numero_chambre, id_hotel
    )
VALUES (1, 100, 1),
    (2, 100, 1),
    (5, 100, 1),
    (1, 101, 1),
    (4, 101, 1),
    (5, 101, 1),
    (1, 102, 1),
    (2, 102, 1),
    (3, 102, 1),
    (5, 102, 1),
    (1, 103, 1),
    (3, 103, 1),
    (5, 103, 1),
    (1, 104, 1),
    (2, 104, 1),
    (3, 104, 1),
    (4, 104, 1),
    (5, 104, 1)
ON CONFLICT DO NOTHING;