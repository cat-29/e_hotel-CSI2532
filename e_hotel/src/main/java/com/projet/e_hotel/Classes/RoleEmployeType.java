package com.projet.e_hotel.Classes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "role_employe_type")
public class RoleEmployeType {
    
    @Id
    @Column(name = "type")
    private String type;
}
