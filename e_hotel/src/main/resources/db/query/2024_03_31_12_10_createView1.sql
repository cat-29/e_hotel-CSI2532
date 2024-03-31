create view chambre_disponibles as
	-- et puis on calcule le nombre de chambre dispo en groupant par la province
	select province,count((numero_chambre,id_hotel)) as total_chambre_dispo from (
	-- on veut grouper par province, donc on selectionne toutes les chambres disponibles
	-- avec leurs provinces
		select numero_chambre,id_hotel,province from
			chambre natural join hotel where (numero_chambre,id_hotel) 
			in (
			-- 	ici ce sont les chambres valables disponibles, 
			-- toutes provinces sans exception
				select numero_chambre,id_hotel from chambre natural join hotel 
					except (
				-- 	enlevons les chambres non disponibles	
					(select distinct numero_chambre,id_hotel from client_reserve where 
					 (CURRENT_DATE+1 BETWEEN date_checkin and date_checkout) or 
					 (CURRENT_DATE+2 BETWEEN date_checkin and date_checkout))
						UNION 
					(select distinct numero_chambre,id_hotel from loue_chambre where 
					 (CURRENT_DATE+1 BETWEEN date_checkin and date_checkout) or 
					 (CURRENT_DATE+2 BETWEEN date_checkin and date_checkout))))) 
	group by province; 