package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.show.ShowtimeService;
import com.uga.moviebooking.model.theatre.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @GetMapping("/seats")
    public ResponseEntity<?> getTakenSeatsForShowtime(@RequestParam("showtimeID") int showtimeID) {
        List<Seat> seats = showtimeService.getTakenSeats(showtimeID);
        HashMap<String, Object> map = new HashMap<>();
        map.put("seats taken", seats);
        return ResponseEntity.ok(map);
    }


}
