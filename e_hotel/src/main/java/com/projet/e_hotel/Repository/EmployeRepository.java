package com.projet.e_hotel.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projet.e_hotel.Classes.Employe;

public interface EmployeRepository extends JpaRepository<Employe, String> {

    Optional<Employe> findById(String id);

    List<Employe> findAllByIdHotel(Integer idHotel);
}
