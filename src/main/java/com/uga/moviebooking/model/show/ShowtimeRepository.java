package com.uga.moviebooking.model.show;

import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.theatre.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {


List<Showtime> findByShowtimeAndTheatre(LocalTime showtime, Theatre theatre);
    @Query("select s from Showtime s where s.movie.title = ?1")
    List<Showtime> findByMovieTitle(String movieTitle);



}