package com.meetup.meetupapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "logins")
public class Login {
    @Id
    private int id;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;
}