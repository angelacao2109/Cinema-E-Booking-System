package com.uga.moviebooking.controller;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.dto.MovieDto;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.movie.MovieService;
import com.uga.moviebooking.utils.ControllerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    /*@GetMapping("/homepage")
    public ResponseEntity<List<Movie>> getTopMovies() {
        List<Movie> movieList = movieService.getFrontpageMovies().orElse(null);
        if(movieList == null)
            return ResponseEntity.notFound().build();
        //get now playing movies + coming soon movies!
        return ResponseEntity.ok(movieList);
    }*/

    @GetMapping("/homepage")
    public ResponseEntity<Map<String, List<Movie>>> getTopMovies() {
        List<Movie> currentlyShowingMovies = movieService.getCurrentlyShowingMovies().orElse(null);
        List<Movie> comingSoonMovies = movieService.getComingSoonMovies().orElse(null);

        if (currentlyShowingMovies == null || comingSoonMovies == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, List<Movie>> response = new HashMap<>();
        response.put("currentlyShowing", currentlyShowingMovies);
        response.put("comingSoon", comingSoonMovies);

        return ResponseEntity.ok(response);
    }

    @GetMapping()
    public ResponseEntity<?> getMovieById(@RequestParam long id) {
        Movie movie = movieService.getMovie(id);
        MovieDto resMovie = new MovieDto(movie);
        return ResponseEntity.ok(resMovie);
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
        long archiveId = movieService.archiveMovie(id);
        if(archiveId != 0){
            return ResponseEntity.ok("Movie " + id + " archived.");
        }
        return ResponseEntity.ok("Movie not found, or can not be deleted");
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMovie(@Validated  @RequestBody MovieDto updatedMovie, @PathVariable long id, BindingResult bind) {
        if (bind.hasErrors()) {
            return ControllerUtils.validationErrorResponse(bind);
        }
        long updatedId = movieService.updateMovie(id, updatedMovie);
        if(updatedId == -1)
            throw new AppException("Id not found",404);
        return ResponseEntity.ok("Movie id " + updatedId + " updated successfully!");


    }
}
