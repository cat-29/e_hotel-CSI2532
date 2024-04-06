package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChaineHoteliereDTO {
    private String nomChaine;
    private Integer nbrHotel;
    private Integer numero;
    private String rue;
    private String ville;
    private String province;
    private String pays;
    private String codePostal;
}
