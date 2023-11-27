package com.uga.moviebooking.model.theatre;

import com.uga.moviebooking.model.show.Showtime;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Theatre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = true)
    private String name = "";

    @Column(nullable = false)
    private int number;

    @Column(nullable = false)
    private int numberOfSeats;

    @Column(nullable = false)
    private int numRows;

    @Column(nullable = false)
    private int numCols;

    public Theatre() {

    }
    public Theatre(int number, int numRows, int numCols) {
       this.number = number;
       this.numRows = numRows;
       this.numCols = numCols;
       this.numberOfSeats = numRows * numCols;
    }

}
