package com.meetup.meetupapi.controller;

import com.meetup.meetupapi.model.ApplicationUser;
import com.meetup.meetupapi.repo.ApplicationUserRepository;

import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public UserController(ApplicationUserRepository applicationUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody ApplicationUser user) {
        JSONObject data = new JSONObject();
        ApplicationUser existingUser, existingEmail;

        try{
            existingUser = applicationUserRepository.findByUsername(user.getUsername());
            existingEmail = applicationUserRepository.findByEmail(user.getEmail());
        } catch (Exception e){
            System.out.println("Exception locating user");
            return ResponseEntity.status(500).build();
        }
        if ( existingUser == null && existingEmail == null){
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            data.put("user", user);
            applicationUserRepository.save(user);
        }
        else{
            //If username & email exist
            if(existingUser != null && existingEmail != null) data.put("message", 
                "An account with this username and email already exists");
            //If username is taken
            else if(existingUser != null) data.put("message",
                "An account with this username already exists");
            //If email is taken
            else if(existingEmail != null) data.put("message",
                "An account with this email already exists");
        }        
        return ResponseEntity.ok().body(data);
    }
}