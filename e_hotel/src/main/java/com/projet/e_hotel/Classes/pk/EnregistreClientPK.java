package com.projet.e_hotel.Classes.pk;

import java.io.Serializable;
import jakarta.persistence.JoinColumn;

public class EnregistreClientPK implements Serializable {
    
    @JoinColumn(name = "id_employe", referencedColumnName = "nas")
    private String idEmploye;

    @JoinColumn(name = "id_client", referencedColumnName = "nas")
    private String idClient;
}
