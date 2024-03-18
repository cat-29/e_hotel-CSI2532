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
public class ChaineHoteliere {
    
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
}
