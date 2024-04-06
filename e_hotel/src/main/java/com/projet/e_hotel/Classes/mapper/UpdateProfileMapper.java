package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.CompteClient;
import com.projet.e_hotel.Classes.CompteEmploye;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Classes.dto.UpdateProfileDTO;

public class UpdateProfileMapper {

    // Convert UpdateProfileDTO into CompteEmploye JPA Entity
    public static CompteEmploye mapToCompteEmploye(UpdateProfileDTO dto) {
        return new CompteEmploye(
                dto.getNas(),
                dto.getEmail(),
                dto.getPassword());
    }


    // Convert UpdateProfileDTO into Employe JPA Entity
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


    // Convert UpdateProfileDTO into Client JPA Entity
    public static Client mapToClient(UpdateProfileDTO dto) {
        return new Client(
            dto.getNas(),
            dto.getPrenom(),
            dto.getNomFamille(),
            dto.getNumero(),
            dto.getRue(),
            dto.getVille(),
            dto.getProvince(),
            dto.getPays(),
            dto.getCodePostal()
        );
    }


    // Convert UpdateProfileDTO into CompteClient JPA Entity
    public static CompteClient mapToCompteClient(UpdateProfileDTO dto) {
        return new CompteClient(
            dto.getNas(),
            dto.getEmail(),
            dto.getPassword()
        );
    }
}
