package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AjoutLocationChambreDTO {
    private Integer numeroChambre;
    private Integer idHotel;
    private Double prix;
    private String capaciteChambre;
    private String vueChambre;
    private Boolean capaciteAEtendre;
    private Integer errorType;
}
