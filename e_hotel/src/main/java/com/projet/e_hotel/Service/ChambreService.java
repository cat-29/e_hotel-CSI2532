package com.projet.e_hotel.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Classes.Dommage;
import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Classes.SubiDommage;
import com.projet.e_hotel.Classes.dto.AjoutLocationChambreDTO;
import com.projet.e_hotel.Classes.dto.ChambreHotelDTO;
import com.projet.e_hotel.Classes.dto.ChambrePKDTO;
import com.projet.e_hotel.Classes.dto.ChambreSubiDommageDTO;
import com.projet.e_hotel.Classes.mapper.AjoutLocationChambreMapper;
import com.projet.e_hotel.Classes.mapper.ChambreHotelMapper;
import com.projet.e_hotel.Classes.mapper.ChambreSubiDommageMapper;
import com.projet.e_hotel.Classes.dto.ProvinceCountAvDTO;
import com.projet.e_hotel.Classes.mapper.sqlMapping.ChambrePkMapper;
import com.projet.e_hotel.Classes.mapper.sqlMapping.ProvinceCountAvMapper;
import com.projet.e_hotel.Repository.ChambreRepository;
import com.projet.e_hotel.Repository.ClientReserveRepository;
import com.projet.e_hotel.Repository.DommageRepository;
import com.projet.e_hotel.Repository.LoueChambreRepository;
import com.projet.e_hotel.Repository.SubiDommageRepository;

@Service
public class ChambreService {
    @Autowired
    private ChambreRepository chambreRepository;

    @Autowired
    private ClientReserveRepository clientReserveRepository;

    @Autowired
    private LoueChambreRepository loueChambreRepository;

    @Autowired
    private SubiDommageRepository subiDommageRepository;

    @Autowired
    private DommageRepository dommageRepository;

    public ChambreService() {

    }

    public List<Chambre> getChambresFromHotel(Integer id) {
        return chambreRepository.findChambresByIdHotel(id);
    }

    public List<SubiDommage> getAllDommagesForHotel(Integer idHotel) {
        return subiDommageRepository.findAllByIdHotel(idHotel);
    }

    public List<Dommage> getAllDommageFromIdDommage(Integer idDommage) {
        return dommageRepository.findAllByIdDommage(idDommage);
    }

    public List<ChambreSubiDommageDTO> getAllDommages(Integer idHotel) {
        List<SubiDommage> listAllDommagesForIdHotel = getAllDommagesForHotel(idHotel);
        List<Dommage> listAllDommages = new ArrayList<>();
        for (int i = 0; i < listAllDommagesForIdHotel.size(); i++) {
            List<Dommage> dommages = getAllDommageFromIdDommage(listAllDommagesForIdHotel.get(i).getIdDommage());

            // Insere tout les dommages dans la liste
            for (int j = 0; j < dommages.size(); j++) {

                listAllDommages.add(dommages.get(j));
            }
        }

        return ChambreSubiDommageMapper.mapToListOfChambreSubiDommageDTO(listAllDommagesForIdHotel, listAllDommages);
    }

    public List<Dommage> getAllDommageType() {
        return dommageRepository.findAll();
    }

    public AjoutLocationChambreDTO getNumeroChambreForSpecifications(Integer hotelId, Date dateCheckIn,
            Date dateCheckOut,
            String capacite, String vue) {

        // Va chercher toutes les chambres dans hotelId
        Optional<List<Chambre>> chambres = chambreRepository.findByIdHotelAndCapaciteChambreAndVueChambre(hotelId,
                capacite, vue);
        System.out.println("Ligne 87 : chambre.size  = " + chambres.get().size());

        // Pas de chambres, on retourne null
        if (!chambres.isPresent() || chambres.get().size() == 0) {
            System.out.println("Ligne 90");
            return AjoutLocationChambreMapper.chambreNullmapToAjoutLocationChambreDTO(null, 1);
        }

        // Trouve toutes les reservations faites par des clients, respectant les
        // specifications donnees et liste la premiere reservation client pour chaque
        // chambres de l'hotel qui n'est pas affecte par les dates de checkin et
        // checkout de l'utilisateur
        List<LoueChambre> listeChambreValides = new ArrayList<LoueChambre>();

        Boolean isThisRoomValid = true; // variable qui sera appeler si une chambre est valide ou non
        for (int idx = 0; idx < chambres.get().size(); idx++) {
            System.out.println("sixe of chambre is: " + chambres.get().size());

            List<Chambre> list = chambres.get();

            // Check pour des reservations de client fait avec les specifications
            Optional<List<ClientReserve>> listClientReserve = clientReserveRepository
                    .findAllByNumeroChambreAndIdHotel(list.get(idx).getNumeroChambre(), list.get(idx).getIdHotel());

            // Il n'y a pas de reservations faites dans le passe pour cette chambre, check
            // dans loue chambre que c'est pareil
            if (!listClientReserve.isPresent() || listClientReserve.get().size() == 0) {
                System.out.println("Ligne 113");

                Optional<List<LoueChambre>> listCheckLoueChambrePresent = loueChambreRepository
                        .findAllByNumeroChambreAndIdHotel(list.get(idx).getNumeroChambre(), list.get(idx).getIdHotel());

                // Pas present dans loue chambre aussi, ainsi on peut louer cette chambre
                // Cette chambre a JAMAIS ete reserve et loue. Alors ca fonctionne!
                if (!listCheckLoueChambrePresent.isPresent() || listCheckLoueChambrePresent.get().size() == 0) {
                    System.out.println("Ligne 121");

                    return AjoutLocationChambreMapper.mapToAjoutLocationChambreDTO(
                            chambreRepository.findByNumeroChambreAndIdHotel(list.get(idx).getNumeroChambre(), hotelId),
                            0);
                } else {

                    // Cette chambre a deja ete loue dans le passe.
                    // Chambre presente dans loue_chambre. Check les dates de checkin et checkOut!,
                    // retourne la 1ere chambre qui respecte le tout!
                    for (int i = 0; i < listCheckLoueChambrePresent.get().size(); i++) {
                        List<LoueChambre> list2 = listCheckLoueChambrePresent.get();
                        Boolean areDatesRespected = checkIfDatesAreRespected(dateCheckIn, dateCheckOut,
                                list2.get(i).getDateCheckin(), list2.get(i).getDateCheckout());

                        // Dates respectee. Retourne la chambre
                        if (areDatesRespected) {
                            System.out.println("Dates respectee a ligne 128");
                            return AjoutLocationChambreMapper.mapToAjoutLocationChambreDTO(chambreRepository
                                    .findByNumeroChambreAndIdHotel(list2.get(i).getNumeroChambre(), hotelId), 0);
                        }
                        // Dates pas respecte. Continue
                    }
                }
            } else {

                // Chambre a deja ete reservee dans le passee! Checkons si les dates sont
                // valides!
                for (int i = 0; i < listClientReserve.get().size(); i++) {
                    List<ClientReserve> list2 = listClientReserve.get();
                    Boolean areDatesRespected = checkIfDatesAreRespected(dateCheckIn, dateCheckOut,
                            list2.get(i).getDateCheckin(), list2.get(i).getDateCheckout());

                    // Dates respectee. Assurons nous qu'elle
                    if (areDatesRespected) {
                        System.out.println("Dates respectee a ligne 145");
                        Optional<List<LoueChambre>> listCheckLoueChambrePresent = loueChambreRepository
                                .findAllByNumeroChambreAndIdHotel(list2.get(i).getNumeroChambre(),
                                        list2.get(i).getIdHotel());

                        if (!listCheckLoueChambrePresent.isPresent() || listCheckLoueChambrePresent.get().size() == 0) {
                            System.out.println("Ligne 159");

                            // peut faire une location car les dates sont respectee dans la reservation
                            // Retour seulement la chambre pour lequel l'employe travaille

                            return AjoutLocationChambreMapper.mapToAjoutLocationChambreDTO(chambreRepository
                                    .findByNumeroChambreAndIdHotel(list2.get(i).getNumeroChambre(), hotelId), 0);
                        } else {

                            // Assurons nous que les dates pour les locations dans loue_chambre respectent
                            // les specifications
                            for (int j = 0; j < listCheckLoueChambrePresent.get().size(); j++) {

                                // Dates respectees, Retourne chambre
                                listeChambreValides.add(listCheckLoueChambrePresent.get().get(j));
                            }

                        }
                    }
                    // Dates pas respecte. Continue
                }

                // Check le arrayList. Retourne 1ere chambre qui est valide, si il y en a une.
                for (int i = 0; i < listeChambreValides.size(); i++) {
                    if (!checkIfDatesAreRespected(dateCheckIn, dateCheckOut,
                            listeChambreValides.get(i).getDateCheckin(),
                            listeChambreValides.get(i).getDateCheckout())) {
                        isThisRoomValid = false;
                        break;
                    }
                }

                if (isThisRoomValid) {
                    break;
                }

            }
        }

        if (isThisRoomValid) {
            System.out.println("Dates respectee a ligne 181");
            // Chambre est valide et la liste qui comportait les chambres valides a un size
            // plus grand que 1
            if (listeChambreValides.size() > 0) {
                System.out.println("On dis que la liste est plus grande que un size de 0");
                Integer l = listeChambreValides.stream().map(r -> r.getNumeroChambre()).findFirst().get();
                return AjoutLocationChambreMapper
                        .mapToAjoutLocationChambreDTO(chambreRepository.findAllByNumeroChambre(l).get(0), 0);
            }
        }

        // Rien n'a ete trouve. On retourne null et le client doit changer ces filtres.
        return AjoutLocationChambreMapper.chambreNullmapToAjoutLocationChambreDTO(null, 2);
    }

    public Boolean checkIfDatesAreRespected(Date user_checkIn, Date user_checkOut, Date db_checkIn, Date db_checkOut) {

        if (user_checkIn.equals(db_checkIn) || user_checkOut.equals(db_checkOut)) {
            return false;
        }
        // Check if dates are between
        // Date db_checkIn greater than db_checkIn date OR smaller than previous
        // db_checkOut date
        else if ((user_checkIn.after(db_checkIn)) && (user_checkOut.before(db_checkOut))) {

            // Both dates are between the db_checkIn and db_checkOut date so return false
            return false;

        } else if (user_checkIn.before(db_checkIn)
                && (user_checkOut.after(db_checkIn) && user_checkOut.before(db_checkOut))) {

            // Date2 is between the CheckIn and CheckOut date, so return false
            return false;

        } else if ((user_checkIn.after(db_checkIn) && user_checkIn.before(db_checkOut))
                && (user_checkOut.after(db_checkOut))) {

            // Date1 is between the CheckIn and CheckOut date, so return false
            return false;

        } else if (user_checkIn.before(db_checkIn) && user_checkOut.after(db_checkOut)) {

            // Both the checkIn and db_checkOut dates are between user_checkIn and
            // user_checkOut, so return
            // false
            return false;
        }

        // Les checkIns et CheckOuts n'interferent pas les nouvelles dates de
        // reservations
        return true;
    }

    public List<Chambre> getAllRooms() {
        return this.chambreRepository.findAll();
    }

    public List<Chambre> findAllRoomFromIdHotel(Integer idChaineHotel) {
        return this.chambreRepository.findAllByIdHotel(idChaineHotel);
    }

    public List<Chambre> getAllRoomsFromIdHotels(List<Integer> listIdHotel) {

        // Cree une liste ou on va inserer les chambres de toutes chaines
        List<Chambre> listOfAllChambres = new ArrayList<>();

        // Va chercher toutes les chambres de toutes les chaines
        for (int i = 0; i < listIdHotel.size(); i++) {
            List<Chambre> chambresForHotel = findAllRoomFromIdHotel(listIdHotel.get(i));

            // Insere chaque chambre separement dans la liste qui contient
            // toutes les chambres
            for (int j = 0; j < chambresForHotel.size(); j++) {
                listOfAllChambres.add(chambresForHotel.get(j));
            }
        }

        return listOfAllChambres;
    }

    public List<ChambrePKDTO> isRoomAvailable(Date checkin, Date checkout, Integer idHotel, Integer numeroChambre) {
        // Convert from List<Object[]> to List<ChambrePKM>
        List<Object[]> rawResult = this.chambreRepository.determineIfNotAvailable(checkin, checkout, idHotel,
                numeroChambre);

        if (rawResult.isEmpty()) {
            ChambrePKDTO rawResultFormatted = ChambrePkMapper.mapToEmptyObject(rawResult);
            List<ChambrePKDTO> res = new ArrayList<ChambrePKDTO>();

            res.add(rawResultFormatted);
            return res;
        } else {
            // Map accordingly
            List<ChambrePKDTO> rawResultFormatted = rawResult.stream()
                    .map(item -> ChambrePkMapper.mapToChambrePKObject(item)).toList();
            return rawResultFormatted;
        }
    }

    // Getting all available rooms / province
    public List<ProvinceCountAvDTO> getCountRoomAvailable() {
        List<Object[]> rawResult = this.chambreRepository.getCountRoomAvailable();
        List<ProvinceCountAvDTO> rawResultFormatted = rawResult.stream()
                .map(item -> ProvinceCountAvMapper.mapToProvinceCountDtoObject(item)).toList();

        return rawResultFormatted;

    }

    public Chambre saveNewChambre(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

    // Tous les filtres sont appliques, checkin et checkout compris
    public List<ChambreHotelDTO> getAllRoomsCheckinAndCheckout(Date checkin, Date checkout, String capacite, String vue,
            Double prixMin,
            Double prixMax, String chaine, Integer classement, Integer chambreMin, Integer chambreMax,
            Boolean etendre) {
        List<Object[]> rawResult = this.chambreRepository.getAllRoomsCheckinAndCheckout(checkin, checkout, capacite,
                vue, prixMin,
                prixMax, chaine, classement, chambreMin, chambreMax, etendre);
        List<ChambreHotelDTO> rawResultFormatted = rawResult.stream()
                .map(item -> ChambreHotelMapper.mapFromObjectToChambreHotelDTO(item)).toList();
        return rawResultFormatted;
    }

    // Tous les filtres specifies except checkin
    public List<ChambreHotelDTO> getAllRoomsCheckoutOnly(Date checkin, Date checkout, String capacite, String vue,
            Double prixMin,
            Double prixMax, String chaine, Integer classement, Integer chambreMin, Integer chambreMax,
            Boolean etendre) {
        List<Object[]> rawResult = this.chambreRepository.getAllRoomsCheckoutOnly(checkin, checkout, capacite, vue,
                prixMin,
                prixMax, chaine, classement, chambreMin, chambreMax, etendre);
        List<ChambreHotelDTO> rawResultFormatted = rawResult.stream()
                .map(item -> ChambreHotelMapper.mapFromObjectToChambreHotelDTO(item)).toList();
        return rawResultFormatted;
    }

    // Tous les filtres specifies except checkout
    public List<ChambreHotelDTO> getAllRoomsCheckinOnly(Date checkin, Date checkout, String capacite, String vue,
            Double prixMin,
            Double prixMax, String chaine, Integer classement, Integer chambreMin, Integer chambreMax,
            Boolean etendre) {
        List<Object[]> rawResult = this.chambreRepository.getAllRoomsCheckinOnly(checkin, checkout, capacite, vue,
                prixMin,
                prixMax, chaine, classement, chambreMin, chambreMax, etendre);
        List<ChambreHotelDTO> rawResultFormatted = rawResult.stream()
                .map(item -> ChambreHotelMapper.mapFromObjectToChambreHotelDTO(item)).toList();
        return rawResultFormatted;
    }

    // Checkin et checkout pas specifies
    public List<ChambreHotelDTO> getAllRoomsNoDates(String capacite, String vue, Double prixMin,
            Double prixMax, String chaine, Integer classement, Integer chambreMin, Integer chambreMax,
            Boolean etendre) {
        List<Object[]> rawResult = this.chambreRepository.getAllRoomsNoDates(capacite, vue, prixMin,
                prixMax, chaine, classement, chambreMin, chambreMax, etendre);
        List<ChambreHotelDTO> rawResultFormatted = rawResult.stream()
                .map(item -> ChambreHotelMapper.mapFromObjectToChambreHotelDTO(item)).toList();
        return rawResultFormatted;
    }

    // Get tous les commoditees d une chambre specifique
    public List<String> getAllCommoditees(Integer idHotel, Integer numero_chambre) {
        List<Object[]> rawResult = this.chambreRepository.getAllCommoditees(idHotel, numero_chambre);
        List<String> rawResultFormatted = new ArrayList<>();

        if (rawResult.size() != 0) {
            rawResultFormatted = rawResult.stream()
                    .map(item -> (String) item[0]).toList();
        }

        return rawResultFormatted;
    }

    public Chambre updateChambre(Chambre chambre) {
        Chambre existingChambre = chambreRepository.findByNumeroChambre(chambre.getNumeroChambre());
        existingChambre.setNumeroChambre(chambre.getNumeroChambre());
        existingChambre.setIdHotel(chambre.getIdHotel());
        existingChambre.setPrix(chambre.getPrix());
        existingChambre.setCapaciteChambre(chambre.getCapaciteChambre());
        existingChambre.setVueChambre(chambre.getVueChambre());
        existingChambre.setCapaciteAEtendre(chambre.getCapaciteAEtendre());
        return chambreRepository.save(existingChambre);
    }

    public void deleteChambre(Integer idHotel, Integer numChambre) {
        Chambre existingChambre = chambreRepository.findByIdHotelAndNumeroChambre(idHotel, numChambre);
        chambreRepository.delete(existingChambre);
    }

}
