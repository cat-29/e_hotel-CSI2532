package com.projet.e_hotel.Classes;

import java.util.Date;
import com.projet.e_hotel.Classes.pk.ClientReservePK;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "client_reserve")
@IdClass(ClientReservePK.class)
public class ClientReserve {

    @Id
    private String idClient;

    @Id
    private Integer numeroChambre;

    @Id
    private Integer idHotel;

    @Id
    private Date dateCheckin;

    @Id
    private Date dateCheckout;

    @Column(name = "prix")
    private Double prix;
}