package com.meetup.meetupapi.controller;

import com.meetup.meetupapi.model.Login;
import com.meetup.meetupapi.repo.LoginRepository;

import java.net.URI;
import java.net.URISyntaxException;
import javax.validation.Valid;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
class MainController {

    private LoginRepository loginRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public MainController(LoginRepository loginRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.loginRepository = loginRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping(path="/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody Login login) throws URISyntaxException{
        String encPass = bCryptPasswordEncoder.encode(login.getPassword());
        login.setPassword(encPass);
        System.out.printf("\n Form: Username: %s, Password: %s", login.getUsername(), login.getPassword());
        System.out.printf("\n Encrypted Password:\n\tPassword: %s\n", encPass);
        Login result = loginRepository.save(login);
        // System.out.printf("\n Query: Username: %s, Password: %s", login.getUsername(), login.getPassword());
        return ResponseEntity.created(new URI("/api/register/" + result.getId())).body(result);
    }

}