package com.projet.e_hotel.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.ClientReserve;
import com.projet.e_hotel.Classes.pk.ClientReservePK;

import jakarta.transaction.Transactional;

@Repository
public interface ClientReserveRepository extends JpaRepository<ClientReserve,ClientReservePK> {

    List<ClientReserve> findAllByIdHotel(Integer idHotel);
    
    Optional<List<ClientReserve>> findAllByNumeroChambreAndIdHotel(Integer numeroChambre, Integer idHotel);

    Optional<ClientReserve> findByNumeroChambreAndIdHotel(Integer numeroChambre, Integer idHotel);

    Optional<ClientReserve> findByIdHotel(Integer idHotel);

    

    @Modifying
    @Transactional
    @Query(value="INSERT INTO client_reserve VALUES \r\n" + //
                "(:idClient,:numeroChambre,:idHotel,:dateCheckin,:dateCheckout,:prix,:datePaiementComplete,:isPaiementComplete);\r\n"
                ,nativeQuery = true)
    void saveBooking(
        @Param("idClient") String idClient,
        @Param("numeroChambre") Integer numeroChambre,
        @Param("idHotel") Integer idHotel,@Param("dateCheckin") Date dateCheckin,
        @Param("dateCheckout") Date dateCheckout,@Param("prix") Double prix,
        @Param("datePaiementComplete") Date datePaiementComplete,
        @Param("isPaiementComplete") Boolean isPaiementComplete);

    // "select id_client,numero_chambre,id_hotel,date_checkin,date_checkout from client_reserve where id_client = :idClient and numero_chambre = :numeroChambre\r\n" + //
    // "and id_hotel = :idHotel and date_checkin = :dateCheckin and date_checkout = :dateCheckout"

} 
