package com.uga.moviebooking.model.movie;

import com.uga.moviebooking.model.dto.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<MovieDto> search(String title, String category, String director) {
        title = "%" + title + "%";
        category = "%" + category + "%";
        director = "%" + director + "%";
        List<Movie> movies = movieRepository.findByTitleLikeAndCategoryLikeAndDirectorLike(title, category, director);
        return dto(movies);
    }
     

    public Movie createMovie(MovieDto mov) {
        Movie movie = new Movie(mov);
        return movieRepository.save(movie);
    }

    //for delete movies
   public long archiveMovie(long id) {
       Movie movie = movieRepository.findById(id).orElse(null);
       if(movie == null)
           return 0;
       movie.setStatus(MovieStatus.ARCHIVED);
       movieRepository.save(movie);
       return movie.getId();
   }

   //Get Movie
   public Movie getMovie(long ID){
    Movie movie = movieRepository.findById(ID).orElse(null);
    return movie;
   }

   public boolean movieExists(long id) {
        return movieRepository.existsById(id);
   }

    //Update Movie
    public long updateMovie(long id, MovieDto updatedMovie) {
        if(!movieExists(id))
            return -1;
        Movie updated = new Movie(updatedMovie);
        updated.setId(id);
        updated = movieRepository.save(updated);
        return updated.getId();
    }

    public Optional<List<Movie>> getFrontpageMovies() {
         Page<Movie> page = movieRepository.findAll(PageRequest.of(0, 50, Sort.by(Sort.Order.asc("id"))));
         return Optional.of(page.getContent());
    }

    public Optional<List<Movie>> getFrontpageMoviesWithShowtimes() {
        Page<Movie> page = movieRepository.findAll(PageRequest.of(0, 50, Sort.by(Sort.Order.asc("id"))));
        
        return Optional.of(page.getContent());
    }

    public List<MovieDto> getCurrentlyShowingMovies() {
        List<Movie> movies = movieRepository.findByStatus(MovieStatus.CURRENTLY_SHOWING);

        return dto(movies);
    }

    public List<MovieDto> getComingSoonMovies() {
        List<Movie> movies = movieRepository.findByStatus(MovieStatus.COMING_SOON);

        return dto(movies);
    }

    private MovieDto dto(Movie movie) {
       return new MovieDto(movie);
    }

    private List<MovieDto> dto(List<Movie> movies) {
        List<MovieDto> movieDtos = new ArrayList<>();
        for(Movie m : movies) {
            movieDtos.add(new MovieDto(m));
        }
        return movieDtos;
    }

    
    
    
}
