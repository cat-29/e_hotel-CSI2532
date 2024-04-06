package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChambrePKDTO {
    private Integer numeroChambre;
    private Integer id_hotel;

    public ChambrePKDTO(ChambrePKDTO dto){
        numeroChambre = dto.numeroChambre;
        id_hotel = dto.id_hotel;
    }
}
