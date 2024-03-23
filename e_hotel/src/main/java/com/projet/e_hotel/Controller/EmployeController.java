package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Classes.dto.ActiveReservationDTO;
import com.projet.e_hotel.Classes.dto.ClientDTO;
import com.projet.e_hotel.Classes.dto.ClientReserveDTO;
import com.projet.e_hotel.Classes.dto.LoueChambreDTO;
import com.projet.e_hotel.Classes.mapper.ActiveReservationMapper;
import com.projet.e_hotel.Classes.mapper.ClientMapper;
import com.projet.e_hotel.Classes.mapper.ClientReserveMapper;
import com.projet.e_hotel.Classes.mapper.LoueChambreMapper;
import com.projet.e_hotel.Service.ClientReserveService;
import com.projet.e_hotel.Service.ClientService;
import com.projet.e_hotel.Service.HotelService;
import com.projet.e_hotel.Service.LoueChambreService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employe")
public class EmployeController {

        private final ClientReserveService clientReserveService;
        private final ClientService clientServiceImpl;
        private final LoueChambreService loueChambreService;
        private final HotelService hotelService;

        public EmployeController(ClientReserveService clientReserveService, ClientService clientServiceImpl,
                        LoueChambreService loueChambreService, HotelService hotelService) {
                this.clientReserveService = clientReserveService;
                this.clientServiceImpl = clientServiceImpl;
                this.loueChambreService = loueChambreService;
                this.hotelService = hotelService;
        }

        @GetMapping("/activeReservation/{idHotel}")
        public List<ActiveReservationDTO> getAllActiveReservations(@PathVariable Integer idHotel) {

                // get all reservations
                List<ClientReserve> listReservations = clientReserveService.getAllActiveReservations(idHotel);
                List<ClientReserveDTO> listClientReserveDTO = listReservations.stream()
                                .map(r -> ClientReserveMapper.mapToClientReserveDTO(r)).toList();

                List<Client> listClient = listReservations.stream()
                                .map(r -> clientServiceImpl.getClientFromId(r.getIdClient()))
                                .toList();
                List<ClientDTO> listClientDTO = listClient.stream().map(r -> ClientMapper.mapToClientDTO(r)).toList();

                List<LoueChambreDTO> listLoueChambreDTOs = listReservations.stream()
                                .map(r -> loueChambreService.getAllLocations(r.getIdClient(), r.getIdHotel(), r.getDateCheckin(),
                                                r.getDateCheckout()))
                                .toList().stream().map(map -> LoueChambreMapper.mapToLoueChambreDTO(map)).toList();
                return ActiveReservationMapper.mapToActiveReservationDTOList(listClientReserveDTO, listClientDTO,
                                listLoueChambreDTOs);
        }

        @PostMapping("/activeReservation/loueChambre")
        public LoueChambreDTO saveNewLocation(@RequestBody ActiveReservationDTO aDto) {
                ActiveReservationDTO dto = new ActiveReservationDTO(aDto);

                // get client to add email in enregistre client
                // Client client = clientServiceImpl.getClientFromId(aDto.getIdClient());

                // save enregistre client
                // clientServiceImpl.setEnregistrementClient(client, aDto.getIdEmploye());
                
                return LoueChambreMapper.mapToLoueChambreDTO(loueChambreService.saveNewLocation(dto));
        }

        @GetMapping("/worksFor/{idHotel}")
        public String getNameHotelEmployeWorksFor(@PathVariable Integer idHotel) {
                return this.hotelService.getNameHotel(idHotel).getNom();
        }

}
