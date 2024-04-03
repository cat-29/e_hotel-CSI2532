package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.CompteClient;
import com.projet.e_hotel.Classes.CompteEmploye;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Classes.dto.UpdateProfileDTO;
import com.projet.e_hotel.Classes.mapper.UpdateProfileMapper;
import com.projet.e_hotel.Service.CompteClientService;
import com.projet.e_hotel.Service.CompteEmployeService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/compte")
public class ConnectionCompteController {

    private final CompteClientService compteClientService;
    private final CompteEmployeService compteEmployeService;

    public ConnectionCompteController(CompteClientService compteClientService,
            CompteEmployeService compteEmployeService) {
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

    @GetMapping("/compteEmployeInfo/{nas}")
    public CompteEmploye getEmployeCompteInfo(@PathVariable String nas) {
        return compteEmployeService.findCompteEmploye(nas);
    }

    @GetMapping("/compteClientInfo/{nas}")
    public CompteClient getClientCompteInfo(@PathVariable String nas) {
        return compteClientService.findCompteEmploye(nas);
    }

    @GetMapping("/employeInfo/{nas}")
    public Employe getEmployeInfo(@PathVariable String nas) {
        return compteEmployeService.findEmploye(nas);
    }

    @GetMapping("/clientInfo/{nas}")
    public Client getClientInfo(@PathVariable String nas) {
        return compteClientService.findClient(nas);
    }

    @PostMapping("/employe/updateProfile")
    public Employe updateProfileEmploye(@RequestBody UpdateProfileDTO dto) {
        return compteEmployeService.updateProfileEmploye(UpdateProfileMapper.mapToEmploye(dto));
    }

    @PostMapping("/client/updateProfile")
    public Client updateProfileClient(@RequestBody UpdateProfileDTO dto) {
        return compteClientService.updateProfileClient(UpdateProfileMapper.mapToClient(dto));
    }

    @PostMapping("/employe/updateCompte")
    public CompteEmploye updateCompteEmploye(@RequestBody UpdateProfileDTO dto) {
        return compteEmployeService.updateCompte(UpdateProfileMapper.mapToCompteEmploye(dto));
    }

    @PostMapping("/client/updateCompte")
    public CompteClient updateCompteClient(@RequestBody UpdateProfileDTO dto) {
        return compteClientService.updateCompte(UpdateProfileMapper.mapToCompteClient(dto));
    }

}
