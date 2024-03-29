package com.projet.e_hotel.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Repository.ChambreRepository;
import com.projet.e_hotel.Repository.ClientReserveRepository;
import com.projet.e_hotel.Repository.LoueChambreRepository;

@Service
public class ChambreService {
    @Autowired
    private ChambreRepository chambreRepository;

    @Autowired
    private ClientReserveRepository clientReserveRepository;

    @Autowired
    private LoueChambreRepository loueChambreRepository;

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

        // Trouve toutes les reservations faites par des clients, respectant les
        // specifications donnees et liste la premiere reservation client pour chaque
        // chambres de l'hotel qui n'est pas affecte par les dates de checkin et
        // checkout de l'utilisateur
        for (int idx = 0; idx < chambres.get().size(); idx++) {
            List<LoueChambre> listeChambreValides = new ArrayList<LoueChambre>();
            List<Chambre> list = chambres.get();
            
            // Check pour des reservations de client fait avec les specifications
            Optional<List<ClientReserve>> listClientReserve = clientReserveRepository
                    .findAllByNumeroChambreAndIdHotel(list.get(idx).getNumeroChambre(), list.get(idx).getIdHotel());
            
            // Il n'y a pas de reservations faites dans le passe pour cette chambre, check
            // dans loue chambre que c'est pareil
            if (!listClientReserve.isPresent()) {
                Optional<List<LoueChambre>> listCheckLoueChambrePresent = loueChambreRepository
                        .findAllByNumeroChambreAndIdHotel(list.get(idx).getNumeroChambre(), list.get(idx).getIdHotel());
                
                // Pas present dans loue chambre aussi, ainsi on peut louer cette chambre
                // Cette chambre a JAMAIS ete reserve et loue. Alors ca fonctionne!
                if (!listCheckLoueChambrePresent.isPresent()) {
                    return chambreRepository.findByNumeroChambre(list.get(idx).getNumeroChambre());
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
                            return chambreRepository.findByNumeroChambre(list2.get(i).getNumeroChambre());
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
                        Optional<List<LoueChambre>> listCheckLoueChambrePresent = loueChambreRepository
                                .findAllByNumeroChambreAndIdHotel(list2.get(i).getNumeroChambre(),
                                        list2.get(i).getIdHotel());

                        if (!listCheckLoueChambrePresent.isPresent()) {
                            // peut faire une location car les dates sont respectee dans la reservation
                            return chambreRepository.findByNumeroChambre(list2.get(i).getNumeroChambre());
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

                Boolean isThisRoomValid = true; // variable qui sera appeler si une chambre est valide ou non 

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
                    // Chambre est valide et la liste qui comportait les chambres valides a un size plus grand que 1
                    if (listeChambreValides.size() > 0) {
                        return chambreRepository.findByNumeroChambre(listeChambreValides.get(0).getNumeroChambre());
                    }
                }
            }
        }

        // Rien n'a ete trouve. On retourne null et le client doit changer ces filtres.
        return null;
    }

    public Boolean checkIfDatesAreRespected(Date user_checkIn, Date user_checkOut, Date db_checkIn, Date db_checkOut) {

        System.out.println("\n\t\t DATES to be checked are user_checkIn =\t" + user_checkIn + ", user_checkOut = \t"
                + user_checkOut + "\tcheckIn= " + db_checkIn + ",\tCheckout = " + db_checkOut);
        if (user_checkIn.equals(db_checkIn) || user_checkOut.equals(db_checkOut)) {
            System.out.println("\n\tcheckin: EQUAL\tcheckout: EQUAL\n");
            return false;
        }
        // Check if dates are between
        // Date db_checkIn greater than db_checkIn date OR smaller than previous
        // db_checkOut date
        else if ((user_checkIn.after(db_checkIn)) && (user_checkOut.before(db_checkOut))) {

            // Both dates are between the db_checkIn and db_checkOut date so return false
            // user_checkIn = 10mars, db_checkIn=8mars, user_checkOut=12mars,
            // db_checkOut=14mars
            System.out.println("\n\tcheckin: AFTER\tcheckout: BEFORE\n");
            return false;

        } else if (user_checkIn.before(db_checkIn)
                && (user_checkOut.after(db_checkIn) && user_checkOut.before(db_checkOut))) {

            // user_checkIn = 8mars, db_checkIn=10mars, user_checkOut=12mars,
            // db_checkOut=14mars
            // Date2 is between the CheckIn and CheckOut date, so return false
            System.out.println("\n\tcheckin: BEFORE\tcheckout: ENTRE\n");
            return false;

        } else if ((user_checkIn.after(db_checkIn) && user_checkIn.before(db_checkOut))
                && (user_checkOut.after(db_checkOut))) {

            // user_checkIn = 10mars, db_checkIn=8mars, user_checkOut=14mars,
            // db_checkOut=12mars
            // Date1 is between the CheckIn and CheckOut date, so return false
            System.out.println("\n\tcheckin: ENTRE\tcheckout: AFTER\n");
            return false;

        } else if (user_checkIn.before(db_checkIn) && user_checkOut.after(db_checkOut)) {

            // user_checkIn = 8mars, db_checkIn=10mars, user_checkOut=14mars,
            // db_checkOut=12mars
            System.out.println("\n\tcheckin: BEFORE\tcheckout: AFTER\n");

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

}
