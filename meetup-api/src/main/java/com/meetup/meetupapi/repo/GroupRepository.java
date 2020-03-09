package com.meetup.meetupapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.meetup.meetupapi.model.Group;

public interface GroupRepository extends JpaRepository<Group, Long>{
    Group findByName(String name);
}