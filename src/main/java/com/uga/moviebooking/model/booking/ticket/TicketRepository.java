package com.uga.moviebooking.model.booking.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("SELECT case WHEN count(t) > 0 THEN true ELSE false END FROM Ticket t WHERE t.showtime.id = ?1 AND t.seat.seat_row = ?2 AND t.seat.seat_col = ?3")
    boolean isBooked(long showtimeID, int seatRow, int seatCol);
}
