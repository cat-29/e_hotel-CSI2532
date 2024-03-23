package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.ChaineHoteliere;
import java.util.List;


@Repository
@EnableJpaRepositories
public interface ChaineHoteliereRepository extends JpaRepository<ChaineHoteliere,String> {   
    List<ChaineHoteliere> findByNomChaine(String nomChaine);
}