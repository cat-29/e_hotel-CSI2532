package com.projet.e_hotel.Classes.pk;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;

public class LoueChambrePK implements Serializable {

    @JoinColumn(name = "numero_chambre", nullable = false, referencedColumnName = "numero_chambre")
    private Integer numeroChambre;

    @JoinColumn(name = "id_hotel", referencedColumnName = "id_hotel")
    private Integer idHotel;

    @JoinColumn(name = "id_client", referencedColumnName = "nas")
    private String idClient;

    @JoinColumn(name = "id_employe", referencedColumnName = "nas")
    private String idEmploye;

    @Column(name = "date_checkin")
    private Date dateCheckin;

    @Column(name = "date_checkout")
    private Date dateCheckout;

}
