package com.uga.moviebooking.model.user;

import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.promotion.Promotion;
import com.uga.moviebooking.model.role.Role;
import com.uga.moviebooking.model.role.RoleRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.io.*;
import jakarta.mail.MessagingException;
import java.security.SecureRandom;
import java.util.concurrent.ThreadLocalRandom;
import org.apache.commons.codec.binary.Base64;


@Service
public class UserService {

    private String verificationPath = "/api/auth/verify";
    private String resetPasswordPath = "/api/user/reset";
    private String resetTokenPath = "/api/auth/resetToken";

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private JavaMailSender mailSender;
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.mailSender = mailSender;
    }

    public Long registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        Collections.addAll(roles,roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);
        user.setEnabled(true);
        userRepository.save(user);
        return user.getId();
    }

    //https://www.codejava.net/frameworks/spring-boot/email-verification-example
    public Long registerUser(User user, String siteURL) throws UnsupportedEncodingException, MessagingException {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //Maybe can generate random base 64 string
        Random random = ThreadLocalRandom.current();
        byte[] r = new byte[64];
        random.nextBytes(r);
        String randomCode =  Base64.encodeBase64String(r);
        user.setVerificationCode(randomCode);
        user.setEnabled(false);

        Set<Role> roles = new HashSet<>();
        Collections.addAll(roles,roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);
        userRepository.save(user);
        sendVerificationEmail(user, siteURL);
        return user.getId();
    }

    private void sendVerificationEmail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException  {
        String toAddress = user.getEmail();
        String fromAddress = "cinema.ebooking.movies.us@gmail.com";
        String senderName = "Cinema Ebooking";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Movie Booking Company™.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstname());
        //encode URL so it doesn't absolutely break
        String verifyURL = siteURL + verificationPath + "?code=" + URLEncoder.encode(user.getVerificationCode(),StandardCharsets.UTF_8);

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) { //maybe not work
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }
    }

    public void resetSetUpUserPassword(User user, String siteURL) throws UnsupportedEncodingException, MessagingException {

        String resetToken = generateResetToken(); //make the token
        savePasswordResetToken(user,resetToken, Duration.ofHours(1)); //save the token in the database with the user
        sendPasswordResetEmail(user, siteURL, resetToken); //send the reset link to them


    }
    private void sendPasswordResetEmail(User user, String siteURL, String resetToken) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "cinema.ebooking.movies.us@gmail.com";
        String senderName = "Cinema Ebooking";
        String subject = "Password Reset Request";

        // Modify the email content to provide a password reset link
        String content = "Dear [[name]],<br>"
                + "You have requested to reset your password. Please click the link below to reset your password:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">RESET PASSWORD</a></h3>"
                + "If you did not request this, please ignore this email.<br>"
                + "Thank you,<br>"
                + "Your company name.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstname());
        // Encode the URL with the reset token
        String resetURL = "http://localhost:5173" + "/change-password" + "?token=" + URLEncoder.encode(resetToken, StandardCharsets.UTF_8);

        content = content.replace("[[URL]]", resetURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    //Not sure

    private String generateResetToken() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder token = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 32; i++) {
            token.append(characters.charAt(random.nextInt(characters.length())));
        }

        return token.toString();
    }

    public void savePasswordResetToken(User user, String token, Duration duration ){
        user.setPasswordResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plus(duration));
        userRepository.save(user);
    }

    public boolean updateProfile(Long Id, UserDto userDto){
        Optional<User> userProfileBox = userRepository.findById(Id);

        if(userProfileBox.isPresent()){
            User user = userProfileBox.get();
            if(!user.getFirstname().equals(userDto.getFirstname())){
               user.setFirstname(userDto.getFirstname());

            }

            if(!user.getLastname().equals(userDto.getLastname())){
               user.setLastname(userDto.getLastname());
            }

            if(!user.getEmail().equals(userDto.getEmail())){
                user.setEmail(userDto.getEmail());
            }

           userRepository.save(user);
            return true;
        }
        return false;
    }



}
