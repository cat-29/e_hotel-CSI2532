package com.projet.e_hotel.Classes.pk;

import java.io.Serializable;
import jakarta.persistence.Column;
public class AjoutHotelPK implements Serializable {

    @Column(name = "id_hotel")
    private Integer id;
}
