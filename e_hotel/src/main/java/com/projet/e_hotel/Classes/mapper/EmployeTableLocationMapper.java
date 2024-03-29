package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Classes.dto.EmployeTableLocationDTO;

public class EmployeTableLocationMapper {

    // Convert LoueChambre and Client JPA Entities into EmployeTableLocationDTO
    public static EmployeTableLocationDTO mapToEmployeTableLocationDTO(LoueChambre loueChambre, Client client) {
        return new EmployeTableLocationDTO(loueChambre.getIdClient(),
                loueChambre.getIdEmploye(),
                client.getPrenom(),
                client.getNomFamille(),
                loueChambre.getNumeroChambre(),
                loueChambre.getIdHotel(),
                loueChambre.getDateCheckin(),
                loueChambre.getDateCheckout(),
                loueChambre.getMontantDu(),
                loueChambre.getIsPaiementComplete(),
                loueChambre.getDatePaiementComplete());
    }

}
