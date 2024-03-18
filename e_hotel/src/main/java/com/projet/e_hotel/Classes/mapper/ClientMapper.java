package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.dto.ClientDTO;

public class ClientMapper {
    
    // Convert Client JPA Entity into ClientDTO
    public static ClientDTO mapToClientDTO(Client client) {
        ClientDTO clientDTO = new ClientDTO(
            client.getId(),
            client.getPrenom()  ,
            client.getNomFamille(),
            client.getNumero(),
            client.getRue(),
            client.getVille(),
            client.getProvince(),
            client.getPays(),
            client.getCodePostal()
        );

        return clientDTO;
    }
}
