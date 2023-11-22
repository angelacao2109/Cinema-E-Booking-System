package com.uga.moviebooking.model.show;

import com.uga.moviebooking.model.booking.Booking;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.theatre.Theatre;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIME)
    @Column(nullable = false)
    private LocalTime showtime;

    //BIDIRECTIONAL!
    @ManyToOne
    @JoinColumn(name = "theatre_id")
    private Theatre theatre;

    @OneToMany(mappedBy = "showtime")
    private List<Booking> bookings;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    Movie movie;

}
