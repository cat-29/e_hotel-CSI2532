package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.ChaineHoteliere;
import com.projet.e_hotel.Repository.ChaineHoteliereRepository;

@Service
public class ChaineHoteliereService {
    @Autowired
    private ChaineHoteliereRepository chaineHoteliereRepository;

    public List<ChaineHoteliere> getAllChaineHoteliere() {
        return chaineHoteliereRepository.findAll();
    }

    public ChaineHoteliere findByNomChaine(String nomChaine) {
        return chaineHoteliereRepository.findByNomChaine(nomChaine);
    }

    public ChaineHoteliere updateChaine(ChaineHoteliere chaineHoteliere) {
        // Find chaine info, if exists
        ChaineHoteliere exisitingChaine = chaineHoteliereRepository.findByNomChaine(chaineHoteliere.getNomChaine());
        exisitingChaine.setNomChaine(chaineHoteliere.getNomChaine());
        exisitingChaine.setNbrHotel(chaineHoteliere.getNbrHotel());
        exisitingChaine.setNumero(chaineHoteliere.getNumero());
        exisitingChaine.setRue(chaineHoteliere.getRue());
        exisitingChaine.setVille(chaineHoteliere.getVille());
        exisitingChaine.setProvince(chaineHoteliere.getProvince());
        exisitingChaine.setPays(chaineHoteliere.getPays());
        exisitingChaine.setCodePostal(chaineHoteliere.getCodePostal());
        // Update the compte employe information
        return chaineHoteliereRepository.save(exisitingChaine);
    }

    public void deleteChaine(String nomChaine) {
        // Find chaine info, if exists
        ChaineHoteliere exisitingChaine = chaineHoteliereRepository.findByNomChaine(nomChaine);
        chaineHoteliereRepository.delete(exisitingChaine);
    }

    public ChaineHoteliere getChaineInfo(String nomChaine) {
        return chaineHoteliereRepository.findByNomChaine(nomChaine);
    }

}
