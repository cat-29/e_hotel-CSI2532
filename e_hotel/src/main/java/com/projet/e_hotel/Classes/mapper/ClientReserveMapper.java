package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Classes.dto.ClientReserveDTO;

public class ClientReserveMapper {
    
    // Convert ClientReserve JPA Entity into ClientReserveDTO
    public static ClientReserveDTO mapToClientReserveDTO(ClientReserve cReserve) {
        ClientReserveDTO cDto = new ClientReserveDTO(
            cReserve.getIdClient(),
            cReserve.getNumeroChambre(),
            cReserve.getIdHotel(), 
            cReserve.getDateCheckin(), 
            cReserve.getDateCheckout(), 
            cReserve.getPrix()
        );
        return cDto;
    }
}
