package com.uga.moviebooking.model.booking.ticket;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class TicketType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String type;

    @Column(nullable = false)
    long cost;

    public TicketType(String type, long cost) {
        this.type = type;
        this.cost = cost;
    }
    public TicketType(){

    }
}
