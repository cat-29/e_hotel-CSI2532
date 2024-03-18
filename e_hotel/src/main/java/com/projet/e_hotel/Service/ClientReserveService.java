package com.projet.e_hotel.Service;
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
}
