package com.projet.e_hotel.Classes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

}
