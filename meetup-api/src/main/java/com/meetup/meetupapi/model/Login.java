package com.meetup.meetupapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "logins")
public class Login {
    @Id
    @GeneratedValue
    private int id;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }
}