package com.projet.e_hotel.Controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Calendar;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.Dommage;
import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Classes.dto.ChambreDTO;
import com.projet.e_hotel.Classes.dto.ChambreHotelDTO;
import com.projet.e_hotel.Classes.dto.ChambrePKDTO;
import com.projet.e_hotel.Classes.dto.ChambreSubiDommageDTO;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.dto.ProvinceCountAvDTO;
import com.projet.e_hotel.Classes.mapper.ChambreHotelMapper;
import com.projet.e_hotel.Classes.mapper.ChambreMapper;
import com.projet.e_hotel.Classes.mapper.ChambreSubiDommageMapper;
import com.projet.e_hotel.Classes.mapper.HotelMapper;
import com.projet.e_hotel.Service.ChambreService;
import com.projet.e_hotel.Service.HotelService;
import com.projet.e_hotel.Service.SubiDommageService;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chambre")
public class ChambreController {
    @Autowired
    private ChambreService chambreService;   
    private final HotelService hotelService;
    @Autowired
    private SubiDommageService subiDommageService;

    public ChambreController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/numeroChambre/{hotelId}/{dateCheckIn}/{dateCheckOut}/{capacite}/{vue}")
    public ChambreDTO getNumeroChambreForSpecifications(@PathVariable Integer hotelId, @PathVariable String dateCheckIn,
            @PathVariable String dateCheckOut, @PathVariable String capacite,
            @PathVariable String vue) throws ParseException {
            
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinFormatted = sdf.parse(dateCheckIn);
        Date checkoutFormatted = sdf.parse(dateCheckOut);
        Chambre infoChambre = chambreService.getNumeroChambreForSpecifications(hotelId, checkinFormatted, checkoutFormatted, capacite,
                vue);
        if (infoChambre == null) {
            // Utilisateur doit changer ces filtres car il y a quelque chose qui est
            // problematique
            return ChambreMapper.mapToChambreDTO(new Chambre());
        }
        return ChambreMapper.mapToChambreDTO(infoChambre);
    }


    @GetMapping("/getAllRooms/rating")
    public List<ChambreDTO> getAllChambresFromClassement(@RequestParam("rating") Integer[] rating) {
        // Converti les classement d'un array a une liste
        List<Integer> listRating = Arrays.asList(rating);

        // Trouve tout les hotels qui satisfont chaque classement
        List<Integer> listHotel = hotelService.getAllHotelsFromRating(listRating);
        
        //  Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotel).stream().map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }


    @GetMapping("/getAllRooms/chaine")
    public List<ChambreDTO> getAllChambresFromChaineHoteliere(@RequestParam("chaines") String[] chaines) {
        // Converti les chaines d'un array a une liste
        List<String> listNomChaines = Arrays.asList(chaines);

        // Trouve tout les hotels qui appartiennent a chaque chaine
        List<Integer> listHotel = hotelService.getAllHotelsFromNomChaine(listNomChaines);

        //  Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotel).stream().map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }
   

    @GetMapping("/{idHotel}/getAllRooms/dommages")
    public List<ChambreSubiDommageDTO> getAllDommagesSubiForIdHotel(@PathVariable Integer idHotel) {
        return chambreService.getAllDommages(idHotel);
    }

    @GetMapping("/getAllRooms/dommageType")
    public List<String> getAllDommageType() {
        return chambreService.getAllDommageType().stream().map(i -> i.getTypeDommage()).toList();
    }
    

    @GetMapping("/{idHotel}/getAllRooms")
    public List<ChambreDTO> getAllChambresForIdHotel(@PathVariable Integer idHotel) {
        return chambreService.findAllRoomFromIdHotel(idHotel).stream().map(r -> ChambreMapper.mapToChambreDTO(r))
                .toList();
    }

    @PostMapping("/addDommage")
    public void saveDommage(@RequestBody ChambreSubiDommageDTO dommageDTO) {
        
        Dommage dommage = ChambreSubiDommageMapper.mapToDommage(dommageDTO);

        // is the dommageType in base de donnee already
        Boolean wasDommageFound = subiDommageService.isDommageInDatabaseAlready(dommage);

        // If dommage type was not found, then save the new domage type
        if (!wasDommageFound) {
            // Save the user's new dommage type in database
            subiDommageService.saveDommage(dommage);
        }
    }


    @PostMapping("/addSubiDommage")
    public void saveSubiDommage(@RequestBody ChambreSubiDommageDTO dommageDTO) {

        // Make sure that it is not there already
        // Get the dommage type id first
        Dommage dommage = subiDommageService
                .findByTypeDommage(ChambreSubiDommageMapper.mapToDommage(dommageDTO).getTypeDommage()).get();
        Integer dommageId = dommage.getIdDommage();

        // Save the dommage subi
        subiDommageService.saveSubiDommage(ChambreSubiDommageMapper.mapToSubiDommage(dommageDTO, dommageId));
    }
    
    
    @GetMapping("/getAllRooms")
    public List<ChambreDTO> getAllChambres() {

        //  Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRooms().stream().map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }


    @GetMapping("/getAllRooms/nbrChambreMin/{chambreMin}")
    public List<ChambreDTO> getChambresFromNombreDeChambresMin(@PathVariable String chambreMin) {
        Integer min = Integer.valueOf(chambreMin);
        
        // Trouve juste les chambres qui satisfont la borne chambreMin
        List<Integer> listHotelNbrChambreMin = hotelService.findAllHotelsFromChambreMin(min);

        //  Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotelNbrChambreMin).stream().map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }


    @GetMapping("/getAllRooms/nbrChambreMax/{chambreMax}")
    public List<ChambreDTO> getChambresFromNombreDeChambresMax(@PathVariable String chambreMax) {
        Integer max = Integer.valueOf(chambreMax);
        // Trouve juste les chambres qui satisfont la borne chambreMax seulement
        List<Integer> listHotelNbrChambreMax = hotelService.findAllHotelsFromChambreMax(max);

        //  Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotelNbrChambreMax).stream().map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }
    

    @GetMapping("/getAllRooms/{chambreMin}/{chambreMax}")
    public List<ChambreDTO> getChambresFromNombreDeChambres(@PathVariable Integer chambreMin, @PathVariable Integer chambreMax) {
        // Cas ou on trouve toutes les chambres qui satisfont les deux bornes
        List<Integer> listHotelNbrChambreBornes = hotelService.findAllHotelsFromChambreMinAndChambreMax(chambreMin, chambreMax);

        //  Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotelNbrChambreBornes).stream().map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }


    // Detecter si une chambre est disponible pour les dates indiques
    @GetMapping("/getIsRoomAvailable/{checkin}/{checkout}/{idHotel}/{numeroChambre}")
    public List<ChambrePKDTO> isRoomAvailable(@PathVariable String checkin,@PathVariable String checkout,@PathVariable Integer idHotel,@PathVariable Integer numeroChambre) throws ParseException{
        // System.out.println("I am testing before");
        // Using this to not have problems with date conversion
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // System.out.println(checkin);
        Date checkinFormatted = sdf.parse(checkin);
        Date checkoutFormatted = sdf.parse(checkout);
        // Date checkinFormatted = new Date(checkin);
        // Date checkoutFormatted = new Date(checkout);
        // System.out.println("I am testing after");
        // System.out.println(checkinFormatted);
        // System.out.println(checkoutFormatted);

        List<ChambrePKDTO> result = chambreService.isRoomAvailable(checkinFormatted,checkoutFormatted,idHotel,numeroChambre);
        return result;
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
    // Permettant de voir le nombre de chambres disponibles par zone(province)
    @GetMapping("/disponibiliteParZone")
    public List<ProvinceCountAvDTO> getDisponibilites(){
        List<ProvinceCountAvDTO> result = chambreService.getCountRoomAvailable();
        return result;
    }

    // 1 filtre applique, checkin seulement
    @GetMapping("/getAvCheckin/{checkin}")
    public List<ChambreHotelDTO> getAllRoomsAvCheckin(@PathVariable String checkin) throws ParseException{
        // Faire des modifications pour la date recu pour ne pas avoir une journee de moins
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // On desire voir les disponibilites pour cette date de checkin
        Date checkinFormatted = sdf.parse(checkin);
        // Calculons c est quoi lendemain de cette date (pour voir les disponibilites des chambres, on se pose comme critere que la date de checkout min est le lendemain)
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(checkinFormatted);
        calendar.add(Calendar.DAY_OF_YEAR, 1);
        // ceci date checkout minimale 
        Date mincheckoutFormatted = calendar.getTime();


        List<ChambreHotelDTO> result = chambreService.getAllRoomsAvCheckin(checkinFormatted,mincheckoutFormatted);
        return result;
    }

    // 1 filtre applique, checkout seulement
    @GetMapping("/getAvCheckout/{checkout}")
    public List<ChambreHotelDTO> getAllRoomsAvCheckout(@PathVariable String checkout) throws ParseException{
        // Faire des modifications pour la date recu pour ne pas avoir une journee de moins
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // On desire voir les disponibilites pour cette date de checkout
        Date checkoutFormatted = sdf.parse(checkout);
        // Calculons c est quoi hier de cette date (pour voir les disponibilites des chambres, on se pose comme critere que la date de checkin min est le hier)
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(checkoutFormatted);
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        // ceci date checkout minimale 
        Date mincheckinFormatted = calendar.getTime();
        // System.out.println("what I entered was   "+checkoutFormatted);

        // System.out.println("yesterday was   "+mincheckinFormatted);


        List<ChambreHotelDTO> result = chambreService.getAllRoomsAvCheckout(checkoutFormatted,mincheckinFormatted);
        return result;
    }

    // 2 filtres appliques, checkin et checkout
    @GetMapping("/getAvCheckinAndCheckout/{checkin}/{checkout}")
    public List<ChambreHotelDTO> getAllRoomsAvCheckinAndCheckout(@PathVariable String checkin,@PathVariable String checkout) throws ParseException{
        // Faire des modifications pour la date recu pour ne pas avoir une journee de moins
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // On desire voir les disponibilites pour cette date de checkout
        Date checkinFormatted = sdf.parse(checkin);
        Date checkoutFormatted = sdf.parse(checkout);
    
        List<ChambreHotelDTO> result = chambreService.getAllRoomsAvCheckinAndCheckout(checkinFormatted,checkoutFormatted);
        return result;
    }








}
