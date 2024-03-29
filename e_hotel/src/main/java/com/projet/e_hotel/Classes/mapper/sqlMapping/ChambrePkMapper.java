package com.projet.e_hotel.Classes.mapper.sqlMapping;

import java.util.List;

import com.projet.e_hotel.Classes.dto.ChambrePKDTO;

public class ChambrePkMapper {
    
    public static ChambrePKDTO mapToChambrePKObject(Object[] row){
        ChambrePKDTO chambrePKM = new ChambrePKDTO((Integer) row[0],(Integer) row[1]);
        return chambrePKM;
    }

    public static ChambrePKDTO mapToEmptyObject(List<Object[]> row){
        ChambrePKDTO chambrePKM = new ChambrePKDTO(0,0);
        return chambrePKM;
    }
    
}
