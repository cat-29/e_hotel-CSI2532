package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.Compte;


@Repository
public interface CompteRepository extends JpaRepository<Compte,String> {
}
