package com.projet.e_hotel.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Dommage;
import com.projet.e_hotel.Classes.SubiDommage;
import com.projet.e_hotel.Repository.DommageRepository;
import com.projet.e_hotel.Repository.SubiDommageRepository;

@Service
public class SubiDommageService {
    @Autowired
    private SubiDommageRepository subiDommageRepository;
    @Autowired
    private DommageRepository dommageRepository;

    public Optional<Dommage> findByTypeDommage(String typedommage) {
        return dommageRepository.findByTypeDommage(typedommage);
    }

    public boolean isDommageInDatabaseAlready(Dommage dommage) {
        Optional<Dommage> isDommage = findByTypeDommage(dommage.getTypeDommage());
        if (isDommage.isPresent()) {
            return true;
        }

        // We need to save the user's dommage in database;
        return false;
    }

    public void saveDommage(Dommage dommage) {
        dommageRepository.save(dommage);
    }

    public SubiDommage saveSubiDommage(SubiDommage subiDommage) {
        return subiDommageRepository.save(subiDommage);
    }

    public Integer getDommageId(Dommage dommage) {
        return dommageRepository.findByTypeDommage(dommage.getTypeDommage()).get().getIdDommage();
    }
}
