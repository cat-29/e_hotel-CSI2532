package com.projet.e_hotel.Classes.mapper;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.projet.e_hotel.Classes.dto.ActiveReservationDTO;
import com.projet.e_hotel.Classes.dto.ClientDTO;
import com.projet.e_hotel.Classes.dto.ClientReserveDTO;
import com.projet.e_hotel.Classes.dto.LoueChambreDTO;

public class ActiveReservationMapper {

    // Convert ActiveReservation JPA Entity into ActiveReservationDTO
    public static List<ActiveReservationDTO> mapToActiveReservationDTOList(List<ClientReserveDTO> clientReserve,
            List<ClientDTO> client, List<LoueChambreDTO> loueChambreDTOs) {
        List<ActiveReservationDTO> listDTOs = new ArrayList<>();

        for (int i = 0; i < client.size(); i++) {
            // check if found a location for the specific reservation, otherwise return null
            if (loueChambreDTOs.get(i).getIdClient() == null) {
                ActiveReservationDTO activeReservationDTO = new ActiveReservationDTO(
                        client.get(i).getId(),
                        client.get(i).getPrenom(),
                        client.get(i).getNomFamille(),
                        client.get(i).getNumero(),
                        client.get(i).getRue(),
                        client.get(i).getVille(),
                        client.get(i).getProvince(),
                        client.get(i).getPays(),
                        client.get(i).getCodePostal(),
                        clientReserve.get(i).getNumeroChambre(),
                        clientReserve.get(i).getIdHotel(),
                        clientReserve.get(i).getDateCheckin().toString(),
                        clientReserve.get(i).getDateCheckout().toString(),
                        clientReserve.get(i).getPrix(),
                        null,
                        clientReserve.get(i).getPrix(),
                        false,
                        null,
                        false);

                listDTOs.add(activeReservationDTO);
            } else {
                ActiveReservationDTO activeReservationDTO = new ActiveReservationDTO(
                        client.get(i).getId(),
                        client.get(i).getPrenom(),
                        client.get(i).getNomFamille(),
                        client.get(i).getNumero(),
                        client.get(i).getRue(),
                        client.get(i).getVille(),
                        client.get(i).getProvince(),
                        client.get(i).getPays(),
                        client.get(i).getCodePostal(),
                        clientReserve.get(i).getNumeroChambre(),
                        clientReserve.get(i).getIdHotel(),
                        clientReserve.get(i).getDateCheckin().toString(),
                        clientReserve.get(i).getDateCheckout().toString(),
                        clientReserve.get(i).getPrix(),
                        loueChambreDTOs.get(i).getIdEmploye(),
                        loueChambreDTOs.get(i).getMontantDu(),
                        loueChambreDTOs.get(i).getIsPaiementComplete(),
                        loueChambreDTOs.get(i).getDatePaiementComplete(),
                        true

                );
                listDTOs.add(activeReservationDTO);
            }
        }
        return listDTOs;
    }

    
    // Convert ActiveReservationDTO into LoueChambreDTO JPA Entities
    public static LoueChambreDTO mapToLoueChambreDTO (ActiveReservationDTO activeReservationDTO, Date checkin, Date checkout) {
        return new LoueChambreDTO(
            activeReservationDTO.getNumeroChambre(),
            activeReservationDTO.getIdHotel(),
            activeReservationDTO.getIdClient(),
            activeReservationDTO.getIdEmploye(),
            checkin,
            checkout,
            activeReservationDTO.getMontantDu(),
            activeReservationDTO.getIsPaiementComplete(),
            activeReservationDTO.getDatePaiementComplete()
        );
    }
}
