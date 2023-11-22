package com.uga.moviebooking.model.show;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.booking.Booking;
import com.uga.moviebooking.model.booking.ticket.Ticket;
import com.uga.moviebooking.model.booking.ticket.TicketRepository;
import com.uga.moviebooking.model.theatre.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.theatre.Theatre;

import java.util.*;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final TicketRepository ticketRepository;

    @Autowired
    public ShowtimeService(ShowtimeRepository showtimeRepository, TicketRepository ticketRepository) {
        this.showtimeRepository = showtimeRepository;
        this.ticketRepository = ticketRepository;
    }

    public Showtime createShowtime(Showtime showtime) {

        List<Showtime> existingShowtimes = showtimeRepository.findByShowtimeAndTheatre(showtime.getShowtime(), showtime.getTheatre());
        if (existingShowtimes.isEmpty()) {
            return showtimeRepository.save(showtime);
        } else {
            throw new RuntimeException("A movie is already scheduled at the specified theatre and time.");
        }
    }

     public void generateShowtimesForMovie(Movie movie, Theatre theatre) {
        Calendar calendar = Calendar.getInstance();

        // Set start time to 10:00 AM
        calendar.set(Calendar.HOUR_OF_DAY, 10);
        calendar.set(Calendar.MINUTE, 0);
        Date startTime = calendar.getTime();

        // Set end time to 11:50 PM
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 50);
        Date endTime = calendar.getTime();

        int movieDuration = 2 * 60; // 2 hours in minutes
        int breakDuration = 15; // 15 minutes

        Date currentShowtime = startTime;

        while (currentShowtime.before(endTime)) {
            // Check if a movie is already scheduled at this time in this theatre
//            List<Showtime> existingShowtimes = showtimeRepository.findByShowtimeAndTheatre(currentShowtime, theatre);
//
//            if (existingShowtimes.isEmpty()) {
//                // Schedule the movie
//                Showtime showtime = new Showtime();
//                showtime.setShowtime(currentShowtime);
//                showtime.setTheatre(theatre);
//                showtime.setMovie(movie);
//                showtimeRepository.save(showtime);
//            }
//
//            // Move to the next time slot
//            calendar.setTime(currentShowtime);
//            calendar.add(Calendar.MINUTE, movieDuration + breakDuration);
//            currentShowtime = calendar.getTime();
        }
    }
    public List<Showtime> getShowtimesForMovie(long movieID) {
        return showtimeRepository.findByMovieID(movieID);
    }


    public Showtime findById(long showtimeID) {
        return showtimeRepository.findById(showtimeID).orElse(null);
    }

    public List<Ticket> getTakenSeats(long showtimeID) {
        List<Ticket> list = ticketRepository.getBookedSeats();
        return list;
    }

    public boolean isSeatBooked(long showtimeID, int row, int col) {
        return ticketRepository.isBooked(showtimeID, row, col);
    }
}