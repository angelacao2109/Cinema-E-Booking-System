package com.uga.moviebooking.controller;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.booking.BookingService;
import com.uga.moviebooking.model.dto.BookingDto;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserService;
import com.uga.moviebooking.utils.ControllerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/booking")
public class BookingController {

    BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping()
    public ResponseEntity<?> makeBooking(@AuthenticationPrincipal String userEmail, @Validated @RequestBody BookingDto booking, BindingResult bind) {
        if(bind.hasErrors()) {
            return ControllerUtils.validationErrorResponse(bind);
        }

        bookingService.createBooking(userEmail, booking);


        return null;
    }

}
