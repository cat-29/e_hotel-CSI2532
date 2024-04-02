INSERT INTO
    compte_employe (
        id_compte, id_employe, email, password
    )
VALUES (
        1, '123456789', 'employe@test.ca', 'employetest'
    ),
    (
        2, '345678901', 'superviseur@test.ca', 'superviseurtest'
    ),
    (
        3, '567890123', 'gestion@test.ca', 'gestiontest'
    )
ON CONFLICT DO NOTHING;