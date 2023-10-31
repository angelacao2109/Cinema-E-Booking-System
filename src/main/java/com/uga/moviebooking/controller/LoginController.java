package com.uga.moviebooking.controller;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.config.JWTUtil;
import com.uga.moviebooking.model.dto.LoginDto;
import com.uga.moviebooking.model.dto.RegisterDto;
import com.uga.moviebooking.model.payment.PaymentAddress;
import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/auth")
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public LoginController(AuthenticationManager authenticationManager, UserRepository userRepository, JWTUtil jwtUtil, UserService userService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginDto login, BindingResult bindingResult,
                                        HttpServletRequest request, HttpServletResponse response) {
        if(bindingResult.hasErrors()) {
            throw new AppException("Invalid request");
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(),login.getPassword()));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String token = jwtUtil.generateToken(login.getEmail());
        return ResponseEntity.ok(new loginResponse(token,"Login Successful!"));
    }

    @PostMapping("/register")
    public ResponseEntity<String> processRegister(@Validated @RequestBody RegisterDto register, BindingResult bind, HttpServletRequest request)
            throws UnsupportedEncodingException, MessagingException {
        if(bind.hasErrors())
            throw new AppException("Invalid parameters for registration!");
        if(userRepository.existsByEmail(register.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }
        User user = new User(register);
        long id = userService.registerUser(user, getSiteURL(request));
        if(register.getPaymentCard() != null) {
            userService.addCard(register.getEmail(), register.getPaymentCard());
        }
        if(register.getPaymentAddress() != null) {
            userService.updatePaymentAddress(register.getEmail(),register.getPaymentAddress());
        }
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

    public record loginResponse(String token, String message) {}
}
