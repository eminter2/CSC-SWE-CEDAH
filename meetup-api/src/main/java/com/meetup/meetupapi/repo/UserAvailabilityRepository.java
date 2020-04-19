package com.meetup.meetupapi.repo;

import com.meetup.meetupapi.model.UserAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAvailabilityRepository extends JpaRepository<UserAvailability, Long>{

}