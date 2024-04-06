package com.projet.e_hotel.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Compte;
import com.projet.e_hotel.Service.CompteService;


@RestController
public class CompteController {

    @Autowired
    private CompteService service;


    @PostMapping("addAccount")
    public Compte addAccount(@RequestBody Compte compte){
        return service.saveCompte(compte);
    }
}
