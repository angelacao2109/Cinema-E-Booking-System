package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.RegisterDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.role.RoleRepository;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    //add new administrators
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public AdminController(RoleRepository roleRepository, UserRepository userRepository, UserService userService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

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
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestBody emailDto emailDto) {
        Optional<User> userBox = userRepository.findByEmail(emailDto.email());
        if (userBox.isPresent()) {
            User user = userBox.get();
            userRepository.delete(user);
            return new ResponseEntity<>("User " + user.getId() + " successfully deleted", HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    // Update a user
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UserDto updatedUser) {
        User existingUser = userRepository.findByEmail(updatedUser.getEmail()).orElse(null);
        if(existingUser == null)
            return ResponseEntity.notFound().build();
        // Update the user's properties
        existingUser.setFirstname(updatedUser.getFirstName());
        existingUser.setLastname(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());
        //should admin update their passwords too?
        // Save the updated user
        userRepository.save(existingUser);
        return new ResponseEntity<>("User " + existingUser.getId() + " successfully updated", HttpStatus.OK);
    }


    //suspended member
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/disableUser")
    public ResponseEntity<String> disableUser(@RequestBody emailDto emailDto) {
        User user =  userRepository.findByEmail(emailDto.email()).orElse(null);
        if(user == null)
            return ResponseEntity.notFound().build();
        user.setEnabled(false);
        user.setVerificationCode(null);
        userRepository.save(user);
        return ResponseEntity.ok("User account id " + user.getId() + " disabled.");
    }
    //enable user
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/enableUser")
    public ResponseEntity<String> enableUser(@RequestBody emailDto emailDto) {
        User user =  userRepository.findByEmail(emailDto.email()).orElse(null);
        if(user == null)
            return ResponseEntity.notFound().build();
        user.setEnabled(true);
        userRepository.save(user);
        return ResponseEntity.ok("User account id " + user.getId() + " enabled.");
    }

    //Returns all users
    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    record emailDto (String email) {}
}
