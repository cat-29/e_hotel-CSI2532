package com.projet.e_hotel.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Classes.pk.ClientReservePK;

public interface ClientReserveRepository extends JpaRepository<ClientReserve,ClientReservePK> {

    List<ClientReserve> findAllByIdHotel(Integer idHotel);
    
} 
