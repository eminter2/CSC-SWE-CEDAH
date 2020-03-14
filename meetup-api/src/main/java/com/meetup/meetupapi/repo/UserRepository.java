package com.meetup.meetupapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.meetup.meetupapi.model.User;

@Component
public interface UserRepository extends JpaRepository<User, String>{
}