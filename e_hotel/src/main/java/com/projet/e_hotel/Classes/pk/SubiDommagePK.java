package com.projet.e_hotel.Classes.pk;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;

public class SubiDommagePK implements Serializable {
    
    @Column(name = "id_dommage")
    private Integer idDommage;

    @JoinColumn(name = "numero_chambre", referencedColumnName = "numero_chambre")
    private Integer numeroChambre;

    @JoinColumn(name = "id_hotel", referencedColumnName = "id_hotel")
    private Integer idHotel;
}
