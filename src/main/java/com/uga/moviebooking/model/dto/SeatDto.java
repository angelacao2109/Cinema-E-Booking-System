package com.uga.moviebooking.model.dto;

import lombok.Data;

@Data
public class SeatDto {
    int seatRow;
    int seatCol;
    boolean booked;

    public SeatDto(Integer seatCol, Integer seatRow, boolean booked) {
        this.seatRow = seatRow;
        this.seatCol = seatCol;
        this.booked = booked;
    }
}
