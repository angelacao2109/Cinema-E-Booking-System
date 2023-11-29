package com.uga.moviebooking.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uga.moviebooking.model.dto.PaymentAddressDto;
import com.uga.moviebooking.model.dto.PaymentCardDto;
import com.uga.moviebooking.model.dto.RegisterDto;
import com.uga.moviebooking.model.dto.UserDto;
import com.uga.moviebooking.model.payment.PaymentAddress;
import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.role.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    public User(RegisterDto user) {
        this.firstname = user.getFirstName();
        this.lastname = user.getLastName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.password = user.getPassword();
        this.promotionEnrolled = user.isPromotionEnrolled();
        this.enabled = true;
        this.paymentCards = new HashSet<>();
    }

    public Profile getProfile() {
        PaymentAddressDto address = null;
        if(this.paymentAddress != null)
            address = new PaymentAddressDto(this.paymentAddress);
         return new Profile(this.firstname, this.lastname, this.email, this.phoneNumber, this.promotionEnrolled,
                this.paymentCards, address);
    }
    private record Profile(String firstName, String lastName, String email, String phoneNumber, boolean promotionEnrolled,
                           Set<PaymentCard> paymentCards, PaymentAddressDto paymentAddress){};

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) // auto-incrementing id value
    private Long id;
    @Column(nullable = false)
    private String firstname;
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;
    @JsonIgnore
    @Column(nullable = false)
    private String password;

    //New additions here on. Delete if needed
    //https://www.codejava.net/frameworks/spring-boot/email-verification-example
    @Column(name = "verification_code", length = 128)
    private String verificationCode;

    @Column(name = "password_reset_token", length = 128)
    private String passwordResetToken;

    @Column (name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;

    @Column(columnDefinition = "boolean default true")
    private boolean enabled;

    @Column(nullable = false)
    private boolean promotionEnrolled;


    //https://www.javaguides.net/2018/10/user-registration-module-using-springboot-springmvc-springsecurity-hibernate5-thymeleaf-mysql.html ideas from here <--
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="user_roles",
            joinColumns={@JoinColumn(name="user_id", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="ID")})
    private Set<Role> roles;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private Set<PaymentCard> paymentCards;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private PaymentAddress paymentAddress;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}