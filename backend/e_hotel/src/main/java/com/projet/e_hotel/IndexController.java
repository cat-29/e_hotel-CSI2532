package com.projet.e_hotel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    
    @Autowired
    private ClientServiceImpl clientServiceImpl;

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
