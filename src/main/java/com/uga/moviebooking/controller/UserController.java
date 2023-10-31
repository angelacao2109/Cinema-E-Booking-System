package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.PasswordDto;
import com.uga.moviebooking.model.dto.PaymentAddressDto;
import com.uga.moviebooking.model.dto.PaymentCardDto;
import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

import org.jose4j.json.internal.json_simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@EnableMethodSecurity
@RequestMapping("/api/user")
@RestController
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

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
                .map(item -> item.getAuthority()).toList();
        return ResponseEntity.ok().body(new userResponse(user.getId(), user.getEmail(),roles));
    }
    
    @PostMapping("/reset-password-email")
    public ResponseEntity<String> sendResetEmail(@RequestParam("email") String userEmail) throws UnsupportedEncodingException, MessagingException { //need to change thse parameters
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null) {
            return ResponseEntity.ok("Password reset unsucessful because user not found.");
        }
        userService.resetSetUpUserPassword(user);


        return ResponseEntity.ok("Password reset successfully.");
    }

    @PostMapping("/reset-password-verify")
    public ResponseEntity<String> verifyResetToken(@RequestParam("token") String token){
        User resetUser = userRepository.findByPasswordResetToken(token);
        if(resetUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No such token exists.");
        }

        // Check if the token has not expired
        if (resetUser.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token has expired.");
        }
        return ResponseEntity.ok("Token has been validated sucessfully.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token, @RequestBody PasswordDto passwordDto) {
        User resetUser = userRepository.findByPasswordResetToken(token);
        System.out.println("Got Here!!!!!!!");
        if(resetUser == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token has expired.");
        }
        System.out.println(passwordDto.getPassword());
    resetUser.setPassword(passwordEncoder.encode(passwordDto.getPassword()));
    
        resetUser.setPasswordResetToken(null);
        resetUser.setResetTokenExpiry(null);
        userRepository.save(resetUser);

        return ResponseEntity.ok("Password reset successfully.");
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

    @PostMapping("/profile/update")
    public ResponseEntity<String> updateProfile(@AuthenticationPrincipal String userEmail, @RequestBody UserDto userDto) {
        if (userService.updateProfile(userDto.getId(), userDto)) {
            return ResponseEntity.ok("User Profile successfully updated");
        }
        return ResponseEntity.ok("User Profile could not be updated or does not exist.");
    }
    public record userResponse(long id, String email, List<String> roles) {}

    @PostMapping("/profile/update-password")
    public ResponseEntity<String> updatePassword(@RequestParam String email,
            @RequestBody Map<String, String> passwordData) {
        String currentPassword = passwordData.get("currentPassword");
        String newPassword = passwordData.get("newPassword");
        if (userService.updatePassword(email, currentPassword, newPassword)) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.ok("Password update failed. Please check your current password.");
        }
    }

    @PostMapping("/profile/update-payment-address")
    public ResponseEntity<String> updatePaymentAddress(@RequestParam String email, @RequestBody PaymentAddressDto updatedAddressDto) {
        if (userService.updatePaymentAddress(email, updatedAddressDto)) {
            return ResponseEntity.ok("Payment address updated successfully");
        } else {
            return ResponseEntity.ok("Payment address update failed.");
        }

    }
    //
    @PostMapping("/profile/card")
    public ResponseEntity<String> addCard(@AuthenticationPrincipal String userEmail,
            @RequestBody PaymentCardDto cardInfoDto) {
        if (userService.addCard(userEmail, cardInfoDto)) {
            return ResponseEntity.ok("Card information added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Card information update failed.");
        }
    }

    @DeleteMapping("/profile/card")
    public ResponseEntity<String> removeCard(@AuthenticationPrincipal String userEmail,
                                                 @RequestBody PaymentCardDto cardInfoDto) {
        if (userService.removeCard(userEmail, cardInfoDto)) {
            return ResponseEntity.ok("Card information removed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Card information update failed.");
        }
    }

}


