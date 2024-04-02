package com.projet.e_hotel.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.AjoutChaineHoteliere;
import com.projet.e_hotel.Classes.ChaineHoteliere;
import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Classes.dto.ActiveReservationDTO;
import com.projet.e_hotel.Classes.dto.AjoutChaineHoteliereDTO;
import com.projet.e_hotel.Classes.dto.LoueChambreDTO;
import com.projet.e_hotel.Classes.mapper.ActiveReservationMapper;
import com.projet.e_hotel.Classes.mapper.AjoutChaineHoteliereMapper;
import com.projet.e_hotel.Classes.mapper.LoueChambreMapper;
import com.projet.e_hotel.Repository.AjoutChaineHoteliereRepository;
import com.projet.e_hotel.Repository.HotelRepository;

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
