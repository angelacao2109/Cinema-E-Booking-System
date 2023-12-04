package com.uga.moviebooking.model.dto;
import com.uga.moviebooking.model.show.Showtime;
import lombok.Data;

import java.util.List;

@Data
public class MovieWithShowtimesDto {
    private Long movieId;
    private String movieTitle;
    private List<Showtime> showtimes;

    public MovieWithShowtimesDto(Long movieId, String movieTitle, List<Showtime> showtimes) {
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.showtimes = showtimes;
    }
}

