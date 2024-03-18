package com.projet.e_hotel.Classes.pk;

import java.io.Serializable;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;

@Embeddable
public class TravaillePourPK implements Serializable {
    
    @JoinColumn(name = "id_hotel", referencedColumnName = "id_hotel")
    private String hotel;

    @JoinColumn(name = "id_employe", referencedColumnName = "nas")
    private String employe;
}
