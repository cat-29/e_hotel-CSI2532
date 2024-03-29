package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.ChaineHoteliere;
import com.projet.e_hotel.Classes.dto.ChaineHoteliereDTO;

public class ChaineHoteliereMapper {
    // Convert ChaineHoteliere JPA Entity into ChaineHoteliereDTO
    public static ChaineHoteliereDTO mapToChaineHoteliereDTO(ChaineHoteliere chaineHoteliere) {
        return new ChaineHoteliereDTO(
                chaineHoteliere.getNomChaine(),
                chaineHoteliere.getNbrHotel(),
                chaineHoteliere.getNumero(),
                chaineHoteliere.getRue(),
                chaineHoteliere.getVille(),
                chaineHoteliere.getProvince(),
                chaineHoteliere.getPays(),
                chaineHoteliere.getCodePostal());
    }
}
