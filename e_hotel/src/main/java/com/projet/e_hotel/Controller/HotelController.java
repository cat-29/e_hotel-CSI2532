package com.projet.e_hotel.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Classes.dto.HotelCapaciteDto;
import com.projet.e_hotel.Classes.dto.HotelDTO;
import com.projet.e_hotel.Classes.mapper.HotelMapper;
import com.projet.e_hotel.Service.HotelService;

@RestController
@RequestMapping("/hotel")
public class HotelController {
    @Autowired
    private HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    // Utilise pour avoir toutes les capacites de tous les hotels
    @GetMapping("/getCapaciteAllRooms")
    public List<HotelCapaciteDto> getCapaciteAllRooms() {
        List<HotelCapaciteDto> res = hotelService.getCapaciteAllRooms();
        return res;
    }

    @GetMapping("/{id}")
    public HotelDTO getHotel(@PathVariable Integer id) {
        return HotelMapper.mapToHotelDTO(hotelService.getHotelInfo(id));
    }

}
