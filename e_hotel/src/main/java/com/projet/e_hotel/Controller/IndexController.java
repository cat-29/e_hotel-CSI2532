package com.projet.e_hotel.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.projet.e_hotel.Classes.Client;
import com.projet.e_hotel.Service.ClientService;

@Controller
public class IndexController {
    
    @Autowired
    private ClientService clientServiceImpl;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("allclientlist", clientServiceImpl.getAllClient());
        return "index";
    }
    
    @GetMapping("/addnew")
    public String addNewClient(Model model) {
        Client client = new Client();
        model.addAttribute("client", client);
        return "newclient";
    }
}
