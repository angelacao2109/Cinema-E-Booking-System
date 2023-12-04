package com.uga.moviebooking.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class CreateBookingDto {
    @Min(value = 1L, message = "showtimeID must be a valid number and not 0")
    private long showtimeID;
    @Min(value = 1L, message = "paymentCardID must be a valid number and not 0")
    private long paymentCardID;

    private String promoCode;

    @NotEmpty(message = "tickets must not be empty")
    List<TicketDto> tickets;




}