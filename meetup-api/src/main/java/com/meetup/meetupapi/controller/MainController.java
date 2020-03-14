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

    @RequestMapping(path="/meetings", method = { RequestMethod.GET, RequestMethod.POST })
    public void findMeetings(){
        System.out.println("\n\n\n\n\n\nQuerying the Db to find groups for email: ");
        // return ResponseEntity.ok().body("userMeetings");
    }

}