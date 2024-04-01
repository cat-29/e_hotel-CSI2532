package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.CompteEmploye;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Classes.dto.UpdateProfileDTO;

public class UpdateProfileMapper {

    public static CompteEmploye mapToCompteEmploye(UpdateProfileDTO dto) {
        return new CompteEmploye(
                dto.getNas(),
                dto.getEmail(),
                dto.getPassword());
    }

    public static Employe mapToEmploye(UpdateProfileDTO dto) {
        return new Employe(
                dto.getNas(),
                dto.getPrenom(),
                dto.getNomFamille(),
                dto.getNumero(),
                dto.getRue(),
                dto.getVille(),
                dto.getProvince(),
                dto.getPays(),
                dto.getCodePostal());
    }
}