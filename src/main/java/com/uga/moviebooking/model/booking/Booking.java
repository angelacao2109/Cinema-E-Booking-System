package com.uga.moviebooking.model.booking;

import com.uga.moviebooking.model.booking.ticket.Ticket;
import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    LocalDateTime orderTimestamp;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String bookingConfirmation;

    private long totalCost;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "booking_id")
    private Set<Ticket> tickets = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "paymentCard_id")
    private PaymentCard paymentCard;

    public Booking() {

    }
    public BigDecimal getCostInDollars() {
        BigDecimal payment = new BigDecimal(totalCost).movePointLeft(2);
        return payment;
    }
}
