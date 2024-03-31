package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor


public class ProvinceCountAvDTO {
    private String province;
    private Long count;

    public ProvinceCountAvDTO(ProvinceCountAvDTO dto){
        province = dto.province;
        count = dto.count;
    }

}
