package com.projet.e_hotel.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.CompteEmploye;

import java.util.Optional;


public interface CompteEmployeRepository extends JpaRepository<CompteEmploye,Long> {
    
    Optional<CompteEmploye> findByEmailAndPassword(String email, String password);

    Optional<CompteEmploye> findByIdEmploye(String idEmploye);
}    