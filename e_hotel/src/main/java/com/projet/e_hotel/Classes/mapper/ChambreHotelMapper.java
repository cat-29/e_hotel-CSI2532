package com.projet.e_hotel.Classes.mapper;

import java.util.ArrayList;
import java.util.List;

import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.dto.ChambreHotelDTO;

public class ChambreHotelMapper {

    // Convert from a ChambreHotel Jpa to ChambreHotelDto .. not sure...
    public static List<ChambreHotelDTO> mapToChambreHotelDTO(List<ChambreDTO> chambres, List<HotelDTO> hotels) {
        List<ChambreHotelDTO> listDTOs = new ArrayList<>();

        for (int i = 0; i < chambres.size(); i++) {

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

    // Convert from object into ChambreHotelDTO
    public static ChambreHotelDTO mapFromObjectToChambreHotelDTO(Object[] row) {
        ChambreHotelDTO chambreHotel = new ChambreHotelDTO((String) row[6], (String) row[7], (Integer) row[8],
                (Integer) row[9], (Integer) row[10], (String) row[11],
                (String) row[12], (String) row[13], (String) row[15], (String) row[14], (Integer) row[1],
                (Integer) row[0], ((Number) row[2]).doubleValue(), (String) row[3], (String) row[4], (Boolean) row[5]);
        return chambreHotel;
    }
}
