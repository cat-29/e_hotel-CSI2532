package com.projet.e_hotel.Classes;

import com.projet.e_hotel.Classes.Enum.CapaciteChambreEnum;
import com.projet.e_hotel.Classes.Enum.VueChambreEnum;
import com.projet.e_hotel.Classes.pk.ChambrePK;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "capacite_chambre")
    private CapaciteChambreEnum capaciteChambre;

    @Enumerated(EnumType.STRING)
    @Column(name = "vue")
    private VueChambreEnum vueChambre;

    @Column(name = "capacite_a_etendre")
    private Boolean capaciteAEtendre;
}
