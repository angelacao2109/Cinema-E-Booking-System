package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.MovieDto;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.movie.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/movie")
@RestController
public class MovieController {


    private MovieService movieService;
    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovie(@RequestParam String title) {
        List<Movie> movieList = movieService.searchByTitle("%" + title + "%");
        if(movieList == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(movieList);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/homepage")
    public ResponseEntity<List<Movie>> getTopMovies() {
        List<Movie> movieList = movieService.getFrontpageMovies().orElse(null);
        if(movieList == null)
            return ResponseEntity.notFound().build();
        //get now playing movies + coming soon movies!
        return ResponseEntity.ok(movieList);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/add")
    public ResponseEntity<String> addMovie(@RequestBody MovieDto mov) {
        long id = movieService.createMovie(mov).getId();
        return ResponseEntity.ok("Movie ID " + id + " Created!");
    }
}
