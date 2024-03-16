package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Service.CompteClientService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/signIn")
public class CompteClientController {
    
    private final CompteClientService compteClientService;
    
    public CompteClientController (CompteClientService compteClientService) {
        this.compteClientService = compteClientService;
    }

    @GetMapping("/compteclient")
    public Client getAllCompteClient(@RequestParam String email, @RequestParam String motDePasse) {
        return compteClientService.getCompteClient(email, motDePasse);
    }

    
}
