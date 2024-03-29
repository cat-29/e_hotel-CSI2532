package com.projet.e_hotel.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.Compte;
import com.projet.e_hotel.Classes.CompteClient;
import com.projet.e_hotel.Repository.ClientRepository;
import com.projet.e_hotel.Repository.CompteClientRepository;

@Service
public class CompteClientService {
    
    @Autowired
    private CompteClientRepository compteClientRepository;
    @Autowired
    private ClientRepository clientRepository;

    public CompteClientService(){

    }

    @Autowired
    public CompteClientService(CompteClientRepository compteClientRepository, ClientRepository clientRepository) {
        this.compteClientRepository = compteClientRepository;
        this.clientRepository = clientRepository;
    }

    public Client getCompteClient (String email, String password) {
        return this.clientRepository.findById(this.compteClientRepository.findByEmailAndPassword(email, password).get().getIdClient()).orElseThrow();
    }

    public CompteClient saveCompte(CompteClient compte){
        return compteClientRepository.save(compte);
    }

}
