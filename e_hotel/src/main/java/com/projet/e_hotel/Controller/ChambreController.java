package com.projet.e_hotel.Controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.dto.ChambreHotelDTO;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.mapper.ChambreHotelMapper;
import com.projet.e_hotel.Classes.mapper.ChambreMapper;
import com.projet.e_hotel.Classes.mapper.HotelMapper;
import com.projet.e_hotel.Service.ChambreService;
import com.projet.e_hotel.Service.HotelService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chambre")
public class ChambreController {
    @Autowired
    private ChambreService chambreService;
    private final HotelService hotelService;

    public ChambreController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/numeroChambre/{hotelId}/{dateCheckIn}/{dateCheckOut}/{capacite}/{vue}")
    public ChambreDTO getNumeroChambreForSpecifications(@PathVariable Integer hotelId, @PathVariable Long dateCheckIn,
            @PathVariable Long dateCheckOut, @PathVariable String capacite,
            @PathVariable String vue) {
        Date checkIn = new Date(dateCheckIn);
        Date checkOut = new Date(dateCheckOut);
        Chambre infoChambre = chambreService.getNumeroChambreForSpecifications(hotelId, checkIn, checkOut, capacite,
                vue);
        if (infoChambre == null) {
            // Utilisateur doit changer ces filtres car il y a quelque chose qui est
            // problematique
            return ChambreMapper.mapToChambreDTO(new Chambre());
        }
        return ChambreMapper.mapToChambreDTO(infoChambre);
    }

    // Avoir tous les chambres, aucun filtres appliqués

    @GetMapping("/tous")

    // La methode doit retourner une list de type ChambreDTO
    public List<ChambreHotelDTO> getAllRooms(){
        // First get all rooms from db as Chambre
        List<Chambre> listChambres = chambreService.getAllRooms();

        // Then convert those rooms from type Chambre to ChambreDTO thanks to ChambreMapper
        List<ChambreDTO> listChambresDTO = listChambres.stream().map(
                item -> ChambreMapper.mapToChambreDTO(item)).toList();

        // Now get hotels from their id, the id was present in listChambres
        List<Hotel> listHotels = listChambres.stream()
                .map(chambre -> hotelService.getNameHotel(chambre.getIdHotel())).toList();

        // Again map listHotels to HotelDTO
        List<HotelDTO> listHotelDTO = listHotels.stream()
                .map(hotel -> HotelMapper.mapToHotelDTO(hotel)).toList();

        // Now I have hotelDTOs and ChambresDTOs
        // Now merge the two so that I can access hotel and chambre details same time

        // At this point, I have chambre details as well as hotel details.

        // Still need to get chaine details in that object, as well as tel_chaine,
        // email_chaine, email_hotel,tel_hotel et contient_commodite;
        return ChambreHotelMapper.mapToChambreHotelDTO(listChambresDTO, listHotelDTO);
    }

}
