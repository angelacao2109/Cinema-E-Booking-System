package com.uga.moviebooking.model.dto;

import com.uga.moviebooking.model.movie.MovieStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class MovieDto {

    private String title;

    private String category;

    private String cast;

    private String director;

    private String producer;

    private String synopsis;

    private List<String> reviews;

    private String rating;

    private String trailerPictureUrl;

    private String trailerVideoUrl;

    private MovieStatus movieStatus;

    private LocalDate releaseDate;
}
