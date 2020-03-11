// package com.meetup.meetupapi.controller;

// import com.meetup.meetupapi.repo.GroupRepository;
// import com.meetup.meetupapi.model.Group;

// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.*;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import javax.validation.Valid;
// import java.util.Collection;
// import java.util.Optional;
// import java.net.URI;
// import java.net.URISyntaxException;
// import org.json.simple.JSONObject;


// @RestController
// @RequestMapping("/api")
// class GroupController {

//     private final Logger log = LoggerFactory.getLogger(GroupController.class);
//     private GroupRepository groupRepository;

//     public GroupController(GroupRepository groupRepository){
//         this.groupRepository = groupRepository;
//     }

//     @GetMapping(path="/login")
//     public ResponseEntity<JSONObject> login(){
//         JSONObject jo = new JSONObject();
//         jo.put("name", "jon doe");
//         jo.put("age", "22");
//         jo.put("city", "chicago");
//         return ResponseEntity.ok().body(jo);
//         // return new ResponseEntity<JSONObject>(jo, HttpStatus.OK).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//     }

//     @GetMapping("/groups")
//     Collection<Group> groups(){
//         return groupRepository.findAll();
//     }

//     @GetMapping("/group/{id}")
//     ResponseEntity<?> getGroup(@PathVariable Long id){
//         Optional<Group> group = groupRepository.findById(id);
//         return group.map(response -> ResponseEntity.ok().body(response))
//                 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//     }

//     // @PostMapping("/group")
//     // ResponseEntity<Group> createGroup(@Valid @RequestBody Group group) throws URISyntaxException{
//     //     log.info("Request to create group: {}", group);
//     //     Group result = groupRepository.save(group);
//     //     return ResponseEntity.created(new URI("/api/group/" + result.getId())).body(result);
//     // }


//     @PutMapping("/group/{id}")
//     ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group) {
//         log.info("Request to update group: {}", group);
//         Group result = groupRepository.save(group);
//         return ResponseEntity.ok().body(result);
//     }

//     @DeleteMapping("/group/{id}")
//     public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
//         log.info("Request to delete group: {}", id);
//         groupRepository.deleteById(id);
//         return ResponseEntity.ok().build();
//     }
// }