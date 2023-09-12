package com.uga.moviebooking.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uga.moviebooking.model.role.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) // auto-incrementing id value
    private Long id;
    @Column(nullable = false)
    private String firstname;
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    //New additions here on. Delete if needed
    //https://www.codejava.net/frameworks/spring-boot/email-verification-example
    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    private boolean enabled;

    //https://www.javaguides.net/2018/10/user-registration-module-using-springboot-springmvc-springsecurity-hibernate5-thymeleaf-mysql.html ideas from here <--
    @ManyToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinTable(
            name="user_roles",
            joinColumns={@JoinColumn(name="user_id", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="ID")})
    private Set<Role> roles;



}
