package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.PaymentAddressDto;
import com.uga.moviebooking.model.dto.PaymentCardDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import com.uga.moviebooking.utils.ControllerUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@EnableMethodSecurity
@RequestMapping("/api/user")
@RestController
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal String email) {
        if(email == null) {
            return ResponseEntity.notFound().build();
        }
        User user = userRepository.findByEmail(email).orElse(null);
        if(user == null) {
            return ResponseEntity.badRequest().build();
        }
        List<String> roles = user.getAuthorities().stream()
                .map(item -> item.getAuthority()).collect(Collectors.toList());
        return ResponseEntity.ok().body(new userResponse(user.getId(), user.getEmail(),roles));
    }
    

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
   // DONE: GET /api/profile (returns profile fields)

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal String userEmail){
        User user = userRepository.findByEmail(userEmail).orElse(null);

        if(user == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user.getProfile());
    }

    //DONE: POST /api/profile/update (takes in profile fields to update user account)

    @PostMapping("/profile")
    public ResponseEntity<String> updateProfile(@AuthenticationPrincipal String userEmail, @RequestBody UserDto userDto) {
        if (userService.updateProfile(userEmail, userDto)) {
            return ResponseEntity.ok("User Profile successfully updated");
        }
        return ResponseEntity.ok("User Profile could not be updated or does not exist.");
    }
    public record userResponse(long id, String email, List<String> roles) {}

    @PostMapping("/profile/password")
    public ResponseEntity<String> updatePassword(@AuthenticationPrincipal String email,
            @RequestBody Map<String, String> passwordData) {
        String currentPassword = passwordData.get("currentPassword");
        String newPassword = passwordData.get("newPassword");
        if (userService.updatePassword(email, currentPassword, newPassword)) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(401).body("Password update failed. Please check your current password.");
        }
    }

    @PostMapping("/profile/address")
    public ResponseEntity<?> updatePaymentAddress(@AuthenticationPrincipal String email, @Validated @RequestBody PaymentAddressDto updatedAddressDto, BindingResult bind) {
        if(bind.hasErrors()) {
            return ControllerUtils.validationErrorResponse(bind);
        }
        if (userService.updatePaymentAddress(email, updatedAddressDto)) {
            return ResponseEntity.ok("Payment address updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Payment address update failed.");
        }

    }

    @PostMapping("/profile/card")
    public ResponseEntity<?> addCard(@AuthenticationPrincipal String userEmail,
            @Validated @RequestBody PaymentCardDto cardInfoDto, BindingResult bind) {
        if(bind.hasErrors())
            return ControllerUtils.validationErrorResponse(bind);
        if (userService.addCard(userEmail, cardInfoDto)) {
            return ResponseEntity.ok("Card information added successfully");
        } else {
            return ResponseEntity.badRequest().body("Card information update failed.");
        }
    }

    @DeleteMapping("/profile/card")
    public ResponseEntity<?> removeCard(@AuthenticationPrincipal String userEmail,
                                                 @RequestParam Long cardID) {
        if (userService.removeCard(userEmail, cardID)) {
            return ResponseEntity.ok("Card information removed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    public record PasswordDto(String password) {}
}


