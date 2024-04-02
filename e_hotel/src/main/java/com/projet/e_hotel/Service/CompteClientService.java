package com.projet.e_hotel.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Client;
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

    public CompteClient findCompteClient(String nas) {
        return compteClientRepository.findByIdClient(nas).get();
    }

    public CompteClient findCompteEmploye(String nas) {
        return this.compteClientRepository.findByIdClient(nas).get();
    }

    public Client findClient(String nas) {
        return this.clientRepository.findById(nas).get();
    }

    public Client updateProfileClient(Client client) {

        // Find client information, if exists
        Client existingClient = clientRepository.findById(client.getNas())
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + client.getNas()));
        
        // set values to be saved later on
        existingClient.setPrenom(client.getPrenom());
        existingClient.setNomFamille(client.getNomFamille());
        existingClient.setNumero(client.getNumero());
        existingClient.setRue(client.getRue());
        existingClient.setVille(client.getVille());
        existingClient.setProvince(client.getProvince());
        existingClient.setPays(client.getPays());
        existingClient.setCodePostal(client.getCodePostal());

        // Update the client information
        return clientRepository.save(existingClient);
    }

    public CompteClient updateCompte(CompteClient compteClient) {
        
        // Find compte client info, if exists
        CompteClient exisitingCompte = compteClientRepository.findByIdClient(compteClient.getIdClient())
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + compteClient.getIdClient()));
        
        // set values to be saved later on
        exisitingCompte.setEmail(compteClient.getEmail());
        exisitingCompte.setPassword(compteClient.getPassword());

        // Update the compte client information
        return compteClientRepository.save(exisitingCompte);
    }
}
