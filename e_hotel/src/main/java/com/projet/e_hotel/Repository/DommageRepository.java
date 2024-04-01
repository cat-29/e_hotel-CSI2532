package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.Dommage;
import java.util.List;
import java.util.Optional;


public interface DommageRepository extends JpaRepository<Dommage, Integer> {
    List<Dommage> findAllByIdDommage(Integer idDommage);

    Optional<Dommage> findByTypeDommage(String typeDommage);
}
