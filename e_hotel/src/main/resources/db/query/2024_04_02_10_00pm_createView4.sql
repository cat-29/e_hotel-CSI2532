create view tot_chambres_per_hotel as 
select id_hotel,count(numero_chambre) as tot_chambres from chambreXHotel group by id_hotel;
