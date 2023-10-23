package com.uga.moviebooking.model.booking;

import com.uga.moviebooking.model.show.Showtime;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToMany
    private Set<Ticket> tickets;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;
}
