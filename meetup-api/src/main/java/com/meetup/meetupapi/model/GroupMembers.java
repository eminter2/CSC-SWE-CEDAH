package com.meetup.meetupapi.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "group_membership")
public class GroupMembers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long group_id;

    @Getter
    @Setter
    @NotNull
    private long user_id;

    @Id
    @OneToMany
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private List<ApplicationUser> users;

    @OneToMany
    @JoinColumn(name="group_id", referencedColumnName = "group_id")
    private List<MeetupGroup> groups;

}