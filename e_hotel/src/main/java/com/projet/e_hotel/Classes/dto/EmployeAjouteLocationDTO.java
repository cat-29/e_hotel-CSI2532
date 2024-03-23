package com.projet.e_hotel.Classes.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeAjouteLocationDTO {
    private String nas;
    private String prenom;
    private String nomFamille;
    private Integer numero;
    private String rue;
    private String ville;
    private String province;
    private String pays;
    private String codePostal;
    private Date dateCheckin;
    private Date dateCheckout;
    private String email;
    private Integer hotel;
    private String nomHotel;
    private String vue;
    private String capacite;
    private Integer numeroChambre;
    private String nasEmploye;
    private Double montantDu;
}
