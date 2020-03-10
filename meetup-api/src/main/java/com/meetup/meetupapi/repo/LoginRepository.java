package com.meetup.meetupapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.meetup.meetupapi.model.Login;

@Component
public interface LoginRepository extends JpaRepository<Login, Long>{
    // Login findByName(String username);
}