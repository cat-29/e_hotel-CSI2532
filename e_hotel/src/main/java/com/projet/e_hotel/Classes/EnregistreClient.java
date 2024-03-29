package com.projet.e_hotel.Classes;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "enregistre_client")
public class EnregistreClient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "id_employe")
    private String idEmploye;

    @Column(name = "id_client")
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
