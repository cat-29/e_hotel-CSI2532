package com.projet.e_hotel.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.Client;

import jakarta.persistence.Id;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {}

