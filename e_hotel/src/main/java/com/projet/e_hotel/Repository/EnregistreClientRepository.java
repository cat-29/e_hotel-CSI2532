package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projet.e_hotel.Classes.EnregistreClient;
import com.projet.e_hotel.Classes.pk.EnregistreClientPK;

public interface EnregistreClientRepository extends JpaRepository<EnregistreClient,EnregistreClientPK> {
    
}
