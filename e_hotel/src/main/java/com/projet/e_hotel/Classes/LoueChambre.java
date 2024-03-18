package com.projet.e_hotel.Classes;

import java.util.Date;
import com.projet.e_hotel.Classes.pk.LoueChambrePK;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "loue_chambre")
@IdClass(LoueChambrePK.class)
public class LoueChambre {

    @Id
    private Integer numeroChambre;

    @Id 
    private Integer idHotel;

    @Id
    private String idClient;

    @Id
    private String idEmploye;

    @Id
    private Date dateCheckin;
    
    @Id
    private Date dateCheckout;
    
    @Column(name = "montant_du")
    private Double montantDu;

    @Column(name = "paiement_complete")
    private Boolean isPaiementComplete;

    @Column(name = "date_paiement_complete")
    private Date datePaiementComplete;

    public LoueChambre(Integer numeroChambre, Integer idHotel, String idClient, String idEmploye, Date dateCheckin, Date dateCheckout, Double montantDu, Boolean isPaiementComplete, Date datePaiementComplete) {
        this.numeroChambre = numeroChambre;
        this.idHotel = idHotel;
        this.idClient = idClient;
        this.idEmploye = idEmploye;
        this.dateCheckin = dateCheckin;
        this.dateCheckout = dateCheckout;
        this.montantDu = montantDu;
        this.isPaiementComplete = isPaiementComplete;
        this.datePaiementComplete = datePaiementComplete;
    }

    public LoueChambre() {}
    

}
