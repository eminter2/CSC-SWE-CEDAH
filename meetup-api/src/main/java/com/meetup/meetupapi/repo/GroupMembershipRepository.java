package com.meetup.meetupapi.repo;

import java.util.List;

import com.meetup.meetupapi.model.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership, Long> {
    @Query(
        value = "SELECT * " +
        "FROM group_membership AS M, users AS U " +
        "WHERE M.user_id = U.id AND M.group_id = ?1",
        nativeQuery = true
    )
    List<GroupMembership> findMembers(int groupId);
}