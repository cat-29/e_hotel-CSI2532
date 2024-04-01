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
@Table(name = "employe")
public class Employe {

    @Id
    @Column(name = "nas")
    private String id;

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
    private String province;

    @Column(name = "pays")
    private String pays;

    @Column(name = "code_postal")
    private String codePostal;

    @Column(name = "role")
    private String roleEmploye;

    @JoinColumn(name = "id_hotel", referencedColumnName = "id_hotel")
    private Integer idHotel;

    public Employe() {

    }


    public Employe(String id, String prenom, String nomFamille, Integer numero, String rue, String ville, String province, String pays, String codePostal) {
        this.id = id;
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
