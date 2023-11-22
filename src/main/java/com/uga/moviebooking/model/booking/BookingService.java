package com.uga.moviebooking.model.booking;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.booking.ticket.Ticket;
import com.uga.moviebooking.model.booking.ticket.TicketType;
import com.uga.moviebooking.model.booking.ticket.TicketTypeRepository;
import com.uga.moviebooking.model.dto.BookingDto;
import com.uga.moviebooking.model.dto.TicketDto;
import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.show.ShowtimeService;
import com.uga.moviebooking.model.theatre.Seat;
import com.uga.moviebooking.model.theatre.TheatreService;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class BookingService {

    BookingRepository bookingRepository;
    ShowtimeService showtimeService;
    UserService userService;
    TicketTypeRepository ticketTypeRepository;
    TheatreService theatreService;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ShowtimeService showtimeService
            , UserService userService, TheatreService theatreService) {
       this.bookingRepository = bookingRepository;
       this.showtimeService = showtimeService;
       this.userService = userService;
       this.theatreService = theatreService;
    }

    public void createBooking(String userEmail, BookingDto bookingDto) throws AppException {
        Showtime showtime = showtimeService.findById(bookingDto.getShowtimeID());
        User user = userService.findByEmail(userEmail);
        if(user == null)
            throw new AppException("user not found", 404);
        if(showtime == null)
            throw new AppException("provided showtimeID cannot be found", 404);
        if(!userService.hasCards(userEmail))
            throw new AppException("user does not have payment method saved!", 400);
        PaymentCard card = userService.getCard(userEmail, bookingDto.getPaymentCardID());
        if(card == null)
            throw new AppException("cardID is invalid or not owned by user", 404);
        Booking booking = new Booking();
        booking.setShowtime(showtime);
        booking.setUser(user);
        booking.setPaymentCard(card);
        HashSet<Ticket> ticketSet = new HashSet<>();
        List<TicketDto> tickets = bookingDto.getTickets();
        for(TicketDto t : tickets) {
            Ticket ticket = convertTicket(t,showtime);
            ticketSet.add(ticket);
        }
        booking.setTickets(ticketSet);
        //generate confirmation code
        String confirmationCode = RandomStringUtils.randomAlphabetic(16);
        booking.setBookingConfirmation(confirmationCode);
        //TODO: EMAIL RECEIPT TO USER!!!
        bookingRepository.save(booking);




    }


    private Ticket convertTicket(TicketDto ticketDto, Showtime showtime) {
        TicketType type = ticketTypeRepository.findByType(ticketDto.getType());
        if(type == null)
            throw new AppException("Invalid ticket type specified", 400);
        long price = type.getCost();
        int seatCol = ticketDto.getSeatCol();
        int seatRow = ticketDto.getSeatRow();
        if(!showtimeService.isSeatAvailable(showtime.getId(), seatRow, seatCol)) {
            throw new AppException("One or more of the seats is already booked!");
        }
        Seat seat = theatreService.getSeat(showtime.getTheatre().getId(),seatCol,seatRow);
        Ticket ticket = new Ticket(type, seat, showtime,price);
        return ticket;
    }

}
