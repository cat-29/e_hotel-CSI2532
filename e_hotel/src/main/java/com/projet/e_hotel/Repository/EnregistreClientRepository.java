package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projet.e_hotel.Classes.EnregistreClient;
import java.util.List;

public interface EnregistreClientRepository extends JpaRepository<EnregistreClient, Integer> {
    List<EnregistreClient> findByIdEmploye(String idEmploye);
}
