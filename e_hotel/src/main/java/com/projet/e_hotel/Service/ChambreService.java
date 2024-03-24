package com.projet.e_hotel.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Repository.ChambreRepository;
import com.projet.e_hotel.Repository.ClientReserveRepository;

@Service
public class ChambreService {
    @Autowired
    private ChambreRepository chambreRepository;

    @Autowired
    private ClientReserveRepository clientReserveRepository;

    public ChambreService() {

    }

    public Chambre getNumeroChambreForSpecifications(Integer hotelId, Date dateCheckIn, Date dateCheckOut,
            String capacite, String vue) {

        // Va chercher toutes les chambres dans hotelId
        Optional<List<Chambre>> chambres = chambreRepository.findByIdHotelAndCapaciteChambreAndVueChambre(hotelId,
                capacite, vue);

        // Pas de chambres, on retourne null
        if (!chambres.isPresent()) {
            return null;
        }

        // Liste des numeros des chambres pour l'hotel specifie
        List<Integer> listeNumChambre = chambreRepository.findByIdHotel(hotelId).get().stream()
                .map(r -> r.getNumeroChambre()).toList();

        // Trouve toutes les reservations faites par des clients, respectant les
        // specifications donnees et liste la premiere reservation client pour chaque
        // chambres de l'hotel qui n'est pas affecte par les dates de checkin et
        // checkout de l'utilisateur
        List<Optional<ClientReserve>> listAllRoomsPreviouslyReserved = chambres.get().stream()
                .map(r -> clientReserveRepository.findAllByNumeroChambreAndIdHotel(r.getNumeroChambre(), r.getIdHotel())
                        .get().stream().filter(i -> checkIfDatesAreRespected(dateCheckOut, dateCheckOut,
                                i.getDateCheckin(), i.getDateCheckout()))
                        .findFirst())
                .toList();

        for (int i = 0; i < listAllRoomsPreviouslyReserved.size(); i++) {
            if (listAllRoomsPreviouslyReserved.get(i).isPresent()) {
                System.out.println("\n\tUne chambre de libre a ete trouvee.\n");

                // Retourne la premiere chambre qui est disponible, si elle est presente dans la
                // liste
                return chambreRepository
                        .findAllByNumeroChambre(listAllRoomsPreviouslyReserved.get(i).get().getNumeroChambre()).get(0);
            }
        }

        // Dates pas respectees, continue
        // Si les dates ne respectent pas les reservations, alors liste toute les
        // chambres de l'hotel qui ont une reservation retourne la premiere chambre de
        // l'hotel qui n'a jamais eu de reservations dans le passee, si il y a en une
        List<Integer> numRoomFromReservation = new ArrayList<Integer>();
        for (int i = 0; i < chambres.get().size(); i++) {
            Chambre chambreInfo = chambres.get().get(i);
            Optional<ClientReserve> wasRoomReservedBefore = clientReserveRepository
                    .findByNumeroChambreAndIdHotel(chambreInfo.getNumeroChambre(), chambreInfo.getIdHotel());
            if (!wasRoomReservedBefore.isPresent()) {
                System.out.println("\n\tChambre pas trouve selon le numero de la chambre et le id de l'hotel.\n");
                return null;
            }
            numRoomFromReservation.add(wasRoomReservedBefore.get().getNumeroChambre());
        }

        // Met en ordre les listes pour comparer si les numeros des chambres ont deja
        // ete reservee ou non
        Collections.sort(numRoomFromReservation);
        Collections.sort(listeNumChambre);

        // Check si une chambre n'a jamais ete reservee dans le passee
        Integer numeroChambreResult = checkIfNumChambreNotInReserve(numRoomFromReservation, listeNumChambre);

        if (numeroChambreResult == null) {
            // Aucune chambre trouvee. Usagee doit changer ces filtres.
            return null;
        }

        // Une chambre a ete trouvee. Retourne l'objet chambre contenant les
        // informations.
        return chambreRepository.findByNumeroChambre(numeroChambreResult);
    }

    public Integer checkIfNumChambreNotInReserve(List<Integer> list1, List<Integer> list2) {

        for (int i = 0; i < list1.size(); i++) {
            if (list1.get(i).intValue() == list2.get(i).intValue()) {
                return list1.get(i);
            }
        }
        // nothing found
        return null;

    }

    public Boolean checkIfDatesAreRespected(Date date1, Date date2, Date checkIn, Date checkOut) {

        if (date1.equals(checkIn) || date2.equals(checkOut)) {
            System.out.println("\n\tcheckin: EQUAL\tcheckout: EQUAL\n");
            return false;
        }
        // Check if dates are between
        // Date checkIn greater than checkIn date OR smaller than previous checkOut date
        else if ((date1.after(checkIn)) && (date2.before(checkOut))) {
            // Both dates are between the checkIn and checkOut date so return false
            // date1 = 10mars, checkIn=8mars, date2=12mars, checkOut=14mars
            System.out.println("\n\tcheckin: AFTER\tcheckout: BEFORE\n");
            return false;
        } else if (date1.before(checkIn) && (date2.after(checkIn) && date2.before(checkOut))) {
            // date1 = 8mars, checkIn=10mars, date2=12mars, checkOut=14mars
            // Date2 is between the CheckIn and CheckOut date, so return false
            System.out.println("\n\tcheckin: BEFORE\tcheckout: ENTRE\n");
            return false;
        } else if ((date1.after(checkIn) && date1.before(checkOut)) && (date2.after(checkOut))) {
            // date1 = 10mars, checkIn=8mars, date2=14mars, checkOut=12mars
            // Date1 is between the CheckIn and CheckOut date, so return false
            System.out.println("\n\tcheckin: ENTRE\tcheckout: AFTER\n");
            return false;
        } else if (date1.before(checkIn) && date2.after(checkOut)) {
            // date1 = 8mars, checkIn=10mars, date2=14mars, checkOut=12mars
            System.out.println("\n\tcheckin: BEFORE\tcheckout: AFTER\n");
            // Both the checkIn and checkOut dates are between date1 and date2, so return
            // false
            return false;
        }

        // Les checkIns et CheckOuts n'interferent pas les nouvelles dates de reservations
        return true;
    }

    public List<Chambre> getAllRooms(){
        return this.chambreRepository.findAll();
    }

}

