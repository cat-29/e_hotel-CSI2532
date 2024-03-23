package com.projet.e_hotel.Classes;

import java.util.Date;

import com.projet.e_hotel.Classes.pk.EnregistreClientPK;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "enregistre_client")
@IdClass(EnregistreClientPK.class)
public class EnregistreClient {
    
    @Id
    private String idEmploye;

    @Id
    private String idClient;

    @Column(name = "email")
    private String email;

    @Column(name = "date_enregistrement")
    private Date dateEnregistrement;

    public EnregistreClient() {

    }
    
    public EnregistreClient(String idEmploye, String idClient, String email, Date dateEnregistrement) {
        this.idEmploye = idEmploye;
        this.idClient = idClient;
        this.email = email;
        this.dateEnregistrement = dateEnregistrement;
    }

}
