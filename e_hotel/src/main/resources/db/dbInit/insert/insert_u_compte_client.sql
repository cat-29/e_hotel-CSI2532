INSERT INTO
    compte_client (
        id_compte, id_client, email, password
    )
VALUES (
        1, '123456789', 'client@test.ca', 'clienttest'
    )
ON CONFLICT DO NOTHING;