package com.projet.e_hotel.Classes;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

// @Getter
// @Setter
@Entity
@Table(name = "client")
public class Client {

    @Getter
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)    
    @Column(name = "nas")
    private String nas;

    @Getter
    @Column(name = "prenom")
    private String prenom;

    @Getter
    @JsonProperty("nomFamille")
    @Column(name = "nom_famille")
    private String nomFamille;

    @Getter
    @Column(name = "numero")
    private Integer numero;

    @Getter
    @Column(name = "rue")
    private String rue;

    @Getter
    @Column(name = "ville")
    private String ville;
    
    @Getter
    @Column(name = "province")
    private String province;

    @Getter
    @Column(name = "pays")
    private String pays;

    @Getter
    @JsonProperty("codePostal")
    @Column(name = "code_postal")
    private String codePostal;
}