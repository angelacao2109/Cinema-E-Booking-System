package com.uga.moviebooking.controller;

import com.google.gson.Gson;
import com.uga.moviebooking.model.dto.MovieDto;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.movie.MovieRepository;
import com.uga.moviebooking.model.movie.MovieService;
import org.jose4j.http.Response;
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

    @GetMapping("/search/{name}")
    public ResponseEntity<List<Movie>> searchMovie(@PathVariable String name) {
        List<Movie> movieList = movieService.searchByTitle(name);
        if(movieList == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(movieList);
    }
    @GetMapping("/homepage")
    public ResponseEntity<List<Movie>> getTopMovies() {
        List<Movie> movieList = movieService.getFrontpageMovies().orElse(null);
        if(movieList == null)
            return ResponseEntity.notFound().build();
        //get now playing movies + coming soon movies!
        return ResponseEntity.ok(movieList);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMovie(@RequestBody MovieDto mov) {
        long id = movieService.createMovie(mov).getId();
        return ResponseEntity.ok("Movie ID " + id + " Created!");
    }
}
