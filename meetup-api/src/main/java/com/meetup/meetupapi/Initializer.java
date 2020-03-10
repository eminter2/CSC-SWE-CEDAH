package com.meetup.meetupapi;

import com.meetup.meetupapi.repo.GroupRepository;
import com.meetup.meetupapi.model.Group;
import com.meetup.meetupapi.model.Meeting;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


import java.util.stream.Stream;
import java.util.Collections;
import java.time.Instant;

@Component
class Initializer implements CommandLineRunner{
    private final GroupRepository repository;

    public Initializer(GroupRepository repository){
        this.repository = repository;
    }

    @Override
    public void run(String... strings){
        // Stream.of("Software", "Banking", "IT",
        //         "Sales").forEach(name -> repository.save(new Group(name)));
        // Group software = repository.findByName("software");
        // Meeting e = Meeting.builder().title("Software Service Team")
        //         .description("Running on a strange choice of technology stack")
        //         .date(Instant.parse("2020-03-09T16:37:00.000Z"))
        //         .build();
        // software.setMeetings(Collections.singleton(e));
        // repository.save(software);

        repository.findAll().forEach(System.out::println);
    }
}