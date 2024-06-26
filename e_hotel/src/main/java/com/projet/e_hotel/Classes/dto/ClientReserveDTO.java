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
// Le dto qui communique avec la base de données
public class ClientReserveDTO {
    private String idClient;
    private Integer numeroChambre;
    private Integer idHotel;
    private Date dateCheckin;
    private Date dateCheckout;
    private Double prix;
    private Boolean isPaiementComplete;
    private Date datePaiementComplete;
}
