package com.projet.e_hotel.Classes.mapper;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Classes.dto.ChambreDTO;
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

    public static Employe mapToEmploye(EmployeDTO employeDTO, Integer idHotel) {
        return new Employe(
                employeDTO.getId(),
                employeDTO.getPrenom(),
                employeDTO.getNomFamille(),
                employeDTO.getNumero(),
                employeDTO.getRue(),
                employeDTO.getVille(),
                employeDTO.getProvince(),
                employeDTO.getPays(),
                employeDTO.getCodePostal(),
                employeDTO.getRoleEmploye(),
                idHotel);
    }

}
