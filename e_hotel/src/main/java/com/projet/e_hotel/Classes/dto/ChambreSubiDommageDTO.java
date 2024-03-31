package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChambreSubiDommageDTO {
    private Integer idDommage;
    private Integer numeroChambre;
    private Integer idHotel;
    private String typeDommage;
}
