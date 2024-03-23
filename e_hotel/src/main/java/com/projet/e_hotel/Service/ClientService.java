package com.projet.e_hotel.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.dto.EmployeAjouteLocationDTO;
import com.projet.e_hotel.Classes.mapper.EmployeAjouteLocationMapper;
import com.projet.e_hotel.Repository.ClientRepository;
import com.projet.e_hotel.Repository.EnregistreClientRepository;

@Service
public class ClientService {
    @Autowired

    private ClientRepository clientRepository;

    private EnregistreClientRepository enregistreClientRepository;

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

    public Client getClientFromId(String nas) {
        return clientRepository.findById(nas).orElseThrow();
    }

    // public EnregistreClient setEnregistrementClient(Client client, String idEmploye) {
    //     EnregistreClient enregistreClient = new EnregistreClient(idEmploye, client.getId(), null, null);
    //     return enregistreClient;
    // }

    public Optional<Client> doesClientExist(String nas) {
        return clientRepository.findById(nas);
    }

    public Client createClient(EmployeAjouteLocationDTO eDto) {
        Client client = EmployeAjouteLocationMapper.mapToClient(eDto);
        return clientRepository.save(client);
    }
}
