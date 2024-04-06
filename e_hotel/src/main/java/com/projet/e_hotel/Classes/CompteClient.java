package com.projet.e_hotel.Classes;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Entity 
@Table(name = "compte_client")
public class CompteClient {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_compte")
    private Long id;

    @JsonProperty("nas")
    @Getter
    @JoinColumn(name = "id_client", referencedColumnName = "nas")
    private String idClient;

    @Getter
    @Column(name = "email")
    private String email;

    @JsonProperty("pwd")
    @Getter
    @Column(name = "password")
    private String password;

    public CompteClient() {
        
    }

    public CompteClient(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public CompteClient(String idClient, String email, String password) {
        this.idClient = idClient;
        this.email = email;
        this.password = password;
    }
}
