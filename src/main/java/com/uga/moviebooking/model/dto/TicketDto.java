package com.uga.moviebooking.model.dto;

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
}
