package com.projet.e_hotel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.Client;
import java.util.Optional;


@Repository
public interface ClientRepository extends JpaRepository<Client, String> {
    Optional<Client> findById(String id);
}

