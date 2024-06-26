package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Repository.EmployeRepository;

@Service
public class EmployeService {
    @Autowired
    private EmployeRepository employeRepository;

    public List<Employe> getEmployesFromHotel(Integer id) {
        return employeRepository.findAllByIdHotel(id);
    }

    public Employe saveNewEmploye(Employe employe) {
        return employeRepository.save(employe);
    }

    public Employe updateEmploye(Employe employe) {
        Employe existingEmploye = employeRepository.findById(employe.getId())
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + employe.getId()));
        ;

        existingEmploye.setPrenom(employe.getPrenom());
        existingEmploye.setNomFamille(employe.getNomFamille());
        existingEmploye.setNumero(employe.getNumero());
        existingEmploye.setRue(employe.getRue());
        existingEmploye.setVille(employe.getVille());
        existingEmploye.setProvince(employe.getProvince());
        existingEmploye.setPays(employe.getPays());
        existingEmploye.setCodePostal(employe.getCodePostal());
        existingEmploye.setRoleEmploye(employe.getRoleEmploye());
        existingEmploye.setIdHotel(employe.getIdHotel());
        return employeRepository.save(existingEmploye);
    }

    public void deleteEmploye(String id) {
        Employe existingEmploye = employeRepository.findById(id).get();
        employeRepository.delete(existingEmploye);
    }
}
