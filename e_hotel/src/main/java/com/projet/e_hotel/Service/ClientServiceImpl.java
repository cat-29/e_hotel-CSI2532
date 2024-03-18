package com.projet.e_hotel.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.EnregistreClient;
import com.projet.e_hotel.Repository.ClientRepository;
import com.projet.e_hotel.Repository.EnregistreClientRepository;

@Service
public class ClientServiceImpl {

    
    final ClientRepository clientRepository;
    final EnregistreClientRepository enregistreClientRepository;

    public ClientServiceImpl(ClientRepository clientRepository, EnregistreClientRepository enregistreClientRepository) {
        this.clientRepository = clientRepository;
        this.enregistreClientRepository = enregistreClientRepository;
    }

    public List<Client> getAllClient() {
        return clientRepository.findAll();
    }

    public Client getClientFromId(String nas) {
        return clientRepository.findById(nas).orElseThrow();
    }

    // public EnregistreClient setEnregistrementClient(Client client, String idEmploye) {
    //     EnregistreClient enregistreClient = new EnregistreClient(idEmploye, client.getId(), null, null);
    //     return enregistreClient;
    // }
}
