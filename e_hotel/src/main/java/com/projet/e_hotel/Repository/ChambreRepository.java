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

    Optional<List<Chambre>> findByIdHotelAndCapaciteChambreAndVueChambre(Integer idHotel, String capaciteChambre,
            String vueChambre);

    Chambre findByNumeroChambre(Integer numeroChambre);

    List<Chambre> findChambresByIdHotel(Integer id);

    List<Chambre> findAllByNumeroChambre(Integer numeroChambre);

    List<Chambre> findAllByIdHotel(Integer idHotel);

    // Determine if a room is available
    @Query(value = "With ErrReserve as (\r\n" + // ici validation client_reserve
            "\t(Select numero_chambre,id_hotel \r\n" + // cas 1: il y a quelqu'un qui a booke exactement la ou on a,
            "from client_reserve where \r\n" + // ou a l interieur de la plage
            "(client_reserve.date_checkin >= :checkin \r\n" + //
            "AND client_reserve.date_checkout <= :checkout ))\r\n" + //
            "UNION (Select numero_chambre,id_hotel \r\n" + // cas 2: il y a quelqu'un qui a une date de checkin avant
                                                           // nous(ou meme),
            "from client_reserve where \r\n" + // mais qui sort apres que l on rentre (ou egal)
            "(client_reserve.date_checkin <= :checkin) \r\n" + //
            "AND (client_reserve.date_checkout >= :checkin) AND (client_reserve.date_checkout <= :checkout))\r\n" + //
            "UNION (Select numero_chambre,id_hotel \r\n" + // cas3: un client qui entre apres nous (ou egale),
            "from client_reserve where\r\n" + // mais avant notre checkout et son checkout est apres notre checkout. (ou
                                              // egale)
            "((client_reserve.date_checkin >= :checkin)\r\n" + //
            "AND (client_reserve.date_checkout >= :checkout ) AND (client_reserve.date_checkin <= :checkout))\r\n" + //
            "UNION (Select numero_chambre,id_hotel \r\n" + // cas4: un client qui a une grosse plage de reservations et
                                                           // on est a l interieur de cette plage
            "from client_reserve where \r\n" + //
            "(:checkin >= client_reserve.date_checkin) AND (:checkout <= client_reserve.date_checkout)))),\r\n" + //
            "ErrLoue as (\r\n" + // ici commence la validation avec loue_chambre
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
            "AND (loue_chambre.date_checkout >= :checkout )AND (loue_chambre.date_checkin <= :checkout))\r\n" + //
            "UNION ( Select numero_chambre,id_hotel \r\n" + //
            "from loue_chambre where \r\n" + //
            "(:checkin >= loue_chambre.date_checkin) AND (:checkout <= loue_chambre.date_checkout))))\r\n" + //
            "(Select * from ErrReserve where ErrReserve.numero_chambre = :numeroChambre AND ErrReserve.id_hotel = :idHotel)"
            + //
            "UNION (Select * from ErrLoue where ErrLoue.numero_chambre = :numeroChambre AND ErrLoue.id_hotel = :idHotel) ", nativeQuery = true)
    List<Object[]> determineIfNotAvailable(@Param("checkin") Date checkin, @Param("checkout") Date checkout,
            @Param("idHotel") Integer idHotel, @Param("numeroChambre") Integer numeroChambre);

//     Determine number of all available rooms per province
    @Query(value="select * from chambre_disponibles",nativeQuery = true)
    List<Object[]> getCountRoomAvailable(); 



        @Query(value = "With ErrReserve as (\r\n" + //
                                "\t (Select numero_chambre,id_hotel \r\n" + //
                                "\t\t from client_reserve where (client_reserve.date_checkin >= :checkin \r\n" + //
                                "\t AND client_reserve.date_checkout <= :checkout ))\r\n" + //
                                "     \t UNION \r\n" + //
                                "\t (Select numero_chambre, id_hotel \r\n" + //
                                "\t from client_reserve where (client_reserve.date_checkin <= :checkin) \r\n" + //
                                "AND (client_reserve.date_checkout >= :checkin) AND (client_reserve.date_checkout <= :checkout))\r\n" + //
                                "      \t UNION \r\n" + //
                                "\t (Select numero_chambre,id_hotel from client_reserve where ((client_reserve.date_checkin >= :checkin) \r\n" + //
                                "\t AND (client_reserve.date_checkout >= :checkout ) AND (client_reserve.date_checkin <= :checkout))\r\n" + //
                                "      \t UNION \r\n" + //
                                "\t (Select numero_chambre,id_hotel from client_reserve where(:checkin >= client_reserve.date_checkin)\r\n" + //
                                "AND (:checkout <= client_reserve.date_checkout)))),\r\n" + //
                                "ErrLoue as (\r\n" + //
                                "\t (Select numero_chambre,id_hotel from loue_chambre where\r\n" + //
                                "\t (loue_chambre.date_checkin >= :checkin AND loue_chambre.date_checkout <= :checkout ))\r\n" + //
                                "        UNION\r\n" + //
                                "\t (Select numero_chambre,id_hotel from loue_chambre where (loue_chambre.date_checkin <= :checkin )\r\n" + //
                                "\t AND (loue_chambre.date_checkout >= :checkin)AND (loue_chambre.date_checkout <= :checkout))\r\n" + //
                                "      \t UNION \r\n" + //
                                "\t (Select numero_chambre,id_hotel from loue_chambre where((loue_chambre.date_checkin >= :checkin) \r\n" + //
                                "\t AND (loue_chambre.date_checkout >= :checkout )AND (loue_chambre.date_checkin <= :checkout)))\r\n" + //
                                "        UNION \r\n" + //
                                "\t (Select numero_chambre,id_hotel from loue_chambre where (:checkin >= loue_chambre.date_checkin) \r\n" + //
                                "AND (:checkout <= loue_chambre.date_checkout)))\r\n" + //
                                "\t \r\n" + //
                                " (select * from chambreXhotel where (numero_chambre,id_hotel) in (\r\n" + //
                                "\t select numero_chambre,id_hotel from chambreXhotel except\r\n" + //
                                "\t ((select * from ErrReserve) UNION (select * from ErrLoue)))\r\n" + //
                                "\t\t intersect\r\n" + //
                                "\t (select * from chambreXHotel where capacite_chambre = :capacite) \r\n" + //
                                "   \t\t intersect \r\n" + //
                                "\t (select * from chambreXHotel where vue_chambre = :vue) \r\n" + //
                                "   \t\t intersect \r\n" + //
                                "\t (select * from chambreXHotel where prix BETWEEN :prixMin and :prixMax)\r\n" + //
                                "   \t\t intersect\r\n" + //
                                "\t (select * from chambreXHotel where nom_chaine = :chaine)\r\n" + //
                                "   \t\t intersect\r\n" + //
                                "\t (select * from chambreXHotel where num_etoile = :classement)\r\n" + //
                                "   \t\t intersect\r\n" + //
                                "\t (select * from chambreXHotel where (numero_chambre,id_hotel) in\r\n" + //
                                "       (select numero_chambre,id_hotel from chambrexhoteltotalchambre \r\n" + //
                                "\t\t where tot_chambres BETWEEN :chambreMin AND :chambreMax ) \r\n" + //
                                "\t \t intersect \r\n" + //
                                "\t (select * from chambreXHotel where capacite_a_etendre = :etendre)))\r\n" + //
                                "\r\n" + //
                                "", nativeQuery = true)
        // Get all rooms available for checkin, checkout specified along with other params
        List<Object[]> getAllRoomsCheckinAndCheckout(@Param("checkin") Date checkin,@Param("checkout") Date checkout, @Param("capacite") String capacite,@Param("vue") String vue,@Param("prixMin") Double prixMin,
        @Param("prixMax") Double prixMax, @Param("chaine") String chaine,@Param("classement") Integer classement,@Param("chambreMin") Integer chambreMin,@Param("chambreMax") Integer chambreMax,@Param("etendre") Boolean etendre);










        @Query(value="select * from chambreXhotel where (numero_chambre,id_hotel) in ( \r\n" + //

                        "(select numero_chambre,id_hotel from chambreXhotel except \r\n" + //

                        "-- enlevons ceux qui ne sont pas disponibles \r\n" + //

                        "-- liste de pas disponible dans client_reserve \r\n" + //

                        "(select numero_chambre,id_hotel from client_reserve where \r\n" + //

                        "(:checkin BETWEEN date_checkin and date_checkout) \r\n" + //

                        "or (:checkout BETWEEN date_checkin and date_checkout )) \r\n" + //

                        "UNION \r\n" + //

                        " -- liste de pas disponibles dans loue_chambre \r\n" + //

                        " (select numero_chambre,id_hotel from loue_chambre where \r\n" + //

                        " (:checkin BETWEEN date_checkin and date_checkout) \r\n" + //

                        " or (:checkout BETWEEN date_checkin and date_checkout )) \r\n" + //

                        "))\r\n" + // 
                "intersect \r\n" + // 

                        "(select * from chambreXHotel where capacite_chambre = :capacite) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where vue_chambre = :vue) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where prix BETWEEN :prixMin and :prixMax) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where nom_chaine = :chaine) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where num_etoile = :classement) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where (numero_chambre,id_hotel) in \r\n" + //

                        "(select numero_chambre,id_hotel  \r\n" + //

                        "from chambrexhoteltotalchambre where tot_chambres  \r\n" + //

                        "BETWEEN :chambreMin AND :chambreMax )) \r\n" + //
                "intersect (select * from chambreXHotel where capacite_a_etendre = :etendre)\r\n" ,nativeQuery = true)

        // Filtrer par tout except checkin
        List<Object[]> getAllRoomsCheckoutOnly(@Param("checkin") Date checkin,@Param("checkout") Date checkout, @Param("capacite") String capacite,@Param("vue") String vue,@Param("prixMin") Double prixMin,
        @Param("prixMax") Double prixMax, @Param("chaine") String chaine,@Param("classement") Integer classement,@Param("chambreMin") Integer chambreMin,@Param("chambreMax") Integer chambreMax,@Param("etendre") Boolean etendre);




        @Query(value="select * from chambreXhotel where (numero_chambre,id_hotel) in ( \r\n" + //

                        "(select numero_chambre,id_hotel from chambreXhotel except \r\n" + //

                        "-- enlevons ceux qui ne sont pas disponibles \r\n" + //

                        "-- liste de pas disponible dans client_reserve \r\n" + //

                        "(select numero_chambre,id_hotel from client_reserve where \r\n" + //

                        "(:checkin BETWEEN date_checkin and date_checkout) \r\n" + //

                        "or (:checkout BETWEEN date_checkin and date_checkout )) \r\n" + //

                        "UNION \r\n" + //

                        " -- liste de pas disponibles dans loue_chambre \r\n" + //

                        " (select numero_chambre,id_hotel from loue_chambre where \r\n" + //

                        " (:checkin BETWEEN date_checkin and date_checkout) \r\n" + //

                        " or (:checkout BETWEEN date_checkin and date_checkout )) \r\n" + //

                        "))\r\n" + // 
                "intersect \r\n" + // 

                        "(select * from chambreXHotel where capacite_chambre = :capacite) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where vue_chambre = :vue) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where prix BETWEEN :prixMin and :prixMax) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where nom_chaine = :chaine) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where num_etoile = :classement) \r\n" + //

                "intersect \r\n" + //

                        "(select * from chambreXHotel where (numero_chambre,id_hotel) in \r\n" + //

                        "(select numero_chambre,id_hotel  \r\n" + //

                        "from chambrexhoteltotalchambre where tot_chambres  \r\n" + //

                        "BETWEEN :chambreMin AND :chambreMax )) \r\n" + //
                "intersect (select * from chambreXHotel where capacite_a_etendre = :etendre)\r\n"  //
            ,nativeQuery = true)


        // Filtrer par tout except checkout

        List<Object[]> getAllRoomsCheckinOnly(@Param("checkin") Date checkin,@Param("checkout") Date checkout, @Param("capacite") String capacite,@Param("vue") String vue,@Param("prixMin") Double prixMin,
        @Param("prixMax") Double prixMax, @Param("chaine") String chaine,@Param("classement") Integer classement,@Param("chambreMin") Integer chambreMin,@Param("chambreMax") Integer chambreMax,@Param("etendre") Boolean etendre);







        @Query(value="(select * from chambreXHotel where capacite_chambre = :capacite) \r\n" + //

                                "\t intersect \r\n" + //

                                "(select * from chambreXHotel where vue_chambre = :vue) \r\n" + //

                                "\t intersect \r\n" + //

                                "(select * from chambreXHotel where prix BETWEEN :prixMin and :prixMax) \r\n" + //

                                "\t intersect\r\n" + //

                                "(select * from chambreXHotel where nom_chaine = :chaine) \r\n" + //

                                "\t intersect \r\n" + //

                                "(select * from chambreXHotel where num_etoile = :classement)\r\n" + //

                                "\t intersect \r\n" + //

                                "(select * from chambreXHotel where (numero_chambre,id_hotel) \r\n" + //

                                " in \r\n" + //

                                " (select numero_chambre,id_hotel from chambrexhoteltotalchambre where \r\n" + //

                                "tot_chambres BETWEEN :chambreMin AND :chambreMax )) intersect \r\n" + // 
                                "(select * from chambreXHotel where capacite_a_etendre = :etendre) \r\n" + //
                                "",nativeQuery = true)
        // Filtrer par tout execept checkin et checkout car il etaient pas specifies
        List<Object[]> getAllRoomsNoDates(@Param("capacite") String capacite,@Param("vue") String vue,@Param("prixMin") Double prixMin,
        @Param("prixMax") Double prixMax, @Param("chaine") String chaine,@Param("classement") Integer classement,
        @Param("chambreMin") Integer chambreMin,@Param("chambreMax") Integer chambreMax,@Param("etendre") Boolean etendre);


        @Query(value="select type_commodite from chambreXcommodite where id_hotel = :idHotel and numero_chambre = :numero_chambre\r\n" + //
                                "",nativeQuery = true)
        // Get all commoditees d une chambre specifique
        List<Object[]> getAllCommoditees(@Param("idHotel") Integer idHotel,@Param("numero_chambre") Integer numero_chambre);
        


}
