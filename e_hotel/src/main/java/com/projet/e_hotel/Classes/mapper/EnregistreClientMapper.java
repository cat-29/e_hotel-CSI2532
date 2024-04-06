package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.EnregistreClient;
import com.projet.e_hotel.Classes.dto.EnregistreClientDTO;

public class EnregistreClientMapper {
    
    // Convert EnregistreClient JPA Entity into EnregistreClientDTO
    public static EnregistreClientDTO mapToEnregistreClientDTO(EnregistreClient enregistreClient) {
        return new EnregistreClientDTO(
            enregistreClient.getIdEmploye(),
            enregistreClient.getIdClient(),
            enregistreClient.getEmail(),
            enregistreClient.getDateEnregistrement()
        );
    }
}
