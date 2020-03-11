package com.meetup.meetupapi.controller;

import com.meetup.meetupapi.repo.LoginRepository;
import com.meetup.meetupapi.model.Login;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.simple.JSONObject;


@RestController
@RequestMapping("/api")
class MainController {

    private LoginRepository loginRepository;

    public MainController(LoginRepository loginRepository){
        this.loginRepository = loginRepository;
    }

    @GetMapping(path="/login/{username}&{password}")
    public ResponseEntity<?> findUser(@PathVariable String username, @PathVariable String password){
        try{
            Login login = loginRepository.findByUsername(username);
            if(login.getPassword().equals(password)){ 
                return ResponseEntity.ok().body(login);
            }
            else throw new Exception();
        } catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}