INSERT INTO
    email_hotel (email, id_hotel)
VALUES (
        'info@hotelbellevuemontreal.ca', 1
    ),
    (
        'info@hotelbellevuetoronto.ca', 2
    ),
    (
        'info@hotelbellevuevancouver.ca', 3
    ),
    (
        'info@hotelbellevuequebec.ca', 4
    ),
    (
        'info@hotelbellevueottawa.ca', 5
    ),
    (
        'info@hotelbellevuecalgary.ca', 6
    ),
    (
        'info@hotelbellevuehalifax.ca', 7
    ),
    (
        'info@hotelbellevuewinnipeg.ca', 8
    )
ON CONFLICT DO NOTHING;