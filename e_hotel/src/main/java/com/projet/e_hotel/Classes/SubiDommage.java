package com.projet.e_hotel.Classes;

import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import com.projet.e_hotel.Classes.pk.SubiDommagePK;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "subi_dommage")
@IdClass(SubiDommagePK.class)
public class SubiDommage {
    
    @Id
    private Integer idDommage;

    @Id
    private Integer numeroChambre;

    @Id
    private Integer idHotel;

    public SubiDommage() {

    }
    
    public SubiDommage(Integer idDommage, Integer numeroChambre, Integer idHotel) {
        this.idDommage = idDommage;
        this.numeroChambre = numeroChambre;
        this.idHotel = idHotel;
    }
}

   
