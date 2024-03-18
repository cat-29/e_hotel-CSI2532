package com.projet.e_hotel.Service;

import org.springframework.stereotype.Service;
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
 
}
