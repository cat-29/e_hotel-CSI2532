package com.projet.e_hotel.Classes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity 
@Table(name = "compte_client")
public class CompteClient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_compte")
    private Long id;

    @JoinColumn(name = "id_client", referencedColumnName = "nas")
    private String idClient;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public CompteClient(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public CompteClient() {
        
    }
}
