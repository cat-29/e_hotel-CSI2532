package com.projet.e_hotel.Classes.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EnregistreClientDTO {
    private String idEmploye;
    private String idClient;
    private String email;
    private Date dateEnregistrement;
}
