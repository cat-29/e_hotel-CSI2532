package com.projet.e_hotel.Classes.mapper.sqlMapping;

import com.projet.e_hotel.Classes.dto.ProvinceCountAvDTO;

public class ProvinceCountAvMapper {
    public static ProvinceCountAvDTO mapToProvinceCountDtoObject(Object[] row){
        ProvinceCountAvDTO disponibilite = new ProvinceCountAvDTO((String) row[0],(Long) row[1]);
        return disponibilite;
    }

}
