package com.projet.e_hotel.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.Employe;
import com.projet.e_hotel.Repository.EmployeRepository;

@Service
public class EmployeService {
    @Autowired
    private EmployeRepository employeRepository;

    public List<Employe> getEmployesFromHotel(Integer id) {
        return employeRepository.findAllByIdHotel(id);
    }

    public Employe saveNewEmploye(Employe employe) {
        return employeRepository.save(employe);
    }
}
