package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.ChaineHoteliere;
import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Repository.ChaineHoteliereRepository;
import com.projet.e_hotel.Repository.HotelRepository;

@Service
public class ChaineHoteliereService {
    @Autowired
    private ChaineHoteliereRepository chaineHoteliereRepository;

    public List<ChaineHoteliere> getAllChaineHoteliere() {
        return chaineHoteliereRepository.findAll();
    }

}
