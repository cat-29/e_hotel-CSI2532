create view chambreXhotelTotalChambre as select * from chambreXHotel natural join tot_chambres_per_hotel;
