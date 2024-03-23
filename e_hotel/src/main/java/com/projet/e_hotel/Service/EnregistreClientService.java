package com.projet.e_hotel.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.EnregistreClient;
import com.projet.e_hotel.Classes.dto.EmployeAjouteLocationDTO;
import com.projet.e_hotel.Classes.mapper.EmployeAjouteLocationMapper;
import com.projet.e_hotel.Repository.EnregistreClientRepository;

@Service
public class EnregistreClientService {
    @Autowired
    private EnregistreClientRepository enregistreClientRepository;

    public EnregistreClient saveEnregistreClient(EmployeAjouteLocationDTO aDto) {
        EnregistreClient enregistreClient = EmployeAjouteLocationMapper.mapToEnregistreClient(aDto);
        return enregistreClientRepository.save(enregistreClient);
    }


}
