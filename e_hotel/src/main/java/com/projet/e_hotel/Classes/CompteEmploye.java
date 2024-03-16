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
@Table(name = "compte_employe")
public class CompteEmploye {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_compte")
    private Long id;

    @JoinColumn(name = "id_employe", referencedColumnName = "nas")
    private String idEmploye;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public CompteEmploye(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public CompteEmploye() {
        
    }
}
