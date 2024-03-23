package com.projet.e_hotel.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.Hotel;

public interface HotelRepository extends JpaRepository<Hotel,Integer> {
    
    Optional<Hotel> findById(Integer idHotel);
}
