package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.dto.UserProfileDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {


    @GetMapping("/current-user")
    public ResponseEntity<String> getCurrentUser() {
        return null;
    }

    @GetMapping("/user-details")
    public ResponseEntity<UserProfileDto> getUserProfile() {
        return null;
    }
}
