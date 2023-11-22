package com.uga.moviebooking.model.booking.ticket;

import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.theatre.Seat;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    private TicketType type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    public Ticket() {

    }

    public Ticket(TicketType type, Seat seat, Showtime showtime, long cost) {
        this.type = type;
        this.seat = seat;
        this.showtime = showtime;
    }
}
