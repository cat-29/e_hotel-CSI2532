INSERT INTO
    compte_employe (
        id_compte, id_employe, email, password
    )
VALUES (
        1, '987654321', 'employe@test.ca', 'employetest'
    ),
    (
        2, '345678901', 'superviseur@test.ca', 'superviseurtest'
    ),
    (
        3, '567890123', 'gestion@test.ca', 'gestiontest'
    ),
    (
        4, '111111111', 'admin@test.ca', 'admintest'
    )
ON CONFLICT DO NOTHING;