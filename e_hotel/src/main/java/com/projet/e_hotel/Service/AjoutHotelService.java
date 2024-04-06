package com.projet.e_hotel.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projet.e_hotel.Classes.Hotel;
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
