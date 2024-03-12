package com.projet.e_hotel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)    
    @Column(name = "nas")
    private Integer idclient;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "nom_famille")
    private String nomFamille;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "rue")
    private String rue;

    @Column(name = "ville")
    private String ville;
    
    @Column(name = "province")
    private char province;

    @Column(name = "pays")
    private String pays;

    @Column(name = "code_postal")
    private char codePostal;
}