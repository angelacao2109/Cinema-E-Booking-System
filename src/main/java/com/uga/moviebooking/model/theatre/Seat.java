package com.uga.moviebooking.model.theatre;

import jakarta.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "theatre_id")
    private Theatre theatre;

    @Column(nullable = false)
    private Integer seat_row;

    @Column(nullable = false)
    private Integer seat_col;

}
