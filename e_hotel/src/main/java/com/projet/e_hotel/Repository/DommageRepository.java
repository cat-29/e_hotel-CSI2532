package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.Dommage;
import java.util.List;


public interface DommageRepository extends JpaRepository<Dommage, Integer> {
    List<Dommage> findAllByIdDommage(Integer idDommage);
}
