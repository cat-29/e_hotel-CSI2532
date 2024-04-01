create view capacite_chambres_tous_hotels as
select distinct nom,capacite_chambre from hotel natural join chambre order by nom,capacite_chambre;
