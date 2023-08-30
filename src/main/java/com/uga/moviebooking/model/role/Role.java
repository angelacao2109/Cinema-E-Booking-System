package com.uga.moviebooking.model.role;


import com.uga.moviebooking.model.user.User;
import jakarta.persistence.*;

import java.util.List;


@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;


}
