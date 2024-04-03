package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
// Dto used to receive data from frontend
public class ClientReserveChambreDto {
    private String idClient;
    private Integer numeroChambre;
    private Integer idHotel;
    private String dateCheckin;
    private String dateCheckout;
    private Double prix;
    private String datePaiementComplete;
    private Boolean isPaiementComplete;
}
