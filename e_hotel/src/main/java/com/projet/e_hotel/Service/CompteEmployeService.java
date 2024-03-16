package com.projet.e_hotel.Service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Repository.CompteEmployeRepository;
import com.projet.e_hotel.Repository.EmployeRepository;
// import com.projet.e_hotel.Repository.TravaillePourRepository;

@Service
public class CompteEmployeService {
    
    final CompteEmployeRepository compteEmployeRepository;
    final EmployeRepository employeRepository;
    // final TravaillePourRepository travaillePourRepository;

    @Autowired
    public CompteEmployeService(CompteEmployeRepository compteEmployeRepository, EmployeRepository employeRepository) {
        this.compteEmployeRepository = compteEmployeRepository;
        this.employeRepository = employeRepository;
    }

    public Employe getCompteEmploye (String email, String password) {
        // Optional<Employe> compteEmploye = this.employeRepository.findById(this.compteEmployeRepository.findByEmailAndPassword(email, password).get().getIdEmploye());

        // // Employe not found
        // if (!compteEmploye.isPresent()) {
        //     return compteEmploye.orElseThrow();
        // }

        // 
        return this.employeRepository.findById(this.compteEmployeRepository.findByEmailAndPassword(email, password).get().getIdEmploye()).orElseThrow();
    }
 
}
