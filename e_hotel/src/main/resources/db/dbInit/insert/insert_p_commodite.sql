INSERT INTO
    commodite (id_commodite, type_commodite)
VALUES (1, 'Air climatisé'),
    (2, 'Télévision'),
    (3, 'Réfrigérateur'),
    (4, 'Balcon'),
    (5, 'Wi-fi')
ON CONFLICT DO NOTHING;