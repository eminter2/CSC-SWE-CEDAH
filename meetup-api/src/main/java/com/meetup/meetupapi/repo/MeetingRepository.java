package com.meetup.meetupapi.repo;

import com.meetup.meetupapi.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long>{

}