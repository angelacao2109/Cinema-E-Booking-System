package com.uga.moviebooking.model.show;

import com.uga.moviebooking.model.booking.Booking;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.theatre.Theatre;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(
    uniqueConstraints=
        @UniqueConstraint(columnNames={"theatre_id", "showtime"})
)
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
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

    public Date getShowtime() {
        return this.showtime;
    }
    
    public Theatre getTheatre() {
        return this.theatre;
    }
    
    public Long getId() {
        return this.id;
    }
    
    public List<Booking> getBookings() {
        return this.bookings;
    }
    
    public Movie getMovie() {
        return this.movie;
    }
     public void setShowtime(Date showtime) {
        this.showtime = showtime;
    }

    public void setTheatre(Theatre theatre) {
        this.theatre = theatre;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
