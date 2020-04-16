package com.meetup.meetupapi.controller;

import com.meetup.meetupapi.repo.MeetupGroupRepository;

import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/group")
public class MeetupGroupController {

    private MeetupGroupRepository meetupGroupRepository;

    public MeetupGroupController(MeetupGroupRepository meetupGroupRepository){
        this.meetupGroupRepository = meetupGroupRepository;
    }
}