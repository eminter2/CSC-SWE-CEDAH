package com.meetup.meetupapi.controller;

import com.meetup.meetupapi.repo.LoginRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.simple.JSONObject;


@RestController
@RequestMapping("/api")
class MainController {

    private final Logger log = LoggerFactory.getLogger(MainController.class);
    private LoginRepository loginRepository;

    public MainController(LoginRepository loginRepository){
        this.loginRepository = loginRepository;
    }

    @GetMapping(path="/login")
    public ResponseEntity<JSONObject> test(){
        JSONObject jo = new JSONObject();
        jo.put("name", "jon doe");
        jo.put("age", "22");
        jo.put("city", "chicago");
        return ResponseEntity.ok().body(jo);
        // return new ResponseEntity<JSONObject>(jo, HttpStatus.OK).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path="/login/{username}")
    public ResponseEntity<?> attemptLogin(@PathVariable String username){
        JSONObject jo = new JSONObject();
        jo.put("username", username);;
        return ResponseEntity.ok().body(jo);
    }

    //     @GetMapping("/group/{id}")
//     ResponseEntity<?> getGroup(@PathVariable Long id){
//         Optional<Group> group = groupRepository.findById(id);
//         return group.map(response -> ResponseEntity.ok().body(response))
//                 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//     }

}