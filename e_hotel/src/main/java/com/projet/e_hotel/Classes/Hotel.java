package com.projet.e_hotel.Classes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hotel")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hotel")
    private Integer id;

    @JoinColumn(name = "nom_chaine", referencedColumnName = "nom_chaine")
    private String nomChaine;

    @Column(name = "nom")
    private String nom;

    @Column(name = "num_etoile")
    private Integer rating;

    @Column(name = "nbr_chambre")
    private Integer nbrChambre;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "rue")
    private String rue;

    @Column(name = "ville")
    private String ville;

    @Column(name = "province")
    private String province;

    @Column(name = "pays")
    private String pays;

    @Column(name = "code_postal")
    private String codePostal;

    public Hotel(String nomChaine, String nom, Integer rating, Integer nbrChambre, Integer numero, String rue,
            String ville, String province, String pays, String codePostal) {
        this.nomChaine = nomChaine;
        this.nom = nom;
        this.rating = rating;
        this.nbrChambre = nbrChambre;
        this.numero = numero;
        this.rue = rue;
        this.ville = ville;
        this.province = province;
        this.pays = pays;
        this.codePostal = codePostal;
    }

    public Hotel(Integer id, String nomChaine, String nom, Integer rating, Integer nbrChambre, Integer numero,
            String rue,
            String ville, String province, String pays, String codePostal) {
        this.id = id;
        this.nomChaine = nomChaine;
        this.nom = nom;
        this.rating = rating;
        this.nbrChambre = nbrChambre;
        this.numero = numero;
        this.rue = rue;
        this.ville = ville;
        this.province = province;
        this.pays = pays;
        this.codePostal = codePostal;
    }

    public Hotel() {
    }

    public Hotel orElseThrow() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }

}
