package com.meetup.meetupapi.model;

import java.sql.Time;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "meeting")
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long id;

    @Getter
    @Setter
    private String meeting_day;

    @Getter
    @Setter
    private Time meeting_start_time;

    @Getter
    @Setter
    private Time meeting_end_time;

    @Getter
    @Setter
    @NotNull
    private long group_id;
    
    @Getter
    @Setter
    @NotNull
    private long creator_id;
    
    @ManyToOne
    @JoinColumn(name="group_id", referencedColumnName = "group_id")
    private MeetupGroup group;
    
    @OneToOne
    @JoinColumn(name="creator_id", referencedColumnName = "id")
    private ApplicationUser user;
}