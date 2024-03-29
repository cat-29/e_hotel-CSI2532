package com.projet.e_hotel.Classes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor


public class ChambreHotelDTO {
    // Those are hotel variables
    // private Integer id;
    private String nomChaine;
    private String nom;
    private Integer rating;
    private Integer nbrChambre;
    private Integer numero;
    private String rue;
    private String ville;
    private String province;
    private String pays;
    private String codePostal;

    
    // Those are Chambre variables
    private Integer numeroChambre;
    private Integer idHotel;
    private Double prix;
    private String capaciteChambre;
    private String vueChambre;
    private Boolean capaciteAEtendre; 
    
    
    public ChambreHotelDTO(ChambreHotelDTO dto){
        // I dont think we need id hotel from a client perspective that's why I havent include it here
        nomChaine = dto.nomChaine;
        nom = dto.nom;
        rating = dto.rating;
        nbrChambre = dto.nbrChambre;
        numero = dto.numero;
        rue = dto.rue;
        ville = dto.ville;
        province = dto.province;
        pays = dto.pays;
        codePostal = dto.codePostal;
        
        numeroChambre = dto.numeroChambre;
        prix = dto.prix;
        capaciteChambre = dto.capaciteChambre;
        vueChambre = dto.vueChambre;
        capaciteAEtendre = dto.capaciteAEtendre;
    }
    
}

