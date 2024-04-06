package com.projet.e_hotel.Classes;

import com.projet.e_hotel.Classes.pk.ChambrePK;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "chambre")
@IdClass(ChambrePK.class)
public class Chambre {

    @Id
    private Integer numeroChambre;

    @Id
    private Integer idHotel;

    @Column(name = "prix")
    private Double prix;

    @JoinColumn(name = "capacite_chambre", referencedColumnName = "type")
    private String capaciteChambre;

    @JoinColumn(name = "vue_chambre", referencedColumnName = "type")
    private String vueChambre;

    @Column(name = "capacite_a_etendre")
    private Boolean capaciteAEtendre;

    public Chambre(Integer numeroChambre, Integer idHotel, Double prix, String capaciteChambre, String vueChambre,
            Boolean capaciteAEtendre) {
        this.numeroChambre = numeroChambre;
        this.idHotel = idHotel;
        this.prix = prix;
        this.capaciteChambre = capaciteChambre;
        this.vueChambre = vueChambre;
        this.capaciteAEtendre = capaciteAEtendre;
    }

    public Chambre(Integer numeroChambre, Integer idHotel) {
        this.numeroChambre = numeroChambre;
        this.idHotel = idHotel;
    }

    public Chambre() {
    }
}
