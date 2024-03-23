package com.projet.e_hotel.Controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.mapper.ChambreMapper;
import com.projet.e_hotel.Service.ChambreService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chambre")
public class ChambreController {
    @Autowired
    private ChambreService chambreService;

    @GetMapping("/numeroChambre/{hotelId}/{dateCheckIn}/{dateCheckOut}/{capacite}/{vue}")
    public ChambreDTO getNumeroChambreForSpecifications(@PathVariable Integer hotelId, @PathVariable Date dateCheckIn,
            @PathVariable Date dateCheckOut, @PathVariable String capacite,
            @PathVariable String vue) {
                Chambre infoChambre = chambreService.getNumeroChambreForSpecifications(hotelId, dateCheckIn, dateCheckOut, capacite, vue);
                if (infoChambre == null) {
                    // Utilisateur doit changer ces filtres car il y a quelque chose qui est problematique
                    return ChambreMapper.mapToChambreDTO(new Chambre());
                }
                return ChambreMapper.mapToChambreDTO(infoChambre);
    }
}
