package com.uga.moviebooking.model.show;

import com.uga.moviebooking.model.theatre.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {


    @Query("select s from Showtime s where s.movie.title = ?1")
    List<Showtime> findByMovieTitle(String movieTitle);


    @Query("select s from Showtime s where s.movie.id = ?1")
    List<Showtime> findByMovieID(long movieID);


    List<Showtime> findByDateTimeAndTheatre(LocalDateTime showtimeTime, Theatre theatre);
}