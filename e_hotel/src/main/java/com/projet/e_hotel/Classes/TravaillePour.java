package com.projet.e_hotel.Classes;

import com.projet.e_hotel.Classes.Enum.RoleEmployeeEnum;
import com.projet.e_hotel.Classes.pk.TravaillePourPK;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "travaille_pour")
public class TravaillePour {

    // Primary keys
    @EmbeddedId
    private TravaillePourPK travaillePourPK;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RoleEmployeeEnum roleEmployee;
}
