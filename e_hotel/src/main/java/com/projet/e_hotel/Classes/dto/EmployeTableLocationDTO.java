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
public class EmployeTableLocationDTO {
    private String idClient;    
    private String idEmploye;
    private String prenom;
    private String nomFamille;
    private Integer numeroChambre;
    private Integer idHotel;
    private Date dateCheckin;
    private Date dateCheckout;
    private Double montantDu;
    private Boolean isPaiementComplete;
    private Date datePaiementComplete;
}
