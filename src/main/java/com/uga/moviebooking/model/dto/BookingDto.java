package com.uga.moviebooking.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class BookingDto {
    @Min(value = 1L, message = "showtimeID must be a valid number and not 0")
    private long showtimeID;
    @Min(value = 1L, message = "paymentCardID must be a valid number and not 0")
    private long paymentCardID;

    @NotEmpty(message = "tickets must not be empty")
    @Valid
    List<TicketDto> tickets;




}