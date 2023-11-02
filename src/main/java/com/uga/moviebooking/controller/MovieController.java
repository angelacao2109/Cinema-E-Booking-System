package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.MovieDto;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.movie.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@EnableMethodSecurity
@RequestMapping("/api/movie")
@RestController
public class MovieController {


    private MovieService movieService;
    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovie(@RequestParam String title) {
        List<Movie> movieList = movieService.searchByTitle("%" + title + "%");
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping()
    public ResponseEntity<String> addMovie(@RequestBody MovieDto mov) {
        long id = movieService.createMovie(mov).getId();
        return ResponseEntity.ok("Movie ID " + id + " Created!");
    }

    //Needed delete

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping()
    public ResponseEntity<String> deleteMovie(@RequestBody long id) {
        String title = movieService.deleteMovie(id);
        if(title != null){
            return ResponseEntity.ok("Movie " + title + " deleted.");
        }
        return ResponseEntity.ok("Movie not found, or can not be deleted");
    }
}
