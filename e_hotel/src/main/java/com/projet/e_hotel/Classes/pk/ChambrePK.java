package com.projet.e_hotel.Classes.pk;

import java.io.Serializable;
import jakarta.persistence.Column;

public class ChambrePK implements Serializable {
    
    @Column(name = "numero_chambre")
    private Integer numeroChambre;

    @Column(name = "id_hotel")
    private Integer idHotel;
}
