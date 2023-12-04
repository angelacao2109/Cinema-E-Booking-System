package com.uga.moviebooking.model.dto;

import com.uga.moviebooking.model.booking.Booking;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class GetBookingDto {
    private LocalDateTime orderTime;
    private MovieDto movie;
    private ShowtimeDto showtime;
    List<TicketDto> tickets;
    private long totalCost;

    public GetBookingDto(Booking b) {
        this.showtime = new ShowtimeDto(b.getShowtime());
        this.movie = new MovieDto(b.getShowtime().getMovie());
        this.orderTime = b.getOrderTimestamp();
        this.totalCost = b.getTotalCost();
        this.tickets = b.getTickets().stream()
                .map(t -> new TicketDto(t)).collect(Collectors.toList());

    }


}