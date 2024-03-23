package com.projet.e_hotel.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Classes.pk.ClientReservePK;

@Repository
public interface ClientReserveRepository extends JpaRepository<ClientReserve,ClientReservePK> {

    List<ClientReserve> findAllByIdHotel(Integer idHotel);
    
    Optional<List<ClientReserve>> findAllByNumeroChambreAndIdHotel(Integer numeroChambre, Integer idHotel);

    Optional<ClientReserve> findByNumeroChambreAndIdHotel(Integer numeroChambre, Integer idHotel);

    Optional<ClientReserve> findByIdHotel(Integer idHotel);
} 
