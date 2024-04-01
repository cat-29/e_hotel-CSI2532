package com.projet.e_hotel.Classes.dto;


import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class HotelCapaciteDto {
    private String nom_hotel;
    private ArrayList<String> listeCapacites;

    public HotelCapaciteDto(HotelCapaciteDto adto){
        this.nom_hotel = adto.nom_hotel;
        this.listeCapacites = adto.listeCapacites;
    }



}
