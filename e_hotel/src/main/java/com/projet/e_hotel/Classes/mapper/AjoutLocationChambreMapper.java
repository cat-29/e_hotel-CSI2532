package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.dto.AjoutLocationChambreDTO;

public class AjoutLocationChambreMapper {

    // Convert Chambre JPA Entity into AjoutLocationChambreDTO
    public static AjoutLocationChambreDTO mapToAjoutLocationChambreDTO(Chambre chambre, Integer errorType) {
        return new AjoutLocationChambreDTO(
            chambre.getNumeroChambre(),
            chambre.getIdHotel(),
            chambre.getPrix(),
            chambre.getCapaciteChambre(),
            chambre.getVueChambre(),
            chambre.getCapaciteAEtendre(),
            errorType);
    }

    // Convert Chambre JPA Entity into AjoutLocationChambreDTO
    public static AjoutLocationChambreDTO chambreNullmapToAjoutLocationChambreDTO(Chambre chambre, Integer errorType) {
        return new AjoutLocationChambreDTO(
            null,
            null,
            null,
            null,
            null,
            null,
            errorType);
    }
}
