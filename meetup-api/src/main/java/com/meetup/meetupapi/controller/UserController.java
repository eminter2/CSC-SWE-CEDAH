package com.meetup.meetupapi.controller;

import com.meetup.meetupapi.model.ApplicationUser;
import com.meetup.meetupapi.repo.ApplicationUserRepository;

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
        ApplicationUser existing;
        try{
            existing = applicationUserRepository.findByEmail(user.getEmail());
        } catch (Exception e){
            System.out.println("Exception locating user");
            return ResponseEntity.status(500).build();
        }
        if(existing == null){
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            applicationUserRepository.save(user);
            return ResponseEntity.ok().body(user);
        }
        else{
            return ResponseEntity.status(403).body("An account with this email already exists");
        }
        
    }
}