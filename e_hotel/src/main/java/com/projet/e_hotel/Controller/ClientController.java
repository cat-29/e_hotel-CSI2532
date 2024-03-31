package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.dto.ClientDTO;
import com.projet.e_hotel.Classes.dto.ClientReserveChambreDto;
import com.projet.e_hotel.Classes.dto.EmployeAjouteLocationDTO;
import com.projet.e_hotel.Classes.mapper.ClientMapper;
import com.projet.e_hotel.Service.ClientReserveService;
import com.projet.e_hotel.Service.ClientService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;
    @Autowired
    private ClientReserveService clientReserveService;

    @PostMapping("addClient")
    
    public Client addAccount(@RequestBody Client client){
        return clientService.saveClient(client);
    }

    @GetMapping("/{idClient}")
    public Boolean doesClientExist(@PathVariable String idClient) {
        return clientService.doesClientExist(idClient).isPresent();
    }

    @PostMapping("/create")
    public ClientDTO createClient(@RequestBody EmployeAjouteLocationDTO aDto) {
        return ClientMapper.mapToClientDTO(clientService.createClient(aDto));
    }
    
    // Add an online booking
    @PostMapping("/addReservation")
    public void addReservation(@RequestBody ClientReserveChambreDto reservationDto) throws ParseException{
        // System.out.println(reservation);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinFormatted = sdf.parse(reservationDto.getDateCheckin());
        Date checkoutFormatted = sdf.parse(reservationDto.getDateCheckout());
        Date datePaiementComplete = null;
        // System.out.println("reservation date paiement complete   "+ reservationDto.getDatePaiementComplete());
        if (reservationDto.getIsPaiementComplete()){
            datePaiementComplete = sdf.parse(reservationDto.getDatePaiementComplete());
        }

        clientReserveService.saveBooking(reservationDto.getIdClient(),reservationDto.getNumeroChambre(),
            reservationDto.getIdHotel(),checkinFormatted,checkoutFormatted,
            reservationDto.getPrix(),reservationDto.getIsPaiementComplete(),datePaiementComplete);
    }   
}
