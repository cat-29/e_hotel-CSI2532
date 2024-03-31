package com.projet.e_hotel.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Compte;
import com.projet.e_hotel.Service.CompteService;


@RestController
// @RequestMapping("/comptes")
public class CompteController {

    @Autowired
    private CompteService service;

    // private final CompteRepository compteRepository;
    // public CompteController(CompteRepository compteRepository){
    //     this.compteRepository = compteRepository;
    // }

    
    // public ResponseEntity<Compte> createCompte(@RequestBody Compte compte) throws URISyntaxException{
    //     // Compte savedCompte = compteRepository.save(compte);
    //     // return ResponseEntity.created(new URI("/compte"+savedCompte.getEmail())).body(savedCompte);
    //     return new ResponseEntity<Compte>(service.createCompte(compte.getEmail(), compte.getMotDePasse()), HttpStatus.OK);

    // } 

    @PostMapping("addAccount")
    
    public Compte addAccount(@RequestBody Compte compte){
        return service.saveCompte(compte);
    }

    // We may have @Get


    
}
