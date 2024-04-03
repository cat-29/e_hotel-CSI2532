package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Classes.dto.AjoutHotelDTO;
import com.projet.e_hotel.Classes.dto.ChambreDTO;

public class ChambreMapper {

    // Convert Chambre JPA Entity into ChambreDTO
    public static ChambreDTO mapToChambreDTO(Chambre chambre) {
        return new ChambreDTO(
                chambre.getNumeroChambre(),
                chambre.getIdHotel(),
                chambre.getPrix(),
                chambre.getCapaciteChambre(),
                chambre.getVueChambre(),
                chambre.getCapaciteAEtendre());
    }

    public static Chambre mapToChambre(ChambreDTO chambreDTO, Integer idHotel) {
        return new Chambre(
                chambreDTO.getNumeroChambre(),
                idHotel,
                chambreDTO.getPrix(),
                chambreDTO.getCapaciteChambre(),
                chambreDTO.getVueChambre(),
                chambreDTO.getCapaciteAEtendre());
    }

    public static Chambre mapToChambre(ChambreDTO chambreDTO) {
        return new Chambre(
                chambreDTO.getNumeroChambre(),
                chambreDTO.getIdHotel(),
                chambreDTO.getPrix(),
                chambreDTO.getCapaciteChambre(),
                chambreDTO.getVueChambre(),
                chambreDTO.getCapaciteAEtendre());
    }
}
