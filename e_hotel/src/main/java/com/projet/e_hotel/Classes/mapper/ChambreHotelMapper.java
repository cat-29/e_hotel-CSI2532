package com.projet.e_hotel.Classes.mapper;

import java.util.ArrayList;
import java.util.List;

import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.dto.ChambreHotelDTO;

public class ChambreHotelMapper {
    // Convert from a ChambreHotel Jpa to ChambreHotelDto .. not sure...
    public static List<ChambreHotelDTO> mapToChambreHotelDTO(List<ChambreDTO> chambres, List<HotelDTO> hotels){
        List<ChambreHotelDTO> listDTOs = new ArrayList<>();
        // System.out.println("les chambres en params sont:");
        // System.out.println(chambres.toString());

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
 
    public static ChambreHotelDTO mapFromObjectToChambreHotelDTO(Object[] row){
        // System.out.println("row0 is "+row[0]);
        // System.out.println("row1 is "+row[1]);
        // System.out.println("row2 is "+row[2]);
        // System.out.println("row3 is "+row[3]);
        // System.out.println("row4 is "+row[4]);
        // System.out.println("row5 is "+row[5]);
        // System.out.println("row6 is "+row[6]);
        // System.out.println("row7 is "+row[7]);
        // System.out.println("row8 is "+row[8]);
        // System.out.println("row9 is "+row[9]);
        // System.out.println("row10 is "+row[10]);
        // System.out.println("row11 is "+row[11]);
        // System.out.println("row12 is "+row[12]);
        // System.out.println("row13 is "+row[13]);
        // System.out.println("row14 is "+row[14]);
        // System.out.println("row15 is "+row[15]);


        ChambreHotelDTO chambreHotel = new ChambreHotelDTO((String) row[6],(String) row[7],(Integer) row[8],(Integer) row[9],(Integer) row[10],(String) row[11],
        (String) row[12],(String) row[13],(String) row[15],(String) row[14],(Integer)row[1],(Integer) row[0], ((Number) row[2]).doubleValue(),(String)row[3],(String)row[4],(Boolean)row[5]);
        return chambreHotel;
        

    }
}
