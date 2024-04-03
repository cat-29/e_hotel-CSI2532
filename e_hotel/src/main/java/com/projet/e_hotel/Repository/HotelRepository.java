package com.projet.e_hotel.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    Optional<Hotel> findById(Integer idHotel);

    List<Hotel> findAllByNomChaine(String nomChaine);

    List<Hotel> findAllByRating(Integer rating);

    List<Hotel> findAllByNbrChambreGreaterThanEqual(Integer nbrChambre);

    List<Hotel> findAllByNbrChambreLessThanEqual(Integer nbrChambre);

    List<Hotel> findAllByNbrChambreBetween(Integer chambreMin, Integer chambreMax);

    List<Hotel> findHotelsByNomChaine(String nomChaine);

    Hotel findByNomChaine(String nomChaine);

    // Hotel findByIdHotel(Integer id);

    // Pour la vue 2
    @Query(value = " select * from capacite_chambres_tous_hotels", nativeQuery = true)
    List<Object[]> getCapaciteAllRooms();
}
