package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.CompteClient;
import java.util.Optional;


public interface CompteClientRepository extends JpaRepository<CompteClient,Long> {
    
    Optional<CompteClient> findByEmailAndPassword(String email, String password);
}    