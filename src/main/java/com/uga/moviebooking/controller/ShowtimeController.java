package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.show.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @Autowired
    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping("/movie/{movieTitle}")
public ResponseEntity<List<Showtime>> getShowtimesForMovie(@PathVariable String movieTitle) {
    List<Showtime> showtimes = showtimeService.getShowtimesForMovie(movieTitle);
    return ResponseEntity.ok(showtimes);
}


}
