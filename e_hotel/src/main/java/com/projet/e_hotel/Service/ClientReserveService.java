package com.projet.e_hotel.Service;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;
import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Repository.ClientReserveRepository;

@Service
public class ClientReserveService {
    
    final ClientReserveRepository clientReserveRepository;

    public ClientReserveService(ClientReserveRepository clientReserveRepository) {
        this.clientReserveRepository = clientReserveRepository;
    }

    public List<ClientReserve> getAllActiveReservations(Integer idHotel){
        return this.clientReserveRepository.findAllByIdHotel(idHotel);
    }

    // custom method to save reservation for a client from a client side

    public void saveBooking(String idClient,Integer numeroChambre,Integer idHotel,
    Date dateCheckin,Date dateCheckout,Double prix,Boolean isPaiementComplete,Date datePaiementComplete){
        clientReserveRepository.saveBooking(idClient,numeroChambre,idHotel,dateCheckin,dateCheckout,
        prix,isPaiementComplete,datePaiementComplete);
    }
}
