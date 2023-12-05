package com.uga.moviebooking.model.dto;

import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.movie.MovieStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class MovieDto {

    private long id;
    @NotEmpty(message = "title is a required field")
    private String title;

    @NotEmpty(message = "category is a required field")
    private String category;

    private String cast;

    private String director;

    private String producer;

    private String synopsis;

    private List<String> reviews;

    private String rating;

    private String trailerPictureUrl;

    private String trailerVideoUrl;

    @NotNull(message = "movieStatus is a required field")
    private MovieStatus movieStatus;

    @NotNull(message = "releaseDate is a required field")
    private LocalDate releaseDate;

    public MovieDto(Movie movie) {
        this.id = movie.getId();
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
        this.movieStatus = movie.getStatus();
        this.releaseDate = movie.getReleaseDate();
    }
}
