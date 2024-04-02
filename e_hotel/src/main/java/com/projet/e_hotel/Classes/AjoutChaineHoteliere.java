package com.projet.e_hotel.Classes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "chaine_hoteliere")
public class AjoutChaineHoteliere {

    @Id
    @Column(name = "nom_chaine")
    private String nomChaine;

    @Column(name = "nbr_hotel")
    private Integer nbrHotel;

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

    public AjoutChaineHoteliere(String nomChaine, Integer nbrHotel, Integer numero, String rue, String ville,
            String province, String pays, String codePostal) {
        this.nomChaine = nomChaine;
        this.nbrHotel = nbrHotel;
        this.numero = numero;
        this.rue = rue;
        this.ville = ville;
        this.province = province;
        this.pays = pays;
        this.codePostal = codePostal;
    }

    public AjoutChaineHoteliere() {
    }

}
