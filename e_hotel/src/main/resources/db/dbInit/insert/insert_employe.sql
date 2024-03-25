INSERT INTO
    employe (
        nas, prenom, nom_famille, numero, rue, ville, province, pays, code_postal
    )
VALUES (
        123456789, 'Jean', 'Tremblay', 123, 'Rue Sainte-Catherine', 'Montreal', 'QC', 'Canada', 'H2L2M8'
    ),
    (
        234567890, 'Marie', 'Gagnon', 456, 'Avenue McGill College', 'Toronto', 'ON', 'Canada', 'M5G2C9'
    ),
    (
        345678901, 'Pierre', 'Roy', 789, 'Rue Peel', 'Ottawa', 'ON', 'Canada', 'K1P5J2'
    ),
    (
        456789012, 'Sophie', 'Bouchard', 101, 'Boulevard René-Lévesque', 'Vancouver', 'BC', 'Canada', 'V6Z2W1'
    ),
    (
        567890123, 'Michel', 'Côté', 202, 'Rue Peel', 'Calgary', 'AB', 'Canada', 'T2P2Y7'
    ),
    (
        678901234, 'Isabelle', 'Morin', 303, 'Rue Sainte-Catherine', 'Sherbrooke', 'QC', 'Canada', 'J1H1Z4'
    )
ON CONFLICT DO NOTHING;