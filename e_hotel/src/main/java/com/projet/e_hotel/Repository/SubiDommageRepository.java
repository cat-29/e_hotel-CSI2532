package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projet.e_hotel.Classes.SubiDommage;
import com.projet.e_hotel.Classes.pk.SubiDommagePK;
import java.util.List;

public interface SubiDommageRepository extends JpaRepository<SubiDommage, SubiDommagePK> {
    
    List<SubiDommage> findAllByIdHotel(Integer idHotel);
}
