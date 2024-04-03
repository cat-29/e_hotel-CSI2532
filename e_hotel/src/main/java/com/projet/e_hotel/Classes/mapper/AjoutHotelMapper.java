package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.dto.AjoutHotelDTO;
import com.projet.e_hotel.Classes.AjoutHotel;
import com.projet.e_hotel.Classes.Hotel;

public class AjoutHotelMapper {

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

    // public static AjoutHotelDTO mapToChambreSubiDommageDTO(AjoutHotel ajoutHotel,
    // ChaineHoteliere chaineHoteliere) {
    // return new ChambreSubiDommageDTO(
    // subiDommage.getIdDommage(),
    // subiDommage.getNumeroChambre(),
    // subiDommage.getIdHotel(),
    // dommage.getTypeDommage());
    // }

    // return new AjoutHotel(
    // ajoutHotelDto.getId(),
    // ajoutHotelDto.getNomChaine(),
    // ajoutHotelDto.getNom(),
    // ajoutHotelDto.getRating(),
    // ajoutHotelDto.getNbrChambre(),
    // ajoutHotelDto.getNumero(),
    // ajoutHotelDto.getRue(),
    // ajoutHotelDto.getVille(),
    // ajoutHotelDto.getProvince(),
    // ajoutHotelDto.getPays(),
    // ajoutHotelDto.getCodePostal());
    // }
}
