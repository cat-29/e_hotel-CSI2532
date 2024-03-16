package com.projet.e_hotel.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.projet.e_hotel.Service.ClientServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/client")

public class ClientController {
    // @Autowired
    // private ClientRepository clientRepository;

    private final ClientServiceImpl clientServiceImpl;

    @Autowired
    public ClientController(ClientServiceImpl clientServiceImpl) {
        this.clientServiceImpl = clientServiceImpl;
    }
    
    // org.slf4j.Logger logger = LoggerFactory.getLogger(Client.class);

    @GetMapping
    public String viewHomePage(Model model) {
        model.addAttribute("allclientlist", clientServiceImpl.getAllClient());
        return "index";
    }
    
    // @GetMapping("/addnew")
    // public String addNewClient(Model model) {
    //     Client client = new Client();
    //     model.addAttribute("client", client);
    //     return "newclient";
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<Client> findClientById(@PathVariable(value = "id") Integer id) {
    //     Optional<Client> client = clientRepository.findById(id);
       
    //     if (client.isPresent()) {
    //         logger.info("client is present..");
    //         return ResponseEntity.ok().body(client.get());
    //     }
    //     return ResponseEntity.notFound().build();
    // }

    // @PostMapping("/saveClient")
    // public Client saveClient(@RequestBody Client client) {       
    //     return clientRepository.save(client);
    // }
    

    
}
