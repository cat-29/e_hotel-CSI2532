package com.projet.e_hotel.Controller;

import com.projet.e_hotel.Classes.dto.ChaineHoteliereDTO;
import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.dto.EmployeDTO;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.mapper.ChaineHoteliereMapper;
import com.projet.e_hotel.Classes.mapper.ChambreMapper;
import com.projet.e_hotel.Classes.mapper.EmployeMapper;
import com.projet.e_hotel.Classes.mapper.HotelMapper;
import com.projet.e_hotel.Service.ChaineHoteliereService;
import com.projet.e_hotel.Service.ChambreService;
import com.projet.e_hotel.Service.EmployeService;
import com.projet.e_hotel.Service.HotelService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chaine")
public class ChaineHoteliereController {

    @Autowired
    private ChaineHoteliereService chaineHoteliereService;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private ChambreService chambreService;
    @Autowired
    private EmployeService employeService;

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

    @GetMapping("/hotels/{nomChaine}")
    public List<HotelDTO> getHotelsFromChaine(@PathVariable String nomChaine) {
        return hotelService.getHotelsFromChaine(nomChaine).stream().map(q -> HotelMapper.mapToHotelDTO(q)).toList();
    }

    @GetMapping("/hotels/chambres/{id}")
    public List<ChambreDTO> getChambresFromHotel(@PathVariable Integer id) {
        return chambreService.getChambresFromHotel(id).stream().map(w -> ChambreMapper.mapToChambreDTO(w)).toList();
    }

    @GetMapping("/hotels/employe/{id}")
    public List<EmployeDTO> getEmployesFromHotel(@PathVariable Integer id) {
        return employeService.getEmployesFromHotel(id).stream().map(w -> EmployeMapper.mapToEmployeDTO(w)).toList();
    }

    @GetMapping("/nom")
    public List<String> getAllNomChaines() {
        return chaineHoteliereService.getAllChaineHoteliere().stream()
                .map(r -> r.getNomChaine()).toList();
    }

    // @GetMapping("/hotel/{idHotel}")
    // public String getChaineHoteliere(@RequestParam String idHotel) {

    // return chaineHoteliereService.getAllChaineHoteliere(idHotel);
    // }

}
