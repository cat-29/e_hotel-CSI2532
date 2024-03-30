package com.projet.e_hotel.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.LoueChambre;
import com.projet.e_hotel.Classes.dto.ActiveReservationDTO;
import com.projet.e_hotel.Classes.dto.EmployeAjouteLocationDTO;
import com.projet.e_hotel.Classes.dto.LoueChambreDTO;
import com.projet.e_hotel.Classes.mapper.ActiveReservationMapper;
import com.projet.e_hotel.Classes.mapper.EmployeAjouteLocationMapper;
import com.projet.e_hotel.Classes.mapper.LoueChambreMapper;
import com.projet.e_hotel.Repository.LoueChambreRepository;

@Service
public class LoueChambreService {
    final LoueChambreRepository loueChambreRepository;

    public LoueChambreService(LoueChambreRepository loueChambreRepository) {
        this.loueChambreRepository = loueChambreRepository;
    }

    public LoueChambre getAllLocations(String idClient, Integer idHotel, Date checkIn, Date checkout) {
        return loueChambreRepository.findByIdClientAndIdHotelAndDateCheckinAndDateCheckout(idClient, idHotel, checkIn, checkout)
                .orElse(null);
    }

    public Optional<LoueChambre> getLocation(String idClient, Date checkIn, Date checkout) {
        return loueChambreRepository.findByIdClientAndDateCheckinAndDateCheckout(idClient, checkIn, checkout);
    }

    public LoueChambre saveNewLocation(ActiveReservationDTO aDto, Date checkin, Date checkout) {
        LoueChambreDTO loueChambreDTO = ActiveReservationMapper.mapToLoueChambreDTO(aDto, checkin, checkout);
        LoueChambre lChambre = LoueChambreMapper.mapTLoueChambre(loueChambreDTO);
        return loueChambreRepository.save(lChambre);
    }

    public LoueChambre saveEmployeFaitLocationChambre(EmployeAjouteLocationDTO aDto, Date checkin, Date checkout) {
        LoueChambreDTO loueChambreDTO = EmployeAjouteLocationMapper.mapToLoueChambreDTO(aDto, checkin, checkout);
        LoueChambre loueChambre = LoueChambreMapper.mapTLoueChambre(loueChambreDTO);
        return loueChambreRepository.save(loueChambre);
    }
    
    public List<LoueChambre> getHistoriqueLocationForHotelId(Integer idHotel) {
        return loueChambreRepository.findAllByIdHotel(idHotel);
    }
}
