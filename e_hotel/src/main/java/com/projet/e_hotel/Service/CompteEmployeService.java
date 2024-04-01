package com.projet.e_hotel.Service;

import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.CompteEmploye;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Repository.CompteEmployeRepository;
import com.projet.e_hotel.Repository.EmployeRepository;

@Service
public class CompteEmployeService {
    
    final CompteEmployeRepository compteEmployeRepository;
    final EmployeRepository employeRepository;

    public CompteEmployeService(CompteEmployeRepository compteEmployeRepository, EmployeRepository employeRepository) {
        this.compteEmployeRepository = compteEmployeRepository;
        this.employeRepository = employeRepository;
    }

    public Employe getCompteEmploye (String email, String password) {
        return this.employeRepository.findById(this.compteEmployeRepository.findByEmailAndPassword(email, password).get().getIdEmploye()).orElseThrow();
    }

    public CompteEmploye findCompteEmploye(String nas) {
        return this.compteEmployeRepository.findByIdEmploye(nas).get();
    }

    public Employe findEmploye(String nas) {
        return this.employeRepository.findById(nas).get();
    }
 
    public CompteEmploye updateCompte(CompteEmploye compteEmploye) {
        
        // Find compte employe info, if exists
        CompteEmploye exisitingCompte = compteEmployeRepository.findByIdEmploye(compteEmploye.getIdEmploye())
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + compteEmploye.getIdEmploye()));
        
        // set values to be saved later on
        exisitingCompte.setEmail(compteEmploye.getEmail());
        exisitingCompte.setPassword(compteEmploye.getPassword());

        // Update the compte employe information
        return compteEmployeRepository.save(exisitingCompte);
    }

    public Employe updateProfileEmploye(Employe employe) {

        // Find employe information, if exists
        Employe existingEmploye = employeRepository.findById(employe.getId())
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + employe.getId()));
        
        // set values to be saved later on
        existingEmploye.setPrenom(employe.getPrenom());
        existingEmploye.setNomFamille(employe.getNomFamille());
        existingEmploye.setNumero(employe.getNumero());
        existingEmploye.setRue(employe.getRue());
        existingEmploye.setVille(employe.getVille());
        existingEmploye.setProvince(employe.getProvince());
        existingEmploye.setPays(employe.getPays());
        existingEmploye.setCodePostal(employe.getCodePostal());

        // Update the employe information
        return employeRepository.save(existingEmploye);
    }
}
