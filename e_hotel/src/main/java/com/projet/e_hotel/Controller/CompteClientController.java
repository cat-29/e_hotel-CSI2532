package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.CompteClient;
import com.projet.e_hotel.Service.CompteClientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CompteClientController {

    @Autowired
    private CompteClientService compteClientService;
    
    public CompteClientController (CompteClientService compteClientService) {
        this.compteClientService = compteClientService;
    }

    @GetMapping("/signIn/compteclient")
    public Client getAllCompteClient(@RequestParam String email, @RequestParam String motDePasse) {
        return compteClientService.getCompteClient(email, motDePasse);
    }

    @PostMapping("addClientAccount")
    
    public CompteClient addAccount(@RequestBody CompteClient compte){
        return compteClientService.saveCompte(compte);
    }

    
}
