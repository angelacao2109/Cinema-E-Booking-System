package com.uga.moviebooking.model.show;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.booking.ticket.TicketRepository;
import com.uga.moviebooking.model.dto.SeatDto;
import com.uga.moviebooking.model.dto.ShowtimeDto;
import com.uga.moviebooking.model.movie.Movie;
import com.uga.moviebooking.model.movie.MovieRepository;
import com.uga.moviebooking.model.movie.MovieService;
import com.uga.moviebooking.model.theatre.Seat;
import com.uga.moviebooking.model.theatre.Theatre;
import com.uga.moviebooking.model.theatre.TheatreRepository;
import com.uga.moviebooking.model.theatre.TheatreService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final TicketRepository ticketRepository;
    private final TheatreRepository theatreRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public ShowtimeService(ShowtimeRepository showtimeRepository, TicketRepository ticketRepository, MovieService movieService, TheatreService theatreService, TheatreRepository theatreRepository, MovieRepository movieRepository) {
        this.showtimeRepository = showtimeRepository;
        this.ticketRepository = ticketRepository;
        this.theatreRepository = theatreRepository;
        this.movieRepository = movieRepository;
    }

    public long createShowtime(Showtime showtime) {
        List<Showtime> existingShowtimes = showtimeRepository.findByDateTimeAndTheatre(showtime.getDateTime(), showtime.getTheatre());
        if (existingShowtimes.isEmpty()) {
            return showtimeRepository.save(showtime).getId();
        } else {
            throw new AppException("A movie is already scheduled at the specified theatre and time.", 409);
        }
    }

    public long createShowtime(ShowtimeDto showtimeDto) {
        long theatreId = showtimeDto.getTheatreId();
        long movieId = showtimeDto.getMovieId();
        Movie movie;
        Theatre theatre;
        try {
            movie = movieRepository.getReferenceById(movieId);
            theatre = theatreRepository.getReferenceById(theatreId);
        } catch(EntityNotFoundException e) {
            throw new AppException("movieId or theatreId was not found", 404);
        }
        Showtime showtime = new Showtime();
        showtime.setDateTime(showtimeDto.getShowDate());
        showtime.setMovie(movie);
        showtime.setTheatre(theatre);


        return createShowtime(showtime);
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

    public List<SeatDto> getTakenSeats(long showtimeID) {
        List<Seat> booked = ticketRepository.findAllByShowtimeId(showtimeID);
        List<SeatDto> seats = new ArrayList<>();
        for(Seat s : booked) {
           seats.add(new SeatDto(s.getSeat_col(),s.getSeat_row(), true));
        }
        return seats;
    }

    public boolean isSeatBooked(long showtimeId,long seatId) {
        return ticketRepository.isBooked(showtimeId, seatId);
    }

    public boolean deleteShowtime(long id) {
        try {
            showtimeRepository.deleteById(id);
        } catch(EmptyResultDataAccessException e) {
            return false;
        }
        return true;
    }
}