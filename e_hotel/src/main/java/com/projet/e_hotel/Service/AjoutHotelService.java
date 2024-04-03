package com.projet.e_hotel.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.AjoutHotel;
import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Repository.AjoutHotelRepository;
import com.projet.e_hotel.Repository.HotelRepository;

@Service
public class AjoutHotelService {
    @Autowired
    private HotelRepository hotelRepository;

    public Hotel saveNewHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Hotel findByNomChaine(String nomChaine) {
        return hotelRepository.findByNomChaine(nomChaine);
    }

}
