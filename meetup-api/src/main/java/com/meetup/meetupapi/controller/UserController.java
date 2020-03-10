package com.meetup.meetupapi.controller;

import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;

@RestController
@RequestMapping("/api")
class UserController{
    
    @GetMapping(path="/")
    public String index(){
        return "Congrats, it works";
    }

    @GetMapping(path="/test")
    public JSONObject test(){
        JSONObject jo = new JSONObject();
        jo.put("name", "jon doe");
        jo.put("age", "22");
        jo.put("city", "chicago");
        return jo;
    }
}