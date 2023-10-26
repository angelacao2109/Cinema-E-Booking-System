package com.uga.moviebooking.controller;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.dto.LoginDto;
import com.uga.moviebooking.model.dto.RegisterDto;
import com.uga.moviebooking.model.role.RoleRepository;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginDto login, BindingResult bindingResult,
                                        HttpServletRequest request, HttpServletResponse response) {

        if(request.getUserPrincipal() != null) {
            throw new AppException("User already logged in!");
        }
        if(bindingResult.hasErrors()) {
            throw new AppException("Invalid request");
        }

        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        User user = (User) auth.getPrincipal();

        List<String> roles = user.getAuthorities().stream()
                .map(item -> item.getAuthority()).toList();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE).body(new loginResponse(user.getId(), user.getEmail(),roles));

    }

    @PostMapping("/register")
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
        user.setEnabled(false);
        long id = userService.registerUser(user, getSiteURL(request));
        return new ResponseEntity<>("User id " + id + " successfully registered",HttpStatus.OK);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        //TODO: IMPLEMENT!
        return new ResponseEntity<>("Successfully logged out!", HttpStatus.OK);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@Param("code") String code, HttpServletResponse res) {
        if (userService.verify(code)) {

            return new ResponseEntity<>("Verification Success! Redirecting to homepage...", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Verification Failed... Please try again", HttpStatus.NOT_FOUND);
        }
    }

    public record loginResponse(long id, String email, List<String> roles) {}
}
