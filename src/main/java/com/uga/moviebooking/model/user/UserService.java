package com.uga.moviebooking.model.user;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.dto.PaymentAddressDto;
import com.uga.moviebooking.model.dto.PaymentCardDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.payment.PaymentAddress;
import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.payment.PaymentCardRepository;
import com.uga.moviebooking.model.role.Role;
import com.uga.moviebooking.model.role.RoleRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;


@Service
public class UserService {

    private final String verificationPath = "/api/auth/verify";
    private final String resetPasswordPath = "/api/user/reset";
    private final String resetTokenPath = "/api/auth/resetToken";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JavaMailSender mailSender;
    private final PaymentCardRepository cardRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, JavaMailSender mailSender,
                       PaymentCardRepository paymentCardRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.mailSender = mailSender;
        this.cardRepository = paymentCardRepository;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
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

    public Long registerAdmin(User admin) {

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Set<Role> roles = new HashSet<>();
        Collections.addAll(roles,roleRepository.findByName("ROLE_USER"),roleRepository.findByName("ROLE_ADMIN"));
        admin.setRoles(roles);
        admin.setEnabled(true);
        userRepository.save(admin);
        return admin.getId();
    }

    //was having issues running this part of the code using the original method, so I am leaving my version here just in case
   /* public Long registerAdmin(User admin) {
        String email = admin.getEmail();

        // Check if a user with the same email already exists
        if (userRepository.existsByEmail(email)) {
            // handle this case according to our application's requirements.
            // For example, throw an exception or return a specific value indicating the conflict.
            // For now, I'll throw an IllegalArgumentException as an example.
            throw new IllegalArgumentException("User with email " + email + " already exists.");
        }

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Set<Role> roles = new HashSet<>();
        Collections.addAll(roles, roleRepository.findByName("ROLE_USER"), roleRepository.findByName("ROLE_ADMIN"));
        admin.setRoles(roles);
        admin.setEnabled(true);
        userRepository.save(admin);
        return admin.getId();
    }*/


    //https://www.codejava.net/frameworks/spring-boot/email-verification-example
    public Long registerUser(User user, String siteURL) throws UnsupportedEncodingException, MessagingException {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Random random = ThreadLocalRandom.current();
        StringBuilder randomCodeBuilder = new StringBuilder();
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (int i = 0; i < 64; i++) {
            char randomChar = characters.charAt(random.nextInt(characters.length()));
            randomCodeBuilder.append(randomChar);
        }

        String randomCode = randomCodeBuilder.toString();

        user.setVerificationCode(randomCode);
        //user.setEnabled(false);

        Set<Role> roles = new HashSet<>();
        Collections.addAll(roles, roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);
        userRepository.save(user);
        sendVerificationEmail(user, siteURL);
        return user.getId();
    }

    private void sendVerificationEmail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException  {
        String toAddress = user.getEmail();
        String fromAddress = "cinema.ebooking.movies.us@gmail.com";
        String senderName = "Cinema E-booking";
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
        String verifyURL = "http://localhost:5173" + "/verify-email"  + "?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);
        System.out.println(verificationCode);
        if(user == null) {
            throw new AppException("User not found!", 404);
        }
        if (user.isAccountNonLocked()) {
            return true;
        } else {
            System.out.println("Verified");
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }
    }

    public void resetUserPassword(User user) throws UnsupportedEncodingException, MessagingException {

        String resetToken = generateResetToken(); //make the token
        savePasswordResetToken(user,resetToken, Duration.ofHours(1)); //save the token in the database with the user
        sendPasswordResetEmail(user, resetToken); //send the reset link to them


    }
    private void sendPasswordResetEmail(User user, String resetToken) throws MessagingException, UnsupportedEncodingException {
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

    //Only handles stuff like phone number,
    public boolean updateProfile(String email, UserDto userDto){
        User user = userRepository.findByEmail(email).orElse(null);
        if(user == null)
            return false;
        if(!user.getFirstname().equals(userDto.getFirstName()))
           user.setFirstname(userDto.getFirstName());
        if(!user.getLastname().equals(userDto.getLastName()))
           user.setLastname(userDto.getLastName());
        if(!user.getPhoneNumber().equals(userDto.getPhoneNumber()))
            user.setPhoneNumber(userDto.getPhoneNumber());
        if(user.isPromotionEnrolled() != userDto.isPromotionEnrolled())
            user.setPromotionEnrolled(userDto.isPromotionEnrolled());
        userRepository.save(user);
        return true;
    }

    public boolean updatePassword(String email, String currentPassword, String newPassword) {
        Optional<User> userBox = userRepository.findByEmail(email);
        if (userBox.isPresent()) {
            User user = userBox.get();

            // Check if the provided current password matches the user's current password
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return false; // Current password is incorrect
            }

            // Update the password
            user.setPassword(passwordEncoder.encode(newPassword));

            userRepository.save(user);
            return true;
        }
        return false; // User not found
    }

    public boolean updatePaymentAddress(String email, PaymentAddressDto updatedAddressDto) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null)
            return false;
        PaymentAddress updatedAddress = new PaymentAddress(updatedAddressDto);
        user.setPaymentAddress(updatedAddress);
        userRepository.save(user);
        return true;
    }

    public boolean isTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    //modifying cards are iffy, as the credit card number is encrypted, are we required to do this?
    public boolean updateCardInfo(String userEmail, PaymentCardDto cardInfoDto) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null)
            return false;

        // Convert the DTO to the entity
        PaymentCard card = new PaymentCard(cardInfoDto);

        // Modify the existing set instead of replacing it
        Set<PaymentCard> existingCards = user.getPaymentCards();
        if (existingCards == null) {
            existingCards = new HashSet<>();
            user.setPaymentCards(existingCards);
        }
        existingCards.clear();
        existingCards.add(card);

        userRepository.save(user);
        return true;
    }

    public PaymentCard getCard(String userEmail, Long cardID) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        PaymentCard card = cardRepository.findById(cardID).orElse(null);
        if(card == null || user == null)
            return null;
        if( user.getPaymentCards().contains(card) ) {
            return card;
        }
        return null;
    }

    public boolean hasCards(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if(user == null)
            throw new AppException("Could not find user", 404);
        if(user.getPaymentCards().size() > 0)
            return true;
        return false;
    }

    public boolean addCard(String userEmail, PaymentCardDto cardInfoDto) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null)
            return false;

        if(user.getPaymentCards().size() >= 3)
            return false;
        PaymentCard card = new PaymentCard(cardInfoDto);
        String lastFour = card.getCardNumber().substring(12);
        card.setCardNumber(lastFour + ":" + passwordEncoder.encode(card.getCardNumber()));


        user.getPaymentCards().add(card);
        userRepository.save(user);
        return true;
    }

    public boolean removeCard(String userEmail, Long cardID) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        PaymentCard card = cardRepository.findById(cardID).orElse(null);
        if(card == null || user == null)
            return false;
        if (user.getPaymentCards().remove(card)) {
            userRepository.save(user);
            return true;
        }
        return false;
    }
    //sub and unsub promo sevrices


    public boolean subscribeToPromotions(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            user.setPromotionEnrolled(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean unsubscribeFromPromotions(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            user.setPromotionEnrolled(false);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean isBanned(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if(!user.isAccountNonLocked() && user.getVerificationCode() == null)
            return true;
        return false;
    }
}
