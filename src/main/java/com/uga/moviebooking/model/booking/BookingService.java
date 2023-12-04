package com.uga.moviebooking.model.booking;

import com.uga.moviebooking.AppException;
import com.uga.moviebooking.model.booking.ticket.Ticket;
import com.uga.moviebooking.model.booking.ticket.TicketType;
import com.uga.moviebooking.model.booking.ticket.TicketTypeRepository;
import com.uga.moviebooking.model.dto.CreateBookingDto;
import com.uga.moviebooking.model.dto.GetBookingDto;
import com.uga.moviebooking.model.dto.TicketDto;
import com.uga.moviebooking.model.email.EmailService;
import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.promotion.Promotion;
import com.uga.moviebooking.model.promotion.PromotionService;
import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.show.ShowtimeService;
import com.uga.moviebooking.model.theatre.Seat;
import com.uga.moviebooking.model.theatre.TheatreService;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@Service
public class BookingService {

    private final EmailService emailService;
    private final BookingRepository bookingRepository;
    private final ShowtimeService showtimeService;
    private final UserService userService;
    private final TicketTypeRepository ticketTypeRepository;
    private final TheatreService theatreService;
    private final PromotionService promotionService;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ShowtimeService showtimeService
            , UserService userService, TheatreService theatreService, TicketTypeRepository ticketTypeRepository, EmailService emailService, PromotionService promotionService) {
       this.bookingRepository = bookingRepository;
       this.showtimeService = showtimeService;
       this.userService = userService;
       this.theatreService = theatreService;
       this.ticketTypeRepository = ticketTypeRepository;
       this.emailService = emailService;
        this.promotionService = promotionService;
    }

    public HashMap<String, Object> createBooking(String userEmail, CreateBookingDto bookingDto) throws AppException {
        //validate promo
        double multiplier = 1.0;
        if(bookingDto.getPromoCode() != null) {
            Promotion promo = promotionService.getPromotion(bookingDto.getPromoCode());
            if(promo == null)
                throw new AppException("Invalid Promo Code", 404);
            multiplier -= promo.getPercentageOff();
        }
        Showtime showtime = showtimeService.findById(bookingDto.getShowtimeID());
        User user = userService.findByEmail(userEmail);
        System.out.println("reached");
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
        long cost = getCost(ticketSet);
        booking.setTotalCost((long) (cost * multiplier));
        //generate confirmation code
        String confirmationCode = RandomStringUtils.randomAlphabetic(16);
        booking.setBookingConfirmation(confirmationCode);
        //email user
        sendEmailConfirmation(user,booking);
        booking.setOrderTimestamp(LocalDateTime.now());
        bookingRepository.save(booking);
        //response map
        HashMap<String, Object> response = new HashMap<>();
        response.put("message", "User id " + user.getId() + " successfully created booking id " + booking.getId());
        response.put("timestamp", booking.getOrderTimestamp());
        response.put("confirmationCode", booking.getBookingConfirmation());
        response.put("totalCost", booking.getTotalCost());
        response.put("tickets", tickets);
        return response;
    }

    private void sendEmailConfirmation(User user,Booking booking) {
        String content = "Thank you for your purchase %s! <br>"
                + "Booking Confirmation:<b> %s </b><br>"
                + "Ticket Count: <b> %d </b><br>"
                + "Total Cost:<b> %s </b><br>"
                + "Thank you,<br>"
                + "Movie Booking Company™.";
        String firstName = StringUtils.capitalize(user.getFirstname());
        content = String.format(content, firstName, booking.getBookingConfirmation(),
                booking.getTickets().size(),booking.getCostInDollars().toString());
        emailService.sendEmail(user.getEmail(), "Booking Confirmation", content);
    }

    private long getCost(HashSet<Ticket> ticketSet) {
        long cost = 0;
        for(Ticket t : ticketSet) {
            cost += t.getPrice();
        }
        return cost;
    }

    private Ticket convertTicket(TicketDto ticketDto, Showtime showtime) {
        TicketType type = ticketTypeRepository.findByType(ticketDto.getType());
        if(type == null)
            throw new AppException("Invalid ticket type specified", 400);
        long price = type.getCost();
        int seatCol = ticketDto.getSeatCol();
        int seatRow = ticketDto.getSeatRow();
        Seat seat = theatreService.getSeat(showtime.getTheatre().getId(),seatCol,seatRow);
        if(showtimeService.isSeatBooked(showtime.getId(), seat.getId())) {
            throw new AppException("One or more of the seats is already booked!");
        }
        Ticket ticket = new Ticket(type, seat, showtime,price);
        return ticket;
    }

    public List<GetBookingDto> getHistory(String userEmail) {
        List<Booking> bookings = bookingRepository.findByUserEmail(userEmail);
        List<GetBookingDto> bookingDtos = new ArrayList<>();
        for(Booking b : bookings)
            bookingDtos.add(new GetBookingDto(b));

        return bookingDtos;

    }
}
