package com.projet.e_hotel.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.e_hotel.Classes.Compte;
import com.projet.e_hotel.Repository.CompteRepository;

@Service
public class CompteService {
    @Autowired
    private CompteRepository compteRepository;

    // @Autowired
    // private MongoTemplate mongoTemplate;

    public CompteService(){

    }

    // public Compte createCompte(String email, String motDePasse) {
    //     // Review review = repository.insert(new Review(reviewBody, LocalDateTime.now(), LocalDateTime.now()));
    //     Compte compte = repository.insert(new Compte(email,motDePasse));

    //     // mongoTemplate.update(Movie.class)
    //     //     .matching(Criteria.where("imdbId").is(imdbId))
    //     //         .apply(new Update().push("reviewIds").value(review.getId()))
    //     //         .first();
    //     return compte;
    // }

    public Compte saveCompte(Compte compte){
        return compteRepository.save(compte);
    }


}