INSERT INTO
    supervise (id_superviseur, id_employe)
VALUES ('345678901', '123456789'),
    ('456789012', '234567890')
ON CONFLICT DO NOTHING;