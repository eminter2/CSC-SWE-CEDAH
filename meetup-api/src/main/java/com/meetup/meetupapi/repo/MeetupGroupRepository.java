package com.meetup.meetupapi.repo;

import com.meetup.meetupapi.model.MeetupGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetupGroupRepository extends JpaRepository<MeetupGroup, Long> {

}