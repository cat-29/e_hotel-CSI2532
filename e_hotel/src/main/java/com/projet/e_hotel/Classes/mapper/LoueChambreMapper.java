package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Classes.dto.LoueChambreDTO;

public class LoueChambreMapper {

    // Convert LoueChambre JPA Entity into LoueChambreDTO
    public static LoueChambreDTO mapToLoueChambreDTO(LoueChambre loueChambre) {
        if (loueChambre == null) {
            return new LoueChambreDTO();
        }
        return new LoueChambreDTO(
                loueChambre.getNumeroChambre(),
                loueChambre.getIdHotel(),
                loueChambre.getIdClient(),
                loueChambre.getIdEmploye(),
                loueChambre.getDateCheckin(),
                loueChambre.getDateCheckout(),
                loueChambre.getMontantDu(),
                loueChambre.getIsPaiementComplete(),
                loueChambre.getDatePaiementComplete());
    }

    
    // Convert LouechambreDTO into Louechambre JPA Entity
    public static LoueChambre mapTLoueChambre(LoueChambreDTO loueChambreDTO) {
        return new LoueChambre(
                loueChambreDTO.getNumeroChambre(),
                loueChambreDTO.getIdHotel(),
                loueChambreDTO.getIdClient(), 
                loueChambreDTO.getIdEmploye(), 
                loueChambreDTO.getDateCheckin(),
                loueChambreDTO.getDateCheckout(), 
                loueChambreDTO.getMontantDu(), 
                loueChambreDTO.getIsPaiementComplete(),
                loueChambreDTO.getDatePaiementComplete());
    }

}