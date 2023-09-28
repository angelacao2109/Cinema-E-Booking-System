package com.uga.moviebooking.model.user;

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
import java.util.*;
import java.io.*;
import jakarta.mail.MessagingException;
import java.security.SecureRandom;
import java.util.concurrent.ThreadLocalRandom;
import org.apache.commons.codec.binary.Base64;


@Service
public class UserService {

    private String verificationPath = "/api/auth/verify";

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
                + "Your company name.";

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
}
