package com.meetup.meetupapi;

import org.springframework.web.bind.annotation.*;

@RestController
class UserController{
    
    @GetMapping(path="/")
    public String index(){
        return "Congrats, it works";
    }

    @GetMapping(path="/login")
    public String login(){
        return "Now you're at the login";
    }
}