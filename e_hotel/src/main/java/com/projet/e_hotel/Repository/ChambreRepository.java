package com.projet.e_hotel.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.pk.ChambrePK;

@Repository
public interface ChambreRepository extends JpaRepository<Chambre, ChambrePK> {
    
    Optional<List<Chambre>> findByIdHotel(Integer idHotel);

    Optional<List<Chambre>> findByIdHotelAndCapaciteChambreAndVueChambre(Integer idHotel, String capaciteChambre, String vueChambre);

    Chambre findByNumeroChambre(Integer numeroChambre);

    List<Chambre> findAllByNumeroChambre(Integer numeroChambre);
}
