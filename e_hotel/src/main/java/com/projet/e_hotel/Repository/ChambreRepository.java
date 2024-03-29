package com.projet.e_hotel.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projet.e_hotel.Classes.Chambre;
import com.projet.e_hotel.Classes.pk.ChambrePK;

@Repository
public interface ChambreRepository extends JpaRepository<Chambre, ChambrePK> {
    
    Optional<List<Chambre>> findByIdHotel(Integer idHotel);

    Optional<List<Chambre>> findByIdHotelAndCapaciteChambreAndVueChambre(Integer idHotel, String capaciteChambre, String vueChambre);

    Chambre findByNumeroChambre(Integer numeroChambre);

    List<Chambre> findAllByNumeroChambre(Integer numeroChambre);

    // Determine if a room is available
    @Query(value = "With ErrReserve as (\r\n" + // ici validation client_reserve
                "\t(Select numero_chambre,id_hotel \r\n" + //cas 1: il y a quelqu'un qui a booke exactement la ou on a, 
                "from client_reserve where \r\n" + // ou a l interieur de la plage
                "(client_reserve.date_checkin >= :checkin \r\n" + //
                "AND client_reserve.date_checkout <= :checkout ))\r\n" + //
                "UNION (Select numero_chambre,id_hotel \r\n" + // cas 2: il y a quelqu'un qui a une date de checkin avant nous(ou meme), 
                "from client_reserve where \r\n" + // mais qui sort apres que l on rentre (ou egal)
                "(client_reserve.date_checkin <= :checkin) \r\n" + //
                "AND (client_reserve.date_checkout >= :checkin) AND (client_reserve.date_checkout <= :checkout))\r\n" + //
                "UNION (Select numero_chambre,id_hotel \r\n" + // cas3: un client qui entre apres nous (ou egale),
                "from client_reserve where\r\n" + // mais avant notre checkout et son checkout est apres notre checkout. (ou egale)
                "((client_reserve.date_checkin >= :checkin)\r\n" + //
                "AND (client_reserve.date_checkout >= :checkout ) AND (client_reserve.date_checkin <= :checkout))\r\n"+//
                "UNION (Select numero_chambre,id_hotel \r\n"+// cas4: un client qui a une grosse plage de reservations et on est a l interieur de cette plage
                "from client_reserve where \r\n"+//
                "(:checkin >= client_reserve.date_checkin) AND (:checkout <= client_reserve.date_checkout)))),\r\n"+//
                "ErrLoue as (\r\n"+// ici commence la validation avec loue_chambre
                "\t(Select numero_chambre,id_hotel \r\n" + //
                "from loue_chambre where \r\n" + //
                "(loue_chambre.date_checkin >= :checkin \r\n" + //
                "AND loue_chambre.date_checkout <= :checkout ))\r\n" + //
                "UNION (Select numero_chambre,id_hotel \r\n" + //
                "from loue_chambre where \r\n" + //
                "(loue_chambre.date_checkin <= :checkin ) \r\n" + //
                "AND (loue_chambre.date_checkout >= :checkin)AND (loue_chambre.date_checkout <= :checkout))\r\n" + //
                "UNION (Select numero_chambre,id_hotel \r\n" + //
                "from loue_chambre where\r\n" + //
                "((loue_chambre.date_checkin >= :checkin)\r\n" + //
                "AND (loue_chambre.date_checkout >= :checkout )AND (loue_chambre.date_checkin <= :checkout))\r\n"+//
                "UNION ( Select numero_chambre,id_hotel \r\n"+//
                "from loue_chambre where \r\n"+//
                "(:checkin >= loue_chambre.date_checkin) AND (:checkout <= loue_chambre.date_checkout))))\r\n"+//
                "(Select * from ErrReserve where ErrReserve.numero_chambre = :numeroChambre AND ErrReserve.id_hotel = :idHotel)" + //
                "UNION (Select * from ErrLoue where ErrLoue.numero_chambre = :numeroChambre AND ErrLoue.id_hotel = :idHotel) ",nativeQuery = true)
    List<Object[]> determineIfNotAvailable(@Param("checkin") Date checkin,@Param("checkout") Date checkout,@Param("idHotel") Integer idHotel,@Param("numeroChambre") Integer numeroChambre);
}
