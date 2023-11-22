package com.uga.moviebooking.model.theatre;

import jakarta.persistence.*;
import lombok.Data;

@Data
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

    public Seat() {

    }

    public Seat(int row, int col, Theatre theatre) {
        this.theatre = theatre;
        this.seat_row = row;
        this.seat_col = col;
    }

}
