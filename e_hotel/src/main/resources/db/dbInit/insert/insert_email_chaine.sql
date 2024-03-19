-- Active: 1709601758715@@localhost@5432@e_hotel_projet
INSERT INTO
    telephone_chaine_hoteliere
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