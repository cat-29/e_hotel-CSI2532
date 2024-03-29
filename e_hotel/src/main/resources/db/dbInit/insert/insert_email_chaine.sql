INSERT INTO
    email_chaine_hoteliere (email, nom_chaine)
VALUES (
        'info@hotelsbellevue.ca', 'Hotels Bellevue'
    ),
    (
        'info@grandhorizon.ca', 'Grand Horizon Hotels'
    ),
    (
        'info@sunsetvista.ca', 'Sunset Vista Hotels & Resorts'
    ),
    (
        'info@thegrandhotels.ca', 'The Grand Hotels'
    ),
    (
        'info@sejourbonnaventure.ca', 'Séjour Bonnaventure'
    )
ON CONFLICT DO NOTHING;