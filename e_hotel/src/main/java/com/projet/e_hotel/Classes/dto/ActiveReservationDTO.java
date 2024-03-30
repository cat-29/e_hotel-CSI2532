package com.projet.e_hotel.Classes.dto;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ActiveReservationDTO {

    private String idClient;
    private String prenom;
    private String nomFamille;
    private Integer numero;
    private String rue;
    private String ville;
    private String province;
    private String pays;
    private String codePostal;
    private Integer numeroChambre;
    private Integer idHotel;
    // private Date dateCheckin;
    // private Date dateCheckout;
    private String dateCheckin;
    private String dateCheckout;
    private Double prix;
    private String idEmploye;
    private Double montantDu;
    private Boolean isPaiementComplete;
    private Date datePaiementComplete;
    private Boolean isUserCheckedInLocation;

    public ActiveReservationDTO(ActiveReservationDTO aDto) {

        idClient = aDto.idClient;
        prenom = aDto.prenom;
        nomFamille = aDto.nomFamille;
        numero = aDto.numero;
        rue = aDto.rue;
        ville = aDto.ville;
        province = aDto.province;
        pays = aDto.pays;
        codePostal = aDto.codePostal;
        numeroChambre = aDto.numeroChambre;
        idHotel = aDto.idHotel;
        dateCheckin = aDto.dateCheckin;
        dateCheckout = aDto.dateCheckout;
        prix = aDto.prix;
        idEmploye = aDto.idEmploye;
        montantDu = aDto.montantDu;
        isPaiementComplete = aDto.isPaiementComplete;
        datePaiementComplete = aDto.datePaiementComplete;
        isUserCheckedInLocation = aDto.isUserCheckedInLocation;
    }
}
