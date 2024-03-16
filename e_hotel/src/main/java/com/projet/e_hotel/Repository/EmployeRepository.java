package com.projet.e_hotel.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.Employe;
// import com.projet.e_hotel.Classes.TravaillePour;

// public interface EmployeRepository extends JpaRepository<Employe,Integer>{
    public interface EmployeRepository extends JpaRepository<Employe,String>{

        // List<TravaillePour> findByIdHotel(Integer idHotel);
        Optional<Employe> findById(String id);
}
