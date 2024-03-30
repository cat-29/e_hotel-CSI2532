package com.projet.e_hotel.Classes.mapper;

import java.util.Date;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.EnregistreClient;
import com.projet.e_hotel.Classes.dto.EmployeAjouteLocationDTO;
import com.projet.e_hotel.Classes.dto.LoueChambreDTO;

public class EmployeAjouteLocationMapper {

    // Convert EmployeAjouteLocationDTO into LoueChambreDTO JPA Entities
    public static LoueChambreDTO mapToLoueChambreDTO(EmployeAjouteLocationDTO ajouteLocationDTO, Date checkin, Date checkout) {
        return new LoueChambreDTO(
                ajouteLocationDTO.getNumeroChambre(),
                ajouteLocationDTO.getIdHotel(),
                ajouteLocationDTO.getIdClient(),
                ajouteLocationDTO.getIdEmploye(),
                checkin,
                checkout,
                ajouteLocationDTO.getMontantDu(),
                false,
                null);
    }

    // Convert EmployeAjouteLocationDTO into EnregistreClient JPA Entities
    public static EnregistreClient mapToEnregistreClient(EmployeAjouteLocationDTO ajouteLocationDTO) {
        return new EnregistreClient(
                ajouteLocationDTO.getIdEmploye(),
                ajouteLocationDTO.getIdClient(),
                ajouteLocationDTO.getEmail(),
                new Date()
        );
    }

    // Convert EmployeAjouteLocationDTO into Client JPA Entity
    public static Client mapToClient(EmployeAjouteLocationDTO ajouteLocationDTO) {
        return new Client(
            ajouteLocationDTO.getIdClient(),
            ajouteLocationDTO.getPrenom(),
            ajouteLocationDTO.getNomFamille(),
            ajouteLocationDTO.getNumero(),
            ajouteLocationDTO.getRue(),
            ajouteLocationDTO.getVille(),
            ajouteLocationDTO.getProvince(),
            ajouteLocationDTO.getPays(),
            ajouteLocationDTO.getCodePostal()
        );
    }
}
