package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.booking.BookingService;
import com.uga.moviebooking.model.booking.ticket.TicketService;
import com.uga.moviebooking.model.dto.BookingDto;
import com.uga.moviebooking.utils.ControllerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private final TicketService ticketService;
    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService, TicketService ticketService) {
        this.bookingService = bookingService;
        this.ticketService = ticketService;
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping()
    public ResponseEntity<?> makeBooking(@AuthenticationPrincipal String userEmail, @Validated @RequestBody BookingDto booking, BindingResult bind) {
        if(bind.hasErrors()) {
            return ControllerUtils.validationErrorResponse(bind);
        }

        HashMap<String, Object> response = bookingService.createBooking(userEmail, booking);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/prices")
    public ResponseEntity<?> getTicketPrices() {
        Map<String, Object> map = ticketService.getPrices();

        return ResponseEntity.ok(map);
    }

}
