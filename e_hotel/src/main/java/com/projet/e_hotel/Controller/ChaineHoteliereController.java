package com.projet.e_hotel.Controller;

import com.projet.e_hotel.Classes.dto.ChaineHoteliereDTO;
import com.projet.e_hotel.Classes.mapper.ChaineHoteliereMapper;
import com.projet.e_hotel.Service.ChaineHoteliereService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chaine")
public class ChaineHoteliereController {

    @Autowired
    private ChaineHoteliereService chaineHoteliereService;

    @GetMapping("/hotel")
    public String admin(Model model) {
        model.addAttribute("allchainehotelierelist", chaineHoteliereService.getAllChaineHoteliere());
        return "admin";
    }

    @GetMapping
    public List<ChaineHoteliereDTO> getAllChaine() {
        return chaineHoteliereService.getAllChaineHoteliere().stream()
                .map(r -> ChaineHoteliereMapper.mapToChaineHoteliereDTO(r)).toList();
    }

    // @GetMapping("/hotel/{idHotel}")
    // public String getChaineHoteliere(@RequestParam String idHotel) {

    // return chaineHoteliereService.getAllChaineHoteliere(idHotel);
    // }

}
