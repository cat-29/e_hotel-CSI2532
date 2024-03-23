-- Active: 1709601080698@@localhost@5432@e_hotel_projet@public
-- client(nas, prenom, nom_famille, numero, rue, ville, province, pays, code_postal)
INSERT INTO
    client
VALUES (
        '123446789', 'John', 'Doe', 123, 'Main Street', 'Montreal', 'QC', 'Canada', 'H1A1A1'
    ),
    (
        '234567890', 'Jane', 'Smith', 456, 'First Avenue', 'Toronto', 'ON', 'Canada', 'M2M2M2'
    ),
    (
        '345678901', 'Michael', 'Johnson', 789, 'Broadway', 'Vancouver', 'BC', 'Canada', 'V5V5V5'
    ),
    (
        '456789012', 'Emily', 'Brown', 101, 'Elm Street', 'Calgary', 'AB', 'Canada', 'T2P2V7'
    ),
    (
        '567890123', 'Sarah', 'Wilson', 123, 'Bank St.', 'Ottawa', 'ON', 'Canada', 'K2T8H9'
    ),
    (
        '678901234', 'Daniel', 'Martinez', 303, 'Maple Road', 'Edmonton', 'AB', 'Canada', 'T5J0R2'
    ),
    (
        '789012345', 'Jessica', 'Taylor', 404, 'Cedar Lane', 'Halifax', 'NS', 'Canada', 'B3H3B4'
    ),
    (
        '890123456', 'Christopher', 'Lopez', 505, 'Pine Street', 'Quebec City', 'QC', 'Canada', 'G1G1G1'
    ),
    (
        '901234567', 'Amanda', 'Garcia', 606, 'Birch Boulevard', 'Winnipeg', 'MB', 'Canada', 'R3C3J2'
    ),
    (
        '112233445', 'Matthew', 'Wilson', 707, 'Spruce Drive', 'Saskatoon', 'SK', 'Canada', 'S7H5K1'
    ),
    (
        '223344556', 'Ashley', 'Chen', 808, 'Holly Court', 'Regina', 'SK', 'Canada', 'S4P0N8'
    ),
    (
        '334455667', 'David', 'Wong', 909, 'Juniper Lane', 'Victoria', 'BC', 'Canada', 'V8W2B1'
    ),
    (
        '445566778', 'Jennifer', 'Nguyen', 111, 'Linden Street', 'Fredericton', 'NB', 'Canada', 'E3B1A5'
    ),
    (
        '556677889', 'James', 'Lee', 2, 'Rose Avenue', 'Charlottetown', 'PE', 'Canada', 'C1A4B3'
    ),
    (
        '667788990', 'Olivia', 'Patel', 333, 'Daisy Drive', 'St. John''s', 'NL', 'Canada', 'A1B2C3'
    ),
    (
        '778899001', 'Ryan', 'Singh', 444, 'Ivy Lane', 'Yellowknife', 'NT', 'Canada', 'X1A2S3'
    ),
    (
        '889900112', 'Lauren', 'Murray', 555, 'Violet Road', 'Whitehorse', 'YT', 'Canada', 'Y1A3L9'
    ),
    (
        '990011223', 'William', 'Liu', 666, 'Tulip Crescent', 'Iqaluit', 'NU', 'Canada', 'X0A0H0'
    ),
    (
        '100111234', 'Sophia', 'Gauthier', 777, 'Orchid Street', 'Corner Brook', 'NL', 'Canada', 'A2H1M3'
    ),
    (
        '111222345', 'Ethan', 'Bélanger', 88, 'Magnolia Avenue', 'Hay River', 'NT', 'Canada', 'X0E0R0'
    ),
    (
        '123456789', 'Caterina', 'Bosi', 123, 'Bank St.', 'Ottawa', 'ON', 'Canada', 'K2T8H9'
    )
ON CONFLICT DO NOTHING;