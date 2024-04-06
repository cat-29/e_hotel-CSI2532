package com.projet.e_hotel.Classes.mapper;

import java.util.ArrayList;
import java.util.List;

import com.projet.e_hotel.Classes.Dommage;
import com.projet.e_hotel.Classes.SubiDommage;
import com.projet.e_hotel.Classes.dto.ChambreSubiDommageDTO;

public class ChambreSubiDommageMapper {

    // Convert JPA Entities into ChambreSubiDommageDTO
    public static ChambreSubiDommageDTO mapToChambreSubiDommageDTO(SubiDommage subiDommage, Dommage dommage) {
        return new ChambreSubiDommageDTO(
                subiDommage.getIdDommage(),
                subiDommage.getNumeroChambre(),
                subiDommage.getIdHotel(),
                dommage.getTypeDommage());
    }


    // Convert List of SubiDommage JPA Entity into a list of ChambreSubiDommageDTO
    public static List<ChambreSubiDommageDTO> mapToListOfChambreSubiDommageDTO(List<SubiDommage> subiDommage,
            List<Dommage> dommage) {

        List<ChambreSubiDommageDTO> listSubiDommageDTOs = new ArrayList<>();
        for (int i = 0; i < subiDommage.size(); i++) {
            ChambreSubiDommageDTO dto = new ChambreSubiDommageDTO(
                    subiDommage.get(i).getIdDommage(),
                    subiDommage.get(i).getNumeroChambre(),
                    subiDommage.get(i).getIdHotel(),
                    dommage.get(i).getTypeDommage());

            listSubiDommageDTOs.add(dto);
        }
        return listSubiDommageDTOs;
    }


    // Convert ChambreSubiDommageDTO into SubiDommage JPA Entity
    public static SubiDommage mapToSubiDommage(ChambreSubiDommageDTO dommageDTO, Integer idDommage) {
        return new SubiDommage(
            idDommage,
            dommageDTO.getNumeroChambre(),
            dommageDTO.getIdHotel()
        );
    }


    // Convert ChambreSubiDommageDTO into Dommage JPA Entity
    public static Dommage mapToDommage(ChambreSubiDommageDTO dommageDTO) {
        return new Dommage(dommageDTO.getTypeDommage());
    }
}
