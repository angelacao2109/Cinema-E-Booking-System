package com.uga.moviebooking.model.theatre;

import com.uga.moviebooking.model.show.Showtime;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Theatre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int numberOfSeats;

    @OneToMany(mappedBy = "theatre")
    List<Showtime> showtime;

}
