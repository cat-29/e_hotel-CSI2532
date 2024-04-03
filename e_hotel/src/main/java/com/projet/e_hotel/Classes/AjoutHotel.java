package com.projet.e_hotel.Classes;

import com.projet.e_hotel.Classes.pk.AjoutHotelPK;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
// @Table(name = "hotel")
public class AjoutHotel {

    @Id
    // @SequenceGenerator(name = "seq", sequenceName = "hotel_id_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hotel")
    private Integer id;

    @Column(name = "nom_chaine")
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

    public AjoutHotel(String nomChaine, String nom, Integer rating, Integer nbrChambre, Integer numero,
            String rue, String ville,
            String province, String pays, String codePostal) {
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

    public AjoutHotel() {
    }

}
