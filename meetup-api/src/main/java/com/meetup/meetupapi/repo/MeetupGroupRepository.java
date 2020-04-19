package com.meetup.meetupapi.repo;

import java.util.List;

import com.meetup.meetupapi.model.MeetupGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MeetupGroupRepository extends JpaRepository<MeetupGroup, Long> {
    @Query(
        value = "SELECT G.group_id, U.username, G.group_name, G.owner_id " + 
        "FROM meetup_group AS G, group_membership AS M, users AS U " +
        "WHERE G.group_id = M.group_id AND M.user_id = ?1 AND G.owner_id = U.id",
        nativeQuery = true
    )
    List<MeetupGroup> findMyGroups(int userId);
}