package com.projet.e_hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class EHotelApplication {


	public static void main(String[] args) {
		SpringApplication.run(EHotelApplication.class, args);
	}

	// this can allow front end to hit the endpoints
    // So I think that can spares us the trouble of adding @Cors annotation at the controller level
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return (WebMvcConfigurer) new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }

}
