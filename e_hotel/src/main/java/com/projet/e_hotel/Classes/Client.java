package com.projet.e_hotel.Classes;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

// @Getter
@Setter
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

    public Client() {
        
    }

    public Client(String nas, String prenom, String nomFamille, Integer numero, String rue, String ville, String province, String pays, String codePostal) {
        this.nas = nas;
        this.prenom = prenom;
        this.nomFamille = nomFamille;
        this.numero = numero;
        this.rue = rue;
        this.ville = ville;
        this.province = province;
        this.pays = pays;
        this.codePostal = codePostal;
    }

}