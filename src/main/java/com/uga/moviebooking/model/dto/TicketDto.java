package com.uga.moviebooking.model.dto;

import com.uga.moviebooking.model.booking.ticket.Ticket;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TicketDto {

    @NotEmpty(message = "ticket type must be specified")
    String type;

    @NotNull
    @Min(value = 1, message = "ticket seatCol must be between 1 and 10")
    @Max(value = 10, message = "ticket seatCol must be between 1 and 10")
    int seatCol;

    @NotNull
    @Min(value = 1, message = "ticket seatRow must be between 1 and 20")
    @Max(value = 20, message = "ticket seatRow must be between 1 and 20")
    int seatRow;

//    long cost;

    public TicketDto(Ticket t) {
        this.type = t.getType().getType();
        this.seatCol = t.getSeat().getSeat_col();
        this.seatRow = t.getSeat().getSeat_row();
//        this.cost = t.getPrice();
    }

    public TicketDto() {

    }
}
