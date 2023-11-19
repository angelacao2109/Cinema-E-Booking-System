package com.uga.moviebooking.model.movie;

import com.uga.moviebooking.model.dto.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private MovieRepository movieRepository;
    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }
    public List<Movie> searchByTitle(String title) {
        return movieRepository.findByTitleLike(title).orElse(null);
    }
     

    public Movie createMovie(MovieDto mov) {
        Movie movie = new Movie();
        movie.setTitle(mov.getTitle());
        movie.setCategory(mov.getCategory());
        movie.setCast(mov.getCast());
        movie.setDirector(mov.getDirector());
        movie.setProducer(mov.getProducer());
        movie.setSynopsis(mov.getSynopsis());
        movie.setReviews(mov.getReviews());
        movie.setRating(mov.getRating());
        movie.setTrailerPictureUrl(mov.getTrailerPictureUrl());
        movie.setTrailerVideoUrl(mov.getTrailerVideoUrl());
        movie.setStatus(mov.getMovieStatus());
        movie.setReleaseDate(mov.getReleaseDate());
        return movieRepository.save(movie);
    }

    //for delete movies
   public String deleteMovie(long id) {
       Movie movie = movieRepository.findById(id).orElse(null);
       if(movie == null)
           return null;
       movieRepository.delete(movie);
       return movie.getTitle();
   }

   //Get Movie
   public Movie getMovie(Long ID){
   Optional <Movie> movie = movieRepository.findById(ID);
   return movie.get();
   }

    public Optional<List<Movie>> getFrontpageMovies() {
         Page<Movie> page = movieRepository.findAll(PageRequest.of(0, 50, Sort.by(Sort.Order.asc("id"))));
         return Optional.of(page.getContent());
    }

    public Optional<List<Movie>> getFrontpageMoviesWithShowtimes() {
        Page<Movie> page = movieRepository.findAll(PageRequest.of(0, 50, Sort.by(Sort.Order.asc("id"))));
        
        return Optional.of(page.getContent());
    }

    public Optional<List<Movie>> getCurrentlyShowingMovies() {
        return Optional.of(movieRepository.findByStatus(MovieStatus.CURRENTLY_SHOWING));
    }

    public Optional<List<Movie>> getComingSoonMovies() {
        return Optional.of(movieRepository.findByStatus(MovieStatus.COMING_SOON));

    }

    
    
    
}
