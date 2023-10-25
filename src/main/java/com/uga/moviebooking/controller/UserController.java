package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RequestMapping("/api/user")
@RestController
public class UserController {
    UserRepository userRepository;
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(value = "/api/usersByRole/{userRole}")
    public List<User> getUser(@PathVariable String userRole){
        return userRepository.findByRolesIn(Arrays.asList(userRole));
    }
}
