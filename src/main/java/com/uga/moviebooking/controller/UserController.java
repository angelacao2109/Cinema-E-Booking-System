package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.PaymentAddressDto;
import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import com.uga.moviebooking.model.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequestMapping("/api/user")
@RestController
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired

    private UserService userService;
    @PostMapping("/reset-password-email")
    public ResponseEntity<String> sendResetEmail(HttpServletRequest request, @RequestParam("email") String userEmail) throws UnsupportedEncodingException, MessagingException { //need to change thse parameters
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null) {
            return ResponseEntity.ok("Password reset unsucessful because user not found.");
        }
        userService.resetSetUpUserPassword(user, getSiteURL(request));


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
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token, @RequestBody  String newPassword){
        User resetUser = userRepository.findByPasswordResetToken(token);

        if(resetUser == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token has expired.");
        }

        resetUser.setPassword(passwordEncoder.encode(newPassword));

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

    @GetMapping("/api/profile")
    public ResponseEntity<User> getProfile(@RequestParam String userEmail){
        Optional<User> profileBox = userRepository.findByEmail(userEmail);
        if(profileBox.isPresent()){
            User profile = profileBox.get();
            return ResponseEntity.ok(profile);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    //DONE: POST /api/profile/update (takes in profile fields to update user account)

    @PostMapping("/api/profile/update")
    public ResponseEntity<String> updateProfile(@RequestBody UserDto userDto) {
        if (userService.updateProfile(userDto.getId(), userDto)) {
            return ResponseEntity.ok("User Profile successfully updated");
        }
        return ResponseEntity.ok("User Profile could not be updated or does not exist.");
    }



    @PostMapping("/api/profile/update-password")
    public ResponseEntity<String> updatePassword(@RequestParam String email, @RequestBody Map<String, String> passwordData) {
        String currentPassword = passwordData.get("currentPassword");
        String newPassword = passwordData.get("newPassword");

        if (userService.updatePassword(email, currentPassword, newPassword)) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.ok("Password update failed. Please check your current password.");
        }
    }


    @PostMapping("/api/profile/update-payment-address")
    public ResponseEntity<String> updatePaymentAddress(@RequestParam String email, @RequestBody PaymentAddressDto updatedAddressDto) {
        if (userService.updatePaymentAddress(email, updatedAddressDto)) {
            return ResponseEntity.ok("Payment address updated successfully");
        } else {
            return ResponseEntity.ok("Payment address update failed.");
        }
    }



}
