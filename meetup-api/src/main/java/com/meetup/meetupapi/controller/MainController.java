package com.meetup.meetupapi.controller;

import com.meetup.meetupapi.model.Login;
import com.meetup.meetupapi.repo.LoginRepository;

import java.net.URI;
import java.net.URISyntaxException;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
class MainController {

    private LoginRepository loginRepository;

    public MainController(LoginRepository loginRepository){
        this.loginRepository = loginRepository;
    }

    @GetMapping(path="/login/{username}&{password}")
    public ResponseEntity<?> findUser(@PathVariable String username, @PathVariable String password){
        System.out.printf("\n Form: Username: %s, Password: %s", username, password);
        try{
            Login login = loginRepository.findByUsername(username);
            System.out.printf("\n Query: Username: %s, Password: %s", login.getUsername(), login.getPassword());
            if(login.getPassword().equals(password)){ 
                return ResponseEntity.ok().body(login);
            }
            else throw new Exception();
        } catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping(path="/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody Login login) throws URISyntaxException{
        System.out.printf("\n Form: Username: %s, Password: %s", login.getUsername(), login.getPassword());
        Login result = loginRepository.save(login);
        System.out.printf("\n Query: Username: %s, Password: %s", login.getUsername(), login.getPassword());
        return ResponseEntity.created(new URI("/api/register/" + result.getId())).body(result);
    }

}