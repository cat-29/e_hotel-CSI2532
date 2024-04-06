INSERT INTO
    travaille_pour (id_hotel, id_employe, role)
VALUES (1, '987654321', 'EMPLOYE'),
    (1, '234567890', 'EMPLOYE'),
    (1, '345678901', 'SUPERVISEUR'),
    (1, '456789012', 'SUPERVISEUR'),
    (
        1, '567890123', 'GESTIONNAIRE'
    )
ON CONFLICT DO NOTHING;