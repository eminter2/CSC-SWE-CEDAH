package com.meetup.meetupapi.controller;

import java.util.ArrayList;
import java.util.List;

import com.meetup.meetupapi.model.GroupMembership;
import com.meetup.meetupapi.model.MeetingPossibility;
import com.meetup.meetupapi.model.Meeting;
import com.meetup.meetupapi.model.MeetupGroup;
import com.meetup.meetupapi.model.UserAvailability;
import com.meetup.meetupapi.repo.GroupMembershipRepository;
import com.meetup.meetupapi.repo.MeetupGroupRepository;
import com.meetup.meetupapi.repo.UserAvailabilityRepository;
import com.meetup.meetupapi.services.ScheduleEngine;
import com.meetup.meetupapi.services.fulldailyschedule;

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
    private GroupMembershipRepository groupMembershipRepository;
    private UserAvailabilityRepository userAvailabilityRepository;
    public MeetupGroupController(
            MeetupGroupRepository meetupGroupRepository, 
            GroupMembershipRepository groupMembershipRepository,
            UserAvailabilityRepository userAvailabilityRepository){
        this.meetupGroupRepository = meetupGroupRepository;
        this.groupMembershipRepository = groupMembershipRepository;
        this.userAvailabilityRepository = userAvailabilityRepository;
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

    @PostMapping("/members")
    public ResponseEntity<?> getMembers(@RequestParam("id") int groupId){
        JSONObject response = new JSONObject();
        JSONArray memberArr = new JSONArray();
        int status = 200;
        List<GroupMembership> members;
        try {
            members = groupMembershipRepository.findMembers(groupId);
            for (GroupMembership groupMembership : members) {
                JSONObject inner = new JSONObject();
                inner.put("id", groupMembership.getUser().getId());
                inner.put("name", groupMembership.getUser().getFullName());
                inner.put("email", groupMembership.getUser().getEmail());
                inner.put("phone", groupMembership.getUser().getPhone());
                memberArr.add(inner);
            }
            response.put("data", memberArr);

        } catch(Exception e){
            response.put("message", "Unable to retrieve group members");
            status = 500;
        }
        System.out.println("\n" + response);
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addGroup(
            @RequestParam("id") int userId,
            @RequestParam("name") String groupName){
        JSONObject response = new JSONObject();
        int status = 200;
        try {
            // System.out.println("Id: " + userId + "\ngroupName: " + groupName);
            int val = meetupGroupRepository.createGroup(groupName, userId);
            // System.out.println("Status: " + val);
            if(val > 0){
                response.put(
                    "data", 
                    "You have created " + groupName + " successfully!"
                );
            }
            else {
                response.put(
                    "message", 
                    "This group name is already taken.");
            }
        } catch (Exception e){
            status = 500;
            response.put("message", e.toString());
        }
        System.out.println("\n" + response);
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinGroup(
            @RequestParam("id") int userId,
            @RequestParam("name") String groupName){
        JSONObject response = new JSONObject();
        int status = 200;
        try {
            // System.out.println("Joining group: " + groupName + "\nId: " + userId);
            int val = groupMembershipRepository.joinGroup(userId, groupName);
            // System.out.println("Status: " + val);
            if (val > 0){
                response.put("data", "You have joined " + groupName);
            }
            else {
                response.put("message", "This group does not exist. Was there a typo?");
            }
        } catch (Exception e){
            response.put("message", e.toString());
            status = 500;
        }
        System.out.println("\n" + response);
        return ResponseEntity.status(status).body(response);
    }


    @PostMapping("/leave")
    public ResponseEntity<?> leaveGroup(
            @RequestParam("groupId") int groupId,
            @RequestParam("userId") int userId){
        
        JSONObject response = new JSONObject();
        int status = 200;
        try {
            System.out.println("Removing " + userId + "from group " + groupId);
            int val = groupMembershipRepository.deleteFromGroup(userId, groupId);
            if ( val > 0 ) {
                response.put("data", "You have been successfully removed from the group");
            }
            else {
                response.put("message", "Something went wrong");
                status = 500;
            }
        } catch (Exception e){
            status = 500;
            response.put("message", e.toString());
        }

        return ResponseEntity.status(status).body(response);
    }

    /*
        Here is where the user availability data is located. 
        Logic for calculating meetings should go here.

        Each availability belongs to a user which one can get
        by using getId() or any of its class methods. Parse
        this data into meeting possibilty code for calculations. 
        
        Print statements for right now to help visualize
    */
    @PostMapping("/availabilities")
    public ResponseEntity<?> getAvailabilities(
            @RequestParam("id") int groupId
            //need a way to acquire a duration value from meeting creator
    ){
        List<GroupMembership> members;
        List<UserAvailability> availabilitiesList;
        List<Long> userIds = new ArrayList<Long>();
        ArrayList<MeetingPossibility> allmeetingpossibilities = new ArrayList<MeetingPossibility>(); //will contain all meeting possibilities
        try {
            // For each membership, get userId
            members = groupMembershipRepository.findMembers(groupId);
            //for each day in week, creates a scheduleEngine instance
            ScheduleEngine SundayEngine = new ScheduleEngine("Sunday");
            ScheduleEngine MondayEngine = new ScheduleEngine("Monday");
            ScheduleEngine TuesdayEngine = new ScheduleEngine("Tuesday");
            ScheduleEngine WednesdayEngine = new ScheduleEngine("Wednesday");
            ScheduleEngine ThursdayEngine = new ScheduleEngine("Thursday");
            ScheduleEngine FridayEngine = new ScheduleEngine("Friday");
            ScheduleEngine SaturdayEngine = new ScheduleEngine("Saturday");
            for(GroupMembership membership: members){
                userIds.add(membership.getUser().getId());
            }
            // For each userId, get all availability
            for(Long id: userIds){
            	//Makes a full daily schedule for each day for every user, then adds the schedule to the appropriate engine
            	availabilitiesList = userAvailabilityRepository.findAllByUserId(id);
            	fulldailyschedule sundayschedule = new fulldailyschedule("Sunday", id, availabilitiesList);
            	SundayEngine.addSchedule(sundayschedule);
            	fulldailyschedule mondayschedule = new fulldailyschedule("Monday", id, availabilitiesList);
            	MondayEngine.addSchedule(mondayschedule);
            	fulldailyschedule tuesdayschedule = new fulldailyschedule("Tuesday", id, availabilitiesList);
            	TuesdayEngine.addSchedule(tuesdayschedule);
            	fulldailyschedule wednesdayschedule = new fulldailyschedule("Wednesday", id, availabilitiesList);
            	WednesdayEngine.addSchedule(wednesdayschedule);
            	fulldailyschedule thursdayschedule = new fulldailyschedule("Thursday", id, availabilitiesList);
            	ThursdayEngine.addSchedule(thursdayschedule);
            	fulldailyschedule fridayschedule = new fulldailyschedule("Friday", id, availabilitiesList);
            	FridayEngine.addSchedule(fridayschedule);
            	fulldailyschedule saturdayschedule = new fulldailyschedule("Saturday", id, availabilitiesList);
            	SaturdayEngine.addSchedule(saturdayschedule);
            	
            	
                for(UserAvailability availability: availabilitiesList){
                	
                    System.out.println(
                            "Availability: " +
                            availability.getUser().getFullName() + "\n" +
                            availability.getDay() + "\n" +
                            availability.getStart_time() + "\n" +
                            availability.getEnd_time() + "\n"
                    );      
                }
                
                
            }
            allmeetingpossibilities.addAll(SundayEngine.calculatemeeting(1)); //1 is a placeholder duration of 1 hour
        } catch (Exception e){
            System.out.println("Exception: " + e);
        }

        return ResponseEntity.status(200).body("ok");
    }
}