package com.meetup.meetupapi.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "group_membership")
public class GroupMembers implements Serializable{
    @Id
    @NotNull
    private long group_id;

    @OneToOne
    @JoinColumn(name="group_id", referencedColumnName = "group_id")
    private MeetupGroup group;
    
    @Id
    @NotNull
    private long user_id;

    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private ApplicationUser user;

}