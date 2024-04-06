INSERT INTO
    supervise (id_superviseur, id_employe)
VALUES ('345678901', '987654321'),
    ('456789012', '234567890')
ON CONFLICT DO NOTHING;