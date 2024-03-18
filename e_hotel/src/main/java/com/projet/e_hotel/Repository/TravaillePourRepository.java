package com.projet.e_hotel.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projet.e_hotel.Classes.TravaillePour;
import com.projet.e_hotel.Classes.pk.TravaillePourPK;

public interface TravaillePourRepository extends JpaRepository<TravaillePour,TravaillePourPK>{
    
    List<TravaillePour> findAllByTravaillePourPK(TravaillePourPK travaillePourPK);
    TravaillePour findByTravaillePourPK_employe(String employe);
}
