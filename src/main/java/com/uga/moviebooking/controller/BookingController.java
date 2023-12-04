package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.booking.BookingService;
import com.uga.moviebooking.model.booking.ticket.TicketService;
import com.uga.moviebooking.model.dto.CreateBookingDto;
import com.uga.moviebooking.model.dto.GetBookingDto;
import com.uga.moviebooking.utils.ControllerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
    public ResponseEntity<?> makeBooking(@AuthenticationPrincipal String userEmail, @Validated @RequestBody CreateBookingDto booking, BindingResult bind) {
        if(bind.hasErrors()) {
            return ControllerUtils.validationErrorResponse(bind);
        }

        HashMap<String, Object> response = bookingService.createBooking(userEmail, booking);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/orders")
    public ResponseEntity<?> getBookingHistory(@AuthenticationPrincipal String userEmail) {
        List<GetBookingDto> bookingDtos = bookingService.getHistory(userEmail);
        Map<String, Object> res = new HashMap<>();
        res.put("history",bookingDtos);

        return ResponseEntity.ok(res);

    }
    @GetMapping("/prices")
    public ResponseEntity<?> getTicketPrices() {
        Map<String, Object> map = ticketService.getPrices();

        return ResponseEntity.ok(map);
    }

}
