package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Repository.ClientRepository;

@Service
public class ClientServiceImpl {

    
    final ClientRepository clientRepository;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClient() {
        return clientRepository.findAll();
    }
}
