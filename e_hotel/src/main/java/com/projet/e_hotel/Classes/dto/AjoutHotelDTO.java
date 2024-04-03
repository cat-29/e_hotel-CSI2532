package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AjoutHotelDTO {
    private Integer id;
    private String nomChaine;
    private String nom;
    private Integer rating;
    private Integer nbrChambre;
    private Integer numero;
    private String rue;
    private String ville;
    private String province;
    private String pays;
    private String codePostal;
}
