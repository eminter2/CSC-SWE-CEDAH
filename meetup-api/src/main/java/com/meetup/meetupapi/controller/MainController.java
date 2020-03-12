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

    // Working -- commented out for oauth2
    @PostMapping(path="/login")
    public ResponseEntity<?> findUser(@Valid @RequestBody Login login) throws URISyntaxException {
        String username = login.getUsername();
        String password = login.getPassword();
        System.out.printf("\n Form: Username: %s, Password: %s", username, password);
        try{
            Login result = loginRepository.findByUsername(username);
            if(result.getPassword().equals(password)){ 
                return ResponseEntity.ok().body(login);
            }
            else throw new Exception();
        } catch(Exception e){
            return ResponseEntity.ok().body("");
        }
    }

    @PostMapping(path="/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody Login login) throws URISyntaxException{
        String username = login.getUsername();
        String password = login.getPassword();
        System.out.printf("\n Form: Username: %s, Password: %s", username, password);
        try{
            System.out.printf("\n Query: Username: %s, Password: %s", username, password);
            Login doesExist = loginRepository.findByUsername(username);
            if(doesExist != null) throw new Exception();
            Login result = loginRepository.save(login);
            return ResponseEntity.ok().body(result);
        } catch( Exception e){
            System.out.println("\nUser already exists");
            return ResponseEntity.ok().body("");
        }
    }

}