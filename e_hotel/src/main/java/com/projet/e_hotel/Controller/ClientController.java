package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.dto.ClientDTO;
import com.projet.e_hotel.Classes.dto.EmployeAjouteLocationDTO;
import com.projet.e_hotel.Classes.mapper.ClientMapper;
import com.projet.e_hotel.Service.ClientService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping("addClient")
    
    public Client addAccount(@RequestBody Client client){
        return clientService.saveClient(client);
    }

    @GetMapping("/{idClient}")
    public Boolean doesClientExist(@PathVariable String idClient) {
        return clientService.doesClientExist(idClient).isPresent();
    }

    @PostMapping("/create")
    public ClientDTO createClient(@RequestBody EmployeAjouteLocationDTO aDto) {
        return ClientMapper.mapToClientDTO(clientService.createClient(aDto));
    }
    

    
}
