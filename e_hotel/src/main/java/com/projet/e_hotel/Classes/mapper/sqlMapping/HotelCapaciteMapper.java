package com.projet.e_hotel.Classes.mapper.sqlMapping;

import java.util.ArrayList;
import java.util.List;

import com.projet.e_hotel.Classes.dto.HotelCapaciteDto;

public class HotelCapaciteMapper {

    public static List<HotelCapaciteDto> mapToHotelCapaciteDtoObject(List<Object[]> row){
        List<HotelCapaciteDto> res = new ArrayList<>();

       
       int i = 0;

       while (i<row.size()){
           // Cette liste contient le nom de l'hotel et le nom d'une capacite. UNE CAPACITE
           Object[] listItem = row.get(i);  
           

           // Je vais enregistrer les capacites ici, les capacites d'un hotel specifique. SIMPLE,DOUBLE OU TRIPLE.
           ArrayList<String> capacites = new ArrayList<>();

           // Nom de l hotel, pour le comparer avec la liste suivante et d apres 

           String hotKeyName = (String)listItem[0];

           capacites.add((String)listItem[1]);

           HotelCapaciteDto itemFormatted = new HotelCapaciteDto(hotKeyName,capacites);
           res.add(itemFormatted);

           if (i!=row.size()-1){
               Object[] listItemNext = row.get(i+1);
               if (listItemNext[0].equals(hotKeyName)){
                   capacites.add((String)listItemNext[1]);

                   if (i+2 != row.size()){
                       Object[] listItemNextNext = row.get(i+2);
                       if(listItemNextNext[0].equals(hotKeyName)){
                           capacites.add((String)listItemNextNext[1]);
                           i = i+3;
                       }else{
                           i = i+2;
                       }
                   }else{
                       break;
                   }
                  
               }else{
                   i = i+1;
               }

           }else{
               break;
           }     
       }
       return res;
   }

}
