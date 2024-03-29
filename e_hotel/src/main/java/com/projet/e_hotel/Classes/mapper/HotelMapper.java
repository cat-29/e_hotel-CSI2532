package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Classes.dto.HotelDTO;

public class HotelMapper {
    
    public static HotelDTO mapToHotelDTO(Hotel hotel) {
        // return new HotelDTO(hotel.getId(), hotel.getNomChaine(), hotel.)
        return new HotelDTO(
            hotel.getId(),
            hotel.getNomChaine(),
            hotel.getNom(),
            hotel.getRating(),
            hotel.getNbrChambre(),
            hotel.getNumero(),
            hotel.getRue(),
            hotel.getVille(),
            hotel.getProvince(),
            hotel.getPays(),
            hotel.getCodePostal()
        );
    }

}
