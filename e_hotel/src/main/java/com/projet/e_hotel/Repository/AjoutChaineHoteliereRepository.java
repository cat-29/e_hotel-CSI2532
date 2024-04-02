package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.AjoutChaineHoteliere;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface AjoutChaineHoteliereRepository extends JpaRepository<AjoutChaineHoteliere, String> {
    List<AjoutChaineHoteliere> findByNomChaine(String nomChaine);
}