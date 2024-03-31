package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Classes.dto.ClientDTO;
import com.projet.e_hotel.Classes.dto.EmployeDTO;

public class EmployeMapper {
    // Convert Employe JPA Entity into EmployeDTO
    public static EmployeDTO mapToEmployeDTO(Employe employe) {
        return new EmployeDTO(
                employe.getId(),
                employe.getPrenom(),
                employe.getNomFamille(),
                employe.getNumero(),
                employe.getRue(),
                employe.getVille(),
                employe.getProvince(),
                employe.getPays(),
                employe.getCodePostal(),
                employe.getRoleEmploye(),
                employe.getIdHotel());
    }

}
