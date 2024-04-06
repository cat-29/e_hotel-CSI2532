package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.AjoutChaineHoteliere;
import com.projet.e_hotel.Repository.AjoutChaineHoteliereRepository;

@Service
public class AjoutChaineHoteliereService {
    @Autowired
    private AjoutChaineHoteliereRepository ajoutChaineHoteliereRepository;

    public List<AjoutChaineHoteliere> getAllAjoutChaineHoteliere() {
        return ajoutChaineHoteliereRepository.findAll();
    }

    public void saveNewChaine(AjoutChaineHoteliere ajoutChaineHoteliere) {
        ajoutChaineHoteliereRepository.save(ajoutChaineHoteliere);
    }

}
