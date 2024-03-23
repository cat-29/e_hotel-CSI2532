package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.EnregistreClient;
import com.projet.e_hotel.Classes.dto.EmployeAjouteLocationDTO;
import com.projet.e_hotel.Classes.dto.LoueChambreDTO;

public class EmployeAjouteLocationMapper {

    // Convert EmployeAjouteLocationDTO into LoieChambreDTO JPA Entities
    public static LoueChambreDTO mapToLoueChambreDTO(EmployeAjouteLocationDTO ajouteLocationDTO) {
        return new LoueChambreDTO(
                ajouteLocationDTO.getNumeroChambre(),
                ajouteLocationDTO.getHotel(),
                ajouteLocationDTO.getNas(),
                ajouteLocationDTO.getNasEmploye(),
                ajouteLocationDTO.getDateCheckin(),
                ajouteLocationDTO.getDateCheckout(),
                ajouteLocationDTO.getMontantDu(),
                false,
                null);
    }

    // Convert EmployeAjouteLocationDTO into EnregistreClient JPA Entities
    public static EnregistreClient mapToEnregistreClient(EmployeAjouteLocationDTO ajouteLocationDTO) {
        return new EnregistreClient(
                ajouteLocationDTO.getNasEmploye(),
                ajouteLocationDTO.getNas(),
                ajouteLocationDTO.getEmail(),
                ajouteLocationDTO.getDateCheckin()
        );
    }

    public static Client mapToClient(EmployeAjouteLocationDTO ajouteLocationDTO) {
        return new Client(
            ajouteLocationDTO.getNas(),
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
