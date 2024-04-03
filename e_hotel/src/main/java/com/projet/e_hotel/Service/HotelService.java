package com.projet.e_hotel.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Hotel;
import com.projet.e_hotel.Classes.dto.HotelCapaciteDto;
import com.projet.e_hotel.Classes.mapper.sqlMapping.HotelCapaciteMapper;
import com.projet.e_hotel.Repository.HotelRepository;

@Service
public class HotelService {
    @Autowired
    private HotelRepository hotelRepository;

    public Hotel getNameHotel(Integer idHotel) {
        return hotelRepository.findById(idHotel).orElseThrow();
    }

    public List<Integer> getAllIdHotelsFromChaine(String nomChaine) {
        return hotelRepository.findAllByNomChaine(nomChaine)
                .stream().map(r -> r.getId()).toList();
    }

    public List<Integer> findAllHotelsFromChambreMin(Integer chambreMin) {
        return hotelRepository.findAllByNbrChambreGreaterThanEqual(chambreMin)
                .stream().map(m -> m.getId()).toList();
    }

    public List<Integer> findAllHotelsFromChambreMax(Integer chambreMax) {
        return hotelRepository.findAllByNbrChambreLessThanEqual(chambreMax)
                .stream().map(m -> m.getId()).toList();
    }

    public List<Integer> findAllHotelsFromChambreMinAndChambreMax(Integer chambreMin, Integer chambreMax) {
        return hotelRepository.findAllByNbrChambreBetween(chambreMin, chambreMax)
                .stream().map(m -> m.getId()).toList();
    }

    public List<Hotel> getAllHotelsFromChaine(String nomChaine) {
        return hotelRepository.findAllByNomChaine(nomChaine);
    }

    public List<Hotel> getAllHotelsFromRating(Integer rating) {
        return hotelRepository.findAllByRating(rating);
    }

    public List<Integer> getAllHotelsFromNomChaine(List<String> listNomChaine) {

        // Cree une liste ou on va inserer tout les hotels des chaines en parametre
        List<Hotel> hotelsOfAllChaines = new ArrayList<>();

        // Va chercher tout les hotels pour chaque chaine
        for (int i = 0; i < listNomChaine.size(); i++) {
            List<Hotel> hotelForChaine = getAllHotelsFromChaine(listNomChaine.get(i));

            // Insere chaque id_hotel separement dans la liste qui contient
            // tout les hotels de chaque chaines
            for (int j = 0; j < hotelForChaine.size(); j++) {
                hotelsOfAllChaines.add(hotelForChaine.get(j));
            }
        }

        return hotelsOfAllChaines.stream().map(idx -> idx.getId()).toList();
    }

    public List<Integer> getAllHotelsFromRating(List<Integer> listRating) {

        // Cree une liste ou on va inserer tout les hotels ayant un classement en
        // parametre
        List<Hotel> hotelsOfAllRating = new ArrayList<>();

        // Va chercher tout les hotels pour chaque classement
        for (int i = 0; i < listRating.size(); i++) {
            List<Hotel> hotelForRating = getAllHotelsFromRating(listRating.get(i));

            // Insere chaque id_hotel separement dans la liste qui contient
            // tout les hotels de chaque classement
            for (int j = 0; j < hotelForRating.size(); j++) {
                hotelsOfAllRating.add(hotelForRating.get(j));
            }
        }

        return hotelsOfAllRating.stream().map(idx -> idx.getId()).toList();
    }

    public List<Hotel> getHotelsFromChaine(String nomChaine) {
        return hotelRepository.findHotelsByNomChaine(nomChaine);
    }

    // Pour la vue 2
    public List<HotelCapaciteDto> getCapaciteAllRooms() {
        List<Object[]> rawResult = this.hotelRepository.getCapaciteAllRooms();
        List<HotelCapaciteDto> rawResultFormatted = HotelCapaciteMapper.mapToHotelCapaciteDtoObject(rawResult);

        return rawResultFormatted;
    }

    public Hotel updateHotel(Hotel hotel) {
        Hotel existingHotel = hotelRepository.findById(hotel.getId()).get();
        existingHotel.setId(hotel.getId());
        existingHotel.setNomChaine(hotel.getNomChaine());
        existingHotel.setNom(hotel.getNom());
        existingHotel.setRating(hotel.getRating());
        existingHotel.setNbrChambre(hotel.getNbrChambre());
        existingHotel.setNumero(hotel.getNumero());
        existingHotel.setRue(hotel.getRue());
        existingHotel.setVille(hotel.getVille());
        existingHotel.setProvince(hotel.getProvince());
        existingHotel.setPays(hotel.getPays());
        existingHotel.setCodePostal(hotel.getCodePostal());

        return hotelRepository.save(existingHotel);
    }
}
