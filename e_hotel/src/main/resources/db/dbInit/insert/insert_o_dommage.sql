INSERT INTO
    dommage (id_dommage, type_dommage)
VALUES (
        1, 'Pression de robinet faible'
    ),
    (
        2, 'Télévision ne fonctionne pas'
    ),
    (
        3, 'Porte au balcon non-fonctionnelle'
    )
ON CONFLICT DO NOTHING;