package com.uga.moviebooking.model.show;

import com.uga.moviebooking.model.booking.Booking;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.theatre.Theatre;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Date showtime;

    //BIDIRECTIONAL!
    @ManyToOne
    @JoinColumn(name = "theatre_id")
    private Theatre theatre;

    @OneToMany(mappedBy = "showtime")
    private List<Booking> bookings;

    @OneToOne
    @JoinColumn(name = "movie_id")
    Movie movie;
}
