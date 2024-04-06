package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.ChaineHoteliere;

@Repository
public interface ChaineHoteliereRepository extends JpaRepository<ChaineHoteliere, String> {
    ChaineHoteliere findByNomChaine(String nomChaine);

}
