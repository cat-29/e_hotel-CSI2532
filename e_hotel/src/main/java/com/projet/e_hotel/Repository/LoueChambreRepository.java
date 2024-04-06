package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Classes.pk.LoueChambrePK;
import java.util.Optional;
import java.util.Date;
import java.util.List;

public interface LoueChambreRepository extends JpaRepository<LoueChambre, LoueChambrePK> {
    Optional<LoueChambre> findByIdClientAndDateCheckinAndDateCheckout(String idClient, Date dateCheckin,
            Date dateCheckout);

    Optional<LoueChambre> findByIdClientAndIdHotelAndDateCheckinAndDateCheckout(String idClient, Integer idHotel,
            Date dateCheckin, Date dateCheckout);

    Optional<List<LoueChambre>> findAllByNumeroChambreAndIdHotel(Integer numeroChambre, Integer idHotel);

    Optional<LoueChambre> findByNumeroChambreAndIdHotel(Integer numeroChambre, Integer idHotel);

    List<LoueChambre> findAllByIdHotel(Integer idHotel);

    List<LoueChambre> findByIdEmploye(String idEmploye);
}
