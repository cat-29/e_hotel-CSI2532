package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.AjoutHotel;

@Repository
@EnableJpaRepositories
public interface AjoutHotelRepository extends JpaRepository<AjoutHotel, Integer> {
    AjoutHotel findByNomChaine(String nomChaine);
}