-- Active: 1709601080698@@localhost@5432@e_hotel_projet@public
INSERT INTO
    email_chaine_hoteliere
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