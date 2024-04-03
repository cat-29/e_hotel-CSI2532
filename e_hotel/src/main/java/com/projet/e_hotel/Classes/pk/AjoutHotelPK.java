package com.projet.e_hotel.Classes.pk;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

public class AjoutHotelPK implements Serializable {

    @Column(name = "id_hotel")
    private Integer id;

    // @JoinColumn(name = "nom_chaine", referencedColumnName = "nom_chaine")
    // private String nomChaine;

    // @Column(name = "nom")
    // private String nom;

    // @Column(name = "num_etoile")
    // private Integer rating;

    // @Column(name = "nbr_chambre")
    // private Integer nbrChambre;

    // @Column(name = "numero")
    // private Integer numero;

    // @Column(name = "rue")
    // private String rue;

    // @Column(name = "ville")
    // private String ville;

    // @Column(name = "province")
    // private String province;

    // @Column(name = "pays")
    // private String pays;

    // @Column(name = "code_postal")
    // private String codePostal;
}
