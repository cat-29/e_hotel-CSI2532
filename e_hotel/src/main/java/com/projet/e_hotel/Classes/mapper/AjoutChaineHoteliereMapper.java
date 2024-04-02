package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.AjoutChaineHoteliere;
import com.projet.e_hotel.Classes.ChaineHoteliere;
import com.projet.e_hotel.Classes.dto.AjoutChaineHoteliereDTO;
import com.projet.e_hotel.Classes.dto.ChaineHoteliereDTO;

public class AjoutChaineHoteliereMapper {
    // Convert ChaineHoteliere JPA Entity into ChaineHoteliereDTO
    public static AjoutChaineHoteliereDTO mapToAjoutChaineHoteliereDTO(AjoutChaineHoteliere ajoutChaineHoteliere) {
        return new AjoutChaineHoteliereDTO(
                ajoutChaineHoteliere.getNomChaine(),
                ajoutChaineHoteliere.getNbrHotel(),
                ajoutChaineHoteliere.getNumero(),
                ajoutChaineHoteliere.getRue(),
                ajoutChaineHoteliere.getVille(),
                ajoutChaineHoteliere.getProvince(),
                ajoutChaineHoteliere.getPays(),
                ajoutChaineHoteliere.getCodePostal());
    }

    public static AjoutChaineHoteliere mapToAjoutChaineHoteliere(AjoutChaineHoteliereDTO ajoutChaineDto) {
        return new AjoutChaineHoteliere(
                ajoutChaineDto.getNomChaine(),
                ajoutChaineDto.getNbrHotel(),
                ajoutChaineDto.getNumero(),
                ajoutChaineDto.getRue(),
                ajoutChaineDto.getVille(),
                ajoutChaineDto.getProvince(),
                ajoutChaineDto.getPays(),
                ajoutChaineDto.getCodePostal());
    }
}
