package com.meetup.meetupapi.controller;

import java.util.List;

import com.meetup.meetupapi.model.MeetupGroup;
import com.meetup.meetupapi.repo.MeetupGroupRepository;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/groups")
public class MeetupGroupController {

    private MeetupGroupRepository meetupGroupRepository;

    public MeetupGroupController(MeetupGroupRepository meetupGroupRepository){
        this.meetupGroupRepository = meetupGroupRepository;
    }

    @PostMapping("/retrieve")
    public ResponseEntity<?> getGroups(@RequestParam("id") int userId){
        JSONObject response = new JSONObject();
        JSONArray groupArr = new JSONArray();
        int status = 200;
        List<MeetupGroup> userGroups;

        try {
            userGroups = meetupGroupRepository.findMyGroups(userId);
            for(MeetupGroup group : userGroups){
                JSONObject inner = new JSONObject();
                inner.put("group_id", group.getGroup_id());
                inner.put("group_name", group.getGroup_name());
                inner.put("owner_id", group.getUser().getId());
                inner.put("owner_username", group.getUser().getUsername());
                inner.put("owner_fullName", group.getUser().getFullName());
                groupArr.add(inner);
            };
            response.put("groups", groupArr);
        } catch (Exception e){
            System.out.println("Query failed");
            status = 500;
            response.put("message", "Query Failed");
        }

        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addGroup(@RequestParam("id") int userId){
        JSONObject response = new JSONObject();
        response.put("data", "success");
        return ResponseEntity.status(200).body(response);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinGroup(@RequestParam("id") int userId){
        JSONObject response = new JSONObject();
        response.put("data", "success");
        return ResponseEntity.status(200).body(response);
    }
}