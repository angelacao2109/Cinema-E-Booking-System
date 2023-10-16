package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.LoginDto;
import com.uga.moviebooking.model.dto.RegisterDto;
import com.uga.moviebooking.model.role.Role;
import com.uga.moviebooking.model.role.RoleRepository;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    //@PreAuthorize("hasRole('ROLE_ADMIN')")

    //add new administartors
    RoleRepository roleRepository;
    UserRepository userRepository;
    UserService userService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/registerAdmin")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterDto register) {

        if(userRepository.existsByEmail(register.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setFirstname(register.getFirstName());
        user.setLastname(register.getLastName());
        user.setEmail(register.getEmail());
        user.setPassword(register.getPassword());

        long id = userService.registerUser(user);
        user.getRoles().add(roleRepository.findByName("ROLE_ADMIN"));
        userRepository.save(user);
        return new ResponseEntity<>("User id " + id + " successfully registered admin user",HttpStatus.OK);

    }
    //TODO:delete memember

    //TODO:update memember

    //suspended member
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/disableUser")
    public ResponseEntity<String> disableUser(@RequestBody String email) {
        Optional<User> userBox =  userRepository.findByEmail(email);
        User user;
        if(userBox.isPresent()){
            user = userBox.get();
            user.setEnabled(false);
            userRepository.save(user);
            return new ResponseEntity<>("User" + user.getId() + "  successfully disabled ",HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();

    }
   //enable user
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/enableUser")
    public ResponseEntity<String> enableUser(@RequestBody String email) {
        Optional<User> userBox =  userRepository.findByEmail(email);
        User user;
        if(userBox.isPresent()){
            user = userBox.get();
            user.setEnabled(true);
            userRepository.save(user);
            return new ResponseEntity<>("User" + user.getId() + "  successfully enabled ",HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();

    }

}
