package com.projet.e_hotel.Classes;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;


@Entity
@Table(name = "compte")
public class Compte {
    @Getter
    @Id
    @JsonProperty("email")
    @Column (name = "email")
    private String email;

    @JsonProperty("motDePasse")
    @Getter
    @Column (name = "pwd")
    private String pwd;

    public Compte (){}

}
