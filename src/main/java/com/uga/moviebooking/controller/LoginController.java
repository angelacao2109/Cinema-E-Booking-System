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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService userService;


    @Autowired
    public LoginController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto login) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                login.getEmail(),login.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return new ResponseEntity<>("User signed-in successfully!", HttpStatus.OK);
    }

    //will be deprecated in final version, just creates an already enabled user.
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto register) {
        if(userRepository.existsByEmail(register.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setFirstname(register.getFirstName());
        user.setLastname(register.getLastName());
        user.setEmail(register.getEmail());
        user.setPassword(register.getPassword());

        long id = userService.registerUser(user);
        return new ResponseEntity<>("User id " + id + " successfully registered",HttpStatus.OK);

    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/registerReal")
    public ResponseEntity<String> processRegister(@RequestBody RegisterDto register, HttpServletRequest request)
            throws UnsupportedEncodingException, MessagingException {
        if(userRepository.existsByEmail(register.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setFirstname(register.getFirstName());
        user.setLastname(register.getLastName());
        user.setEmail(register.getEmail());
        user.setPassword(register.getPassword());
        long id = userService.registerUser(user, getSiteURL(request));
        return new ResponseEntity<>("User id " + id + " successfully registered",HttpStatus.OK);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        //TOOD: IMPLEMENT!
        return new ResponseEntity<>("Successfully logged out!", HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@Param("code") String code) {
        if (userService.verify(code)) {
            return new ResponseEntity<>("Verification Success! Redirecting to homepage...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Verification Failed... Please try again", HttpStatus.NOT_FOUND);
        }
    }
}
