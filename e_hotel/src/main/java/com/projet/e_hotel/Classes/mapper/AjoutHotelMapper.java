package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.dto.AjoutHotelDTO;
import com.projet.e_hotel.Classes.Hotel;

public class AjoutHotelMapper {

    // Convert AjoutHotelDTO into Hotel JPA Entity
    public static Hotel mapToAjoutHotel(AjoutHotelDTO ajoutHotelDTO, String nomChaine) {
        return new Hotel(
                nomChaine,
                ajoutHotelDTO.getNom(),
                ajoutHotelDTO.getRating(),
                ajoutHotelDTO.getNbrChambre(),
                ajoutHotelDTO.getNumero(),
                ajoutHotelDTO.getRue(),
                ajoutHotelDTO.getVille(),
                ajoutHotelDTO.getProvince(),
                ajoutHotelDTO.getPays(),
                ajoutHotelDTO.getCodePostal());
    }
}
