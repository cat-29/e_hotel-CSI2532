package com.projet.e_hotel.Controller;
import com.projet.e_hotel.Service.ChaineHoteliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class ChaineHoteliereController {
    
    @Autowired
    private ChaineHoteliereService chaineHoteliereService;
    
    @GetMapping("/chaine/hotel")
    public String admin(Model model) {
        model.addAttribute("allchainehotelierelist", chaineHoteliereService.getAllChaineHoteliere());
        return "admin";
    }

    // @GetMapping("/hotel/{idHotel}")
    // public String getChaineHoteliere(@RequestParam String idHotel) {

    //     return chaineHoteliereService.getAllChaineHoteliere(idHotel);
    // }
    
    
}
