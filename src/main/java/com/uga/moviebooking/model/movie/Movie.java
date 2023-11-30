package com.uga.moviebooking.model.movie;

import com.uga.moviebooking.model.dto.MovieDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String cast;

    @Column(nullable = false)
    private String director;

    @Column(nullable = false)
    private String producer;

    @Column(columnDefinition = "TEXT")
    private String synopsis;

    // You might want to create a separate entity for reviews and establish a relationship
    // For simplicity, let's assume a list of strings to store reviews
    @ElementCollection
    private List<String> reviews;

    @Column(nullable = false)
    private String rating;


    @Column(nullable = false)
    private String trailerPictureUrl;

    @Column(nullable = false)
    private String trailerVideoUrl;

    //maybe for movie home page endpoint
    @Column()
    private LocalDate releaseDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MovieStatus status;

    public Movie(MovieDto movie) {
        this.title = movie.getTitle();
        this.category = movie.getCategory();
        this.cast = movie.getCast();
        this.director = movie.getDirector();
        this.producer = movie.getProducer();
        this.synopsis = movie.getSynopsis();
        this.reviews = movie.getReviews();
        this.rating = movie.getRating();
        this.trailerPictureUrl = movie.getTrailerPictureUrl();
        this.trailerVideoUrl = movie.getTrailerVideoUrl();
        this.releaseDate = movie.getReleaseDate();
        this.status = movie.getMovieStatus();
    }
}


