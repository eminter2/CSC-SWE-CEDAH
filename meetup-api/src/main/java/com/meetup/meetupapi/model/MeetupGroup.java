package com.meetup.meetupapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "meetup_group")
public class MeetupGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long groupId;

    @Getter
    @Setter
    private String groupName;

    @OneToOne
    @JoinColumn(name="owner_id", referencedColumnName = "id")
    private ApplicationUser user;

}