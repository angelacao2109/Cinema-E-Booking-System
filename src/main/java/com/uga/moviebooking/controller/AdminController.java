package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.RegisterDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.role.RoleRepository;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
        user.setPhoneNumber("3030");

        long id = userService.registerUser(user);
        user.getRoles().add(roleRepository.findByName("ROLE_ADMIN"));
        userRepository.save(user);
        return new ResponseEntity<>("User id " + id + " successfully registered admin user",HttpStatus.OK);

    }
    //TODO:delete memember
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestBody String email) {
        Optional<User> userBox = userRepository.findByEmail(email);
        if (userBox.isPresent()) {
            User user = userBox.get();
            userRepository.delete(user);
            return new ResponseEntity<>("User " + user.getId() + " successfully deleted", HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }


    //TODO:update memember

    // Update a user
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UserDto updatedUser) {
        Optional<User> userBox = userRepository.findByEmail(updatedUser.getEmail());
        if (userBox.isPresent()) {
            User existingUser = userBox.get();

            // Update the user's properties
            existingUser.setFirstname(updatedUser.getFirstname());
            existingUser.setLastname(updatedUser.getLastname());
            existingUser.setEmail(updatedUser.getEmail());
            //should admin update their passwords too?

            // Save the updated user
            userRepository.save(existingUser);

            return new ResponseEntity<>("User " + existingUser.getId() + " successfully updated", HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }


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
