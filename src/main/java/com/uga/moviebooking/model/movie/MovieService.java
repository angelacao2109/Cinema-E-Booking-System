package com.uga.moviebooking.model.movie;

import com.uga.moviebooking.model.dto.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
        return movieRepository.save(movie);
    }

    public Optional<List<Movie>> getFrontpageMovies() {
         Page<Movie> page = movieRepository.findAll(PageRequest.of(0, 50, Sort.by(Sort.Order.asc("id"))));
         return Optional.of(page.getContent());
    }
}
