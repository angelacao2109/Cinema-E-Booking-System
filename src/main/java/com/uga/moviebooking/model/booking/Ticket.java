package com.uga.moviebooking.model.booking;

import com.uga.moviebooking.model.theatre.Seat;
import jakarta.persistence.*;

enum TicketType {
    ADULT,
    CHILD,
    SENIOR
}
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private float price;
    @Enumerated(EnumType.STRING)
    private TicketType type;
    @OneToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

}
