package com.meetup.meetupapi.security;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.meetup.meetupapi.model.ApplicationUser;

import org.json.simple.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.meetup.meetupapi.security.SecurityConstants.EXPIRATION_TIME;
import static com.meetup.meetupapi.security.SecurityConstants.SECRET;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            ApplicationUser creds = new ObjectMapper()
                    .readValue(req.getInputStream(), ApplicationUser.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain,
            Authentication auth
            ) throws IOException, ServletException 
    {
        String username = ((User) auth.getPrincipal()).getUsername();
        String token = JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));

        JSONObject data = new JSONObject();
        data.put("user", username);
        data.put("jwt", token);
        String json = new ObjectMapper().writeValueAsString(data);
        // res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write(json);
        res.getWriter().flush();
        res.getWriter().close();
    }

    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest req, 
            HttpServletResponse res, 
            AuthenticationException e) throws IOException, ServletException
    {
        // System.out.println("\n\n\n\n=======\nInvalid Credentials=========\n\n\n\n");
        JSONObject data = new JSONObject();
        data.put("message", "Invalid Credentials");
        String json = new ObjectMapper().writeValueAsString(data);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write(json);
        res.getWriter().flush();
        res.getWriter().close();
    }
}