package com.projet.e_hotel.Classes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "capacite_chambre_type")
public class CapaciteChambreType {
    
    @Id
    @Column(name = "type")
    private String type;


    public CapaciteChambreType(String type) {
        this.type = type;
    }

}
