package com.projet.e_hotel.Controller;

import com.projet.e_hotel.Classes.AjoutChaineHoteliere;
import com.projet.e_hotel.Classes.ChaineHoteliere;
import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Classes.dto.AjoutChaineHoteliereDTO;
import com.projet.e_hotel.Classes.dto.AjoutHotelDTO;
import com.projet.e_hotel.Classes.dto.ChaineHoteliereDTO;
import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.dto.EmployeDTO;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.mapper.AjoutChaineHoteliereMapper;
import com.projet.e_hotel.Classes.mapper.AjoutHotelMapper;
import com.projet.e_hotel.Classes.mapper.ChaineHoteliereMapper;
import com.projet.e_hotel.Classes.mapper.ChambreMapper;
import com.projet.e_hotel.Classes.mapper.EmployeMapper;
import com.projet.e_hotel.Classes.mapper.HotelMapper;
import com.projet.e_hotel.Service.AjoutChaineHoteliereService;
import com.projet.e_hotel.Service.AjoutHotelService;
import com.projet.e_hotel.Service.ChaineHoteliereService;
import com.projet.e_hotel.Service.ChambreService;
import com.projet.e_hotel.Service.EmployeService;
import com.projet.e_hotel.Service.HotelService;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//@CrossOrigin(origins = "http://localhost:3000")
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
    @Autowired
    private AjoutChaineHoteliereService ajoutChaineHoteliereService;
    @Autowired
    private AjoutHotelService ajoutHotelService;

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

    @PostMapping("/ajoutChaine")
    public void saveNewChaine(@RequestBody AjoutChaineHoteliereDTO oDto) throws ParseException {
        AjoutChaineHoteliere ajoutChaineHoteliere = AjoutChaineHoteliereMapper.mapToAjoutChaineHoteliere(oDto);
        ajoutChaineHoteliereService.saveNewChaine(ajoutChaineHoteliere);

    }

    @PostMapping("/ajoutHotel")
    public void saveNewHotel(@RequestBody AjoutHotelDTO oDto) throws ParseException {
        // get chaineHoteliere by nomChaine
        ChaineHoteliere chaineHoteliere = chaineHoteliereService.findByNomChaine(oDto.getNomChaine());
        String nomChaine = chaineHoteliere.getNomChaine();
        // String nomChaine = oDto.getNomChaine();
        ajoutHotelService.saveNewHotel(AjoutHotelMapper.mapToAjoutHotel(oDto, nomChaine));
    }

    @PostMapping("/ajoutChambre")
    public void saveNewChambre(@RequestBody ChambreDTO oDto) throws ParseException {
        // get chaineHoteliere by nomChaine
        // Hotel hotel = hotelService.findByIdHotel(oDto.getIdHotel());
        Integer idHotel = oDto.getIdHotel();
        chambreService.saveNewChambre(ChambreMapper.mapToChambre(oDto, idHotel));
    }

    @PostMapping("/ajoutEmploye")
    public void saveNewEmploye(@RequestBody EmployeDTO oDto) throws ParseException {
        // get chaineHoteliere by nomChaine
        // Hotel hotel = hotelService.findByIdHotel(oDto.getIdHotel());
        Integer idHotel = oDto.getIdHotel();
        employeService.saveNewEmploye(EmployeMapper.mapToEmploye(oDto, idHotel));
    }

    @PostMapping("/updateChaine")
    public ChaineHoteliere updateChaine(@RequestBody ChaineHoteliereDTO dto) {
        return chaineHoteliereService.updateChaine(ChaineHoteliereMapper.mapToChaineHoteliere(dto));
    }

    @PostMapping("/updateHotel")
    public Hotel updateHotel(@RequestBody HotelDTO dto) {
        return hotelService.updateHotel(HotelMapper.mapToHotel(dto));
    }

    @PostMapping("/updateChambre")
    public Chambre updateChambre(@RequestBody ChambreDTO dto) {
        return chambreService.updateChambre(ChambreMapper.mapToChambre(dto));
    }

    // public ChaineHoteliere updateEmploye(@RequestBody ChaineHoteliereDTO dto) {
    // return
    // chaineHoteliereService.updateChaine(ChaineHoteliereMapper.mapToChaineHoteliere(dto));
    // }
    // @GetMapping("/hotel/{idHotel}")
    // public String getChaineHoteliere(@RequestParam String idHotel) {

    // return chaineHoteliereService.getAllChaineHoteliere(idHotel);
    // }

}
