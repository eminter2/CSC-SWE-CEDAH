package com.meetup.meetupapi.repo;

import com.meetup.meetupapi.model.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GroupMembershipRepository extends JpaRepository<GroupMembership, Long> {
}