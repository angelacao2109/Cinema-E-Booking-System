package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.SeatDto;
import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.show.ShowtimeService;
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

    @GetMapping("/movie")
    public ResponseEntity<?> getShowtimesForMovie(@RequestParam("movieID") long movieID) {
        List<Showtime> showtimes = showtimeService.getShowtimesForMovie(movieID);
        HashMap<String, Object> map = new HashMap<>();
        map.put("showtimes", showtimes);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/seats")
    public ResponseEntity<?> getSeatMap(@RequestParam("showtimeID") int showtimeID) {
        List<SeatDto> seatEntities = showtimeService.getTakenSeats(showtimeID);
        HashMap<String, Object> map = new HashMap<>();
        map.put("Unavailable Seats",seatEntities);
        return ResponseEntity.ok(map);
    }


}
