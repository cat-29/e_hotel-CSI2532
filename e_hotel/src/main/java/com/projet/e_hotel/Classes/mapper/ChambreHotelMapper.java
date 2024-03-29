package com.projet.e_hotel.Classes.mapper;

import java.util.ArrayList;
import java.util.List;

import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.dto.ChambreHotelDTO;;

public class ChambreHotelMapper {
    // Convert from a ChambreHotel Jpa to ChambreHotelDto .. not sure...
    public static List<ChambreHotelDTO> mapToChambreHotelDTO(List<ChambreDTO> chambres, List<HotelDTO> hotels){
        List<ChambreHotelDTO> listDTOs = new ArrayList<>();
        System.out.println("les chambres en params sont:");
        System.out.println(chambres.toString());

        for (int i = 0;i<chambres.size();i++){

            ChambreHotelDTO chambreHoteldto = new ChambreHotelDTO(
                hotels.get(i).getNomChaine(),
                hotels.get(i).getNom(),
                hotels.get(i).getRating(),
                hotels.get(i).getNbrChambre(),
                hotels.get(i).getNumero(),
                hotels.get(i).getRue(),
                hotels.get(i).getVille(),
                hotels.get(i).getProvince(),
                hotels.get(i).getPays(),
                hotels.get(i).getCodePostal(),
                chambres.get(i).getNumeroChambre(),
                hotels.get(i).getId(),
                chambres.get(i).getPrix(),
                chambres.get(i).getCapaciteChambre(),
                chambres.get(i).getVueChambre(),
                chambres.get(i).getCapaciteAEtendre());

            listDTOs.add(chambreHoteldto);
        }
        return listDTOs;


    }
    
}
