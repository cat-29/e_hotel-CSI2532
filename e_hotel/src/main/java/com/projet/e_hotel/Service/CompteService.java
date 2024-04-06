package com.projet.e_hotel.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Compte;
import com.projet.e_hotel.Repository.CompteRepository;

@Service
public class CompteService {
    @Autowired
    private CompteRepository compteRepository;

    public CompteService(){

    }

    public Compte saveCompte(Compte compte){
        return compteRepository.save(compte);
    }


}