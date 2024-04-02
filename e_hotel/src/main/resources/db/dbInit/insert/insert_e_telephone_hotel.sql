INSERT INTO
    telephone_hotel (num_telephone, id_hotel)
VALUES (5141110000, 1),
    (4162221111, 2),
    (6043332222, 3),
    (4184445555, 4),
    (6135556666, 5),
    (4036667777, 6),
    (9027778888, 7),
    (2048889999, 8)
ON CONFLICT DO NOTHING;