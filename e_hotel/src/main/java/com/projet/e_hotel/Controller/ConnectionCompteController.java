package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Service.CompteClientService;
import com.projet.e_hotel.Service.CompteEmployeService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/compte")
public class ConnectionCompteController {
    
    private final CompteClientService compteClientService;
    private final CompteEmployeService compteEmployeService;
    
    public ConnectionCompteController (CompteClientService compteClientService, CompteEmployeService compteEmployeService) {
        this.compteClientService = compteClientService;
        this.compteEmployeService = compteEmployeService;
    }

    @GetMapping("/signIn/client")
    public Client getCompteClient(@RequestParam String email, @RequestParam String motDePasse) {
        return compteClientService.getCompteClient(email, motDePasse);
    }

    @GetMapping("/signIn/employe")
    public Employe getCompteEmploye(@RequestParam String email, @RequestParam String motDePasse) {
        return compteEmployeService.getCompteEmploye(email, motDePasse);
    }
    

    
}
