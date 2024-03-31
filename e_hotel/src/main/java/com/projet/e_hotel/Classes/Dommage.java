package com.projet.e_hotel.Classes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "dommage")
@Entity
public class Dommage {

    @Id
    @Column(name = "id_dommage")
    private Integer idDommage;

    @Column(name = "type_dommage")
    private String typeDommage;
}
