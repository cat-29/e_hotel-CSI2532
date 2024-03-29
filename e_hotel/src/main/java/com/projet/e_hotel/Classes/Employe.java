package com.projet.e_hotel.Classes;

import com.projet.e_hotel.Classes.Enum.RoleEmployeeEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RoleEmployeeEnum roleEmploye;

    @JoinColumn(name = "id_hotel", referencedColumnName = "id_hotel")
    private Integer idHotel;
}
