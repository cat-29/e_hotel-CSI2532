package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.CompteEmploye;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Classes.EnregistreClient;
import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Repository.CompteEmployeRepository;
import com.projet.e_hotel.Repository.EmployeRepository;
import com.projet.e_hotel.Repository.EnregistreClientRepository;
import com.projet.e_hotel.Repository.LoueChambreRepository;

@Service
public class EmployeService {
    @Autowired
    private EmployeRepository employeRepository;
    @Autowired
    private LoueChambreRepository loueChambreRepository;
    @Autowired
    private EnregistreClientRepository enregistreClientRepository;
    @Autowired
    private CompteEmployeRepository compteEmployeRepository;

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
        // existingEmploye.setId(employe.getId());
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
        System.out.println("DELETING EMPLOYEE WITH ID " + id);
        Employe existingEmploye = employeRepository.findById(id).get();
        employeRepository.delete(existingEmploye);
        System.out.println("Employee " + id + " deleted.");
    }
}
