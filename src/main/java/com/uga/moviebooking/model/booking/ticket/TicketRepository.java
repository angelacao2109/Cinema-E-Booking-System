package com.uga.moviebooking.model.booking.ticket;

import com.uga.moviebooking.model.theatre.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("SELECT case WHEN count(t) > 0 THEN true ELSE false END FROM Ticket t WHERE t.showtime.id = ?1 AND t.seat.id = ?2")
    boolean isBooked(long showtimeID, long seatId);

    //return all taken seats given showtime id, (might have to use native query)
    @Query("SELECT T.seat from Ticket T WHERE T.showtime.id = ?1")
    List<Seat> findAllByShowtimeId(long showtimeID);

}
