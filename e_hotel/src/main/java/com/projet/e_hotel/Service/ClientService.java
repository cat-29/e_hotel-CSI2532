package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Repository.ClientRepository;

@Service
public class ClientService {
    @Autowired

    private ClientRepository clientRepository;

    public ClientService(){
    }
    // public ClientService(ClientRepository clientRepository) {
    //     this.clientRepository = clientRepository;
    // }

    //THIS METHOD IS USED SOMEWHERE ELSE (indexcontroller.java)
    public List<Client> getAllClient() {
        return clientRepository.findAll();
    }

    // Method used to save a client
    public Client saveClient(Client client){
        return clientRepository.save(client);
    }
}
