package com.projet.e_hotel.Controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import com.projet.e_hotel.Classes.dto.AjoutLocationChambreDTO;
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
import com.projet.e_hotel.Service.ChaineHoteliereService;
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

    @Autowired
    private ChaineHoteliereService chaineHoteliereService;

    public ChambreController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/numeroChambre/{hotelId}/{dateCheckIn}/{dateCheckOut}/{capacite}/{vue}")
    public AjoutLocationChambreDTO getNumeroChambreForSpecifications(@PathVariable Integer hotelId, @PathVariable String dateCheckIn,
            @PathVariable String dateCheckOut, @PathVariable String capacite,
            @PathVariable String vue) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinFormatted = sdf.parse(dateCheckIn);
        Date checkoutFormatted = sdf.parse(dateCheckOut);
        // Chambre infoChambre = chambreService.getNumeroChambreForSpecifications(hotelId, checkinFormatted,
        //         checkoutFormatted, capacite,
        //         vue);
        AjoutLocationChambreDTO infoChambre = chambreService.getNumeroChambreForSpecifications(hotelId, checkinFormatted,
                checkoutFormatted, capacite,
                vue);
                return infoChambre;
        // if (infoChambre == null) {
        //     // Utilisateur doit changer ces filtres car il y a quelque chose qui est
        //     // problematique
        //     return ChambreMapper.mapToChambreDTO(new Chambre());
        // }
        // return ChambreMapper.mapToChambreDTO(infoChambre);
    }

    @GetMapping("/getAllRooms/rating")
    public List<ChambreDTO> getAllChambresFromClassement(@RequestParam("rating") Integer[] rating) {
        // Converti les classement d'un array a une liste
        List<Integer> listRating = Arrays.asList(rating);

        // Trouve tout les hotels qui satisfont chaque classement
        List<Integer> listHotel = hotelService.getAllHotelsFromRating(listRating);

        // Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotel).stream().map(m -> ChambreMapper.mapToChambreDTO(m))
                .toList();
    }

    @GetMapping("/getAllRooms/chaine")
    public List<ChambreDTO> getAllChambresFromChaineHoteliere(@RequestParam("chaines") String[] chaines) {
        // Converti les chaines d'un array a une liste
        List<String> listNomChaines = Arrays.asList(chaines);

        // Trouve tout les hotels qui appartiennent a chaque chaine
        List<Integer> listHotel = hotelService.getAllHotelsFromNomChaine(listNomChaines);

        // Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotel).stream().map(m -> ChambreMapper.mapToChambreDTO(m))
                .toList();
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

        // Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRooms().stream().map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }

    @GetMapping("/getAllRooms/nbrChambreMin/{chambreMin}")
    public List<ChambreDTO> getChambresFromNombreDeChambresMin(@PathVariable String chambreMin) {
        Integer min = Integer.valueOf(chambreMin);

        // Trouve juste les chambres qui satisfont la borne chambreMin
        List<Integer> listHotelNbrChambreMin = hotelService.findAllHotelsFromChambreMin(min);

        // Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotelNbrChambreMin).stream()
                .map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }

    @GetMapping("/getAllRooms/nbrChambreMax/{chambreMax}")
    public List<ChambreDTO> getChambresFromNombreDeChambresMax(@PathVariable String chambreMax) {
        Integer max = Integer.valueOf(chambreMax);
        // Trouve juste les chambres qui satisfont la borne chambreMax seulement
        List<Integer> listHotelNbrChambreMax = hotelService.findAllHotelsFromChambreMax(max);

        // Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotelNbrChambreMax).stream()
                .map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }

    @GetMapping("/getAllRooms/{chambreMin}/{chambreMax}")
    public List<ChambreDTO> getChambresFromNombreDeChambres(@PathVariable Integer chambreMin,
            @PathVariable Integer chambreMax) {
        // Cas ou on trouve toutes les chambres qui satisfont les deux bornes
        List<Integer> listHotelNbrChambreBornes = hotelService.findAllHotelsFromChambreMinAndChambreMax(chambreMin,
                chambreMax);

        // Trouve toutes les chambres pour les hotels trouvees
        return chambreService.getAllRoomsFromIdHotels(listHotelNbrChambreBornes).stream()
                .map(m -> ChambreMapper.mapToChambreDTO(m)).toList();
    }

    // Detecter si une chambre est disponible pour les dates indiques
    @GetMapping("/getIsRoomAvailable/{checkin}/{checkout}/{idHotel}/{numeroChambre}")
    public List<ChambrePKDTO> isRoomAvailable(@PathVariable String checkin, @PathVariable String checkout,
            @PathVariable Integer idHotel, @PathVariable Integer numeroChambre) throws ParseException {
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

        List<ChambrePKDTO> result = chambreService.isRoomAvailable(checkinFormatted, checkoutFormatted, idHotel,
                numeroChambre);
        return result;
    }

    // Avoir tous les chambres, aucun filtres appliqués

    @GetMapping("/tous")
    // La methode doit retourner une list de type ChambreDTO
    public List<ChambreHotelDTO> getAllRooms() {
        // First get all rooms from db as Chambre
        List<Chambre> listChambres = chambreService.getAllRooms();

        // Then convert those rooms from type Chambre to ChambreDTO thanks to
        // ChambreMapper
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
    public List<ProvinceCountAvDTO> getDisponibilites() {
        List<ProvinceCountAvDTO> result = chambreService.getCountRoomAvailable();
        return result;
    }

    // Tous filtres appliques
    // {checkin}/{checkout}/{capacite}/{vue}/{prixMin}/{prixMax}/{chaines}/{classement}/{chambreMin}/{chambreMax}/{etendre}

    @GetMapping("/getRoomsFilters/noChaine/{checkin}/{checkout}/{capacite}/{vue}/{prixMin}/{prixMax}/{classement}/{chambreMin}/{chambreMax}/{etendre}")
    public List<ChambreHotelDTO> getAllRoomsSpecificationsWithoutChaine(@PathVariable String checkin,
            @PathVariable String checkout, @PathVariable String capacite,
            @PathVariable String vue, @PathVariable String prixMin, @PathVariable String prixMax,
            @PathVariable String[] classement,
            @PathVariable String chambreMin, @PathVariable String chambreMax, @PathVariable Boolean etendre)
            throws ParseException {

        // Pas de chaine donnee dans les checkbox, alors va chercher par default toutes
        // les chaines
        List<String> getAllChaine = chaineHoteliereService.getAllChaineHoteliere().stream().map(r -> r.getNomChaine())
                .toList();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinFormatted = null;
        Date checkoutFormatted = null;
        Calendar calendar = Calendar.getInstance();

        if (!checkin.equals("NAN")) {
            checkinFormatted = sdf.parse(checkin);
        }
        if (!checkout.equals("NAN")) {
            checkoutFormatted = sdf.parse(checkout);
        }

        List<ChambreHotelDTO> result = null;
        // Cast
        Integer chambreMinFormatted = Integer.parseInt(chambreMin);
        Integer chambreMaxFormatted = Integer.parseInt(chambreMax);

        Double priceMinFormatted = Double.parseDouble(prixMin);
        Double priceMaxFormatted = Double.parseDouble(prixMax);

        List<ChambreHotelDTO> listeDeToutesChambres = new ArrayList<>();

        // Passe dans toutes les chaines
        for (int i = 0; i < getAllChaine.size(); i++) {
            for (int idx = 0; idx < classement.length; idx++) {
                Integer classementFormatted = Integer.parseInt(classement[idx]);

                // 1er cas, utilisateur entre les deux dates checkin et checkout
                if (!checkin.equals("NAN") && !checkout.equals("NAN")) {
                    result = chambreService.getAllRoomsCheckinAndCheckout(checkinFormatted, checkoutFormatted, capacite,
                            vue, priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), classementFormatted, chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && !checkout.equals("NAN")) { // cas 2: utilisateur entre tout a l
                                                                               // exception de checkin
                    // System.out.println("I should be here");
                    calendar.setTime(checkoutFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, -1);
                    // ceci date checkin minimale
                    checkinFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckoutOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), classementFormatted, chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (!checkin.equals("NAN") && checkout.equals("NAN")) {// cas 3: utilisateur entre tout a l
                                                                              // exception de checkout
                    // System.out.println("I should be here");
                    calendar.setTime(checkinFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, 1);
                    // ceci date checkin minimale
                    checkoutFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckinOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), classementFormatted, chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && checkout.equals("NAN")) { // cas4: utilisateur entre tout a l
                                                                              // exception de checkin et checkout
                    // System.out.println("I should be here NOW");
                    result = chambreService.getAllRoomsNoDates(capacite, vue, priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), classementFormatted, chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                }
            }
        }
        return listeDeToutesChambres;
    }

    @GetMapping("/getRoomsFilters/noRating/{checkin}/{checkout}/{capacite}/{vue}/{prixMin}/{prixMax}/{chaine}/{chambreMin}/{chambreMax}/{etendre}")
    public List<ChambreHotelDTO> getAllRoomsSpecificationsWithoutRating(@PathVariable String checkin,
            @PathVariable String checkout, @PathVariable String capacite,
            @PathVariable String vue, @PathVariable String prixMin, @PathVariable String prixMax,
            @PathVariable String[] chaine,
            @PathVariable String chambreMin, @PathVariable String chambreMax, @PathVariable Boolean etendre)
            throws ParseException {

        // Pas de ratings donnee dans les checkbox
        Integer[] getAllRatings = { 1, 2, 3, 4, 5 };

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinFormatted = null;
        Date checkoutFormatted = null;
        Calendar calendar = Calendar.getInstance();

        if (!checkin.equals("NAN")) {
            checkinFormatted = sdf.parse(checkin);
        }
        if (!checkout.equals("NAN")) {
            checkoutFormatted = sdf.parse(checkout);
        }

        List<ChambreHotelDTO> result = null;
        // Cast
        Integer chambreMinFormatted = Integer.parseInt(chambreMin);
        Integer chambreMaxFormatted = Integer.parseInt(chambreMax);
        // Integer classementFormatted = Integer.parseInt(classement);
        Double priceMinFormatted = Double.parseDouble(prixMin);
        Double priceMaxFormatted = Double.parseDouble(prixMax);

        List<ChambreHotelDTO> listeDeToutesChambres = new ArrayList<>();

        // Passe dans toutes les chaines
        for (int i = 0; i < chaine.length; i++) {
            for (int idx = 0; idx < getAllRatings.length; idx++) {

                // 1er cas, utilisateur entre les deux dates checkin et checkout
                if (!checkin.equals("NAN") && !checkout.equals("NAN")) {
                    result = chambreService.getAllRoomsCheckinAndCheckout(checkinFormatted, checkoutFormatted, capacite,
                            vue, priceMinFormatted,
                            priceMaxFormatted, chaine[i], getAllRatings[idx], chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && !checkout.equals("NAN")) { // cas 2: utilisateur entre tout a l
                                                                               // exception de checkin
                    // System.out.println("I should be here");
                    calendar.setTime(checkoutFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, -1);
                    // ceci date checkin minimale
                    checkinFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckoutOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, chaine[i], getAllRatings[idx], chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (!checkin.equals("NAN") && checkout.equals("NAN")) {// cas 3: utilisateur entre tout a l
                                                                              // exception de checkout
                    // System.out.println("I should be here");
                    calendar.setTime(checkinFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, 1);
                    // ceci date checkin minimale
                    checkoutFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckinOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, chaine[i], getAllRatings[idx], chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && checkout.equals("NAN")) { // cas4: utilisateur entre tout a l
                                                                              // exception de checkin et checkout
                    // System.out.println("I should be here NOW");
                    result = chambreService.getAllRoomsNoDates(capacite, vue, priceMinFormatted,
                            priceMaxFormatted, chaine[i], getAllRatings[idx], chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                }
            }
        }
        return listeDeToutesChambres;
    }

    @GetMapping("/getRoomsFilters/noChaineAndRatin/{checkin}/{checkout}/{capacite}/{vue}/{prixMin}/{prixMax}/{chambreMin}/{chambreMax}/{etendre}")
    public List<ChambreHotelDTO> getAllRoomsSpecificationsWithoutChaineAndRating(@PathVariable String checkin,
            @PathVariable String checkout, @PathVariable String capacite,
            @PathVariable String vue, @PathVariable String prixMin, @PathVariable String prixMax,
            @PathVariable String chambreMin, @PathVariable String chambreMax, @PathVariable Boolean etendre)
            throws ParseException {

        // Pas de ratings donnee dans les checkbox
        Integer[] getAllRatings = { 1, 2, 3, 4, 5 };

        // Pas de chaine donnee dans les checkbox, alors va chercher par default toutes
        // les chaines
        List<String> getAllChaine = chaineHoteliereService.getAllChaineHoteliere().stream().map(r -> r.getNomChaine())
                .toList();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinFormatted = null;
        Date checkoutFormatted = null;
        Calendar calendar = Calendar.getInstance();

        if (!checkin.equals("NAN")) {
            checkinFormatted = sdf.parse(checkin);
        }
        if (!checkout.equals("NAN")) {
            checkoutFormatted = sdf.parse(checkout);
        }

        List<ChambreHotelDTO> result = null;
        // Cast
        Integer chambreMinFormatted = Integer.parseInt(chambreMin);
        Integer chambreMaxFormatted = Integer.parseInt(chambreMax);
        // Integer classementFormatted = Integer.parseInt(classement);
        Double priceMinFormatted = Double.parseDouble(prixMin);
        Double priceMaxFormatted = Double.parseDouble(prixMax);

        List<ChambreHotelDTO> listeDeToutesChambres = new ArrayList<>();

        // Passe dans toutes les chaines
        for (int i = 0; i < getAllChaine.size(); i++) {
            for (int idx = 0; idx < getAllRatings.length; idx++) {

                // 1er cas, utilisateur entre les deux dates checkin et checkout
                if (!checkin.equals("NAN") && !checkout.equals("NAN")) {
                    result = chambreService.getAllRoomsCheckinAndCheckout(checkinFormatted, checkoutFormatted, capacite,
                            vue, priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), getAllRatings[idx], chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && !checkout.equals("NAN")) { // cas 2: utilisateur entre tout a l
                                                                               // exception de checkin
                    // System.out.println("I should be here");
                    calendar.setTime(checkoutFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, -1);
                    // ceci date checkin minimale
                    checkinFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckoutOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), getAllRatings[idx], chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (!checkin.equals("NAN") && checkout.equals("NAN")) {// cas 3: utilisateur entre tout a l
                                                                              // exception de checkout
                    // System.out.println("I should be here");
                    calendar.setTime(checkinFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, 1);
                    // ceci date checkin minimale
                    checkoutFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckinOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), getAllRatings[idx], chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && checkout.equals("NAN")) { // cas4: utilisateur entre tout a l
                                                                              // exception de checkin et checkout
                    // System.out.println("I should be here NOW");
                    result = chambreService.getAllRoomsNoDates(capacite, vue, priceMinFormatted,
                            priceMaxFormatted, getAllChaine.get(i), getAllRatings[idx], chambreMinFormatted,
                            chambreMaxFormatted, etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                }
            }
        }
        return listeDeToutesChambres;
    }

    @GetMapping("/getRoomsFilters/{checkin}/{checkout}/{capacite}/{vue}/{prixMin}/{prixMax}/{chaine}/{classement}/{chambreMin}/{chambreMax}/{etendre}")
    public List<ChambreHotelDTO> getAllRoomsSpecifications(@PathVariable String checkin, @PathVariable String checkout,
            @PathVariable String capacite,
            @PathVariable String vue, @PathVariable String prixMin, @PathVariable String prixMax,
            @PathVariable String[] chaine, @PathVariable String[] classement,
            @PathVariable String chambreMin, @PathVariable String chambreMax, @PathVariable Boolean etendre)
            throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinFormatted = null;
        Date checkoutFormatted = null;
        Calendar calendar = Calendar.getInstance();

        if (!checkin.equals("NAN")) {
            checkinFormatted = sdf.parse(checkin);
        }
        if (!checkout.equals("NAN")) {
            checkoutFormatted = sdf.parse(checkout);
        }

        List<ChambreHotelDTO> result = null;
        // Cast
        Integer chambreMinFormatted = Integer.parseInt(chambreMin);
        Integer chambreMaxFormatted = Integer.parseInt(chambreMax);
        Double priceMinFormatted = Double.parseDouble(prixMin);
        Double priceMaxFormatted = Double.parseDouble(prixMax);

        List<ChambreHotelDTO> listeDeToutesChambres = new ArrayList<>();

        // Passe dans toutes les chaines
        for (int i = 0; i < chaine.length; i++) {

            for (int idx = 0; idx < classement.length; idx++) {
                Integer classementFormatted = Integer.parseInt(classement[idx]);

                System.out.println("chaine.length est " + chaine.length);
                System.out.println("\n\nTravaille avec chaine: " + chaine[i]);
                // 1er cas, utilisateur entre les deux dates checkin et checkout
                if (!checkin.equals("NAN") && !checkout.equals("NAN")) {
                    result = chambreService.getAllRoomsCheckinAndCheckout(checkinFormatted, checkoutFormatted, capacite,
                            vue, priceMinFormatted,
                            priceMaxFormatted, chaine[i], classementFormatted, chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && !checkout.equals("NAN")) { // cas 2: utilisateur entre tout a l
                                                                               // exception de checkin
                    calendar.setTime(checkoutFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, -1);
                    // ceci date checkin minimale
                    checkinFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckoutOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, chaine[i], classementFormatted, chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (!checkin.equals("NAN") && checkout.equals("NAN")) {// cas 3: utilisateur entre tout a l
                                                                              // exception de checkout
                    calendar.setTime(checkinFormatted);
                    calendar.add(Calendar.DAY_OF_YEAR, 1);
                    // ceci date checkout minimale
                    checkoutFormatted = calendar.getTime();

                    result = chambreService.getAllRoomsCheckinOnly(checkinFormatted, checkoutFormatted, capacite, vue,
                            priceMinFormatted,
                            priceMaxFormatted, chaine[i], classementFormatted, chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                } else if (checkin.equals("NAN") && checkout.equals("NAN")) { // cas4: utilisateur entre tout a l
                                                                              // exception de checkin et checkout
                    result = chambreService.getAllRoomsNoDates(capacite, vue, priceMinFormatted,
                            priceMaxFormatted, chaine[i], classementFormatted, chambreMinFormatted, chambreMaxFormatted,
                            etendre);

                    for (int j = 0; j < result.size(); j++) {
                        listeDeToutesChambres.add(result.get(j));
                    }
                }
            }
        }
        return listeDeToutesChambres;
    }

    @GetMapping("/getAllCommoditees/{idHotel}/{numero_chambre}")
    public List<String> getAllCommoditees(@PathVariable String idHotel, @PathVariable String numero_chambre) {
        List<String> result = null;
        Integer idHotelFormatted = Integer.parseInt(idHotel);
        Integer numero_chambreFormatted = Integer.parseInt(numero_chambre);
        result = chambreService.getAllCommoditees(idHotelFormatted, numero_chambreFormatted);
        return result;

    }

    // Toutes les commoditees d une chambre specifique

}
