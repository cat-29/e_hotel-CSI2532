package com.projet.e_hotel.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Repository.HotelRepository;

@Service
public class HotelService {
    @Autowired
    private HotelRepository hotelRepository;

    public Hotel getNameHotel(Integer idHotel) {
        return hotelRepository.findById(idHotel).orElseThrow();
    }

    public List<Hotel> getHotelsFromChaine(String nomChaine) {
        return hotelRepository.findHotelsByNomChaine(nomChaine);
    }

}
