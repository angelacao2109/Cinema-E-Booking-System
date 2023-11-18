package com.uga.moviebooking.model.booking;

import com.uga.moviebooking.model.payment.PaymentCard;
import com.uga.moviebooking.model.show.Showtime;
import com.uga.moviebooking.model.user.User;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    private long totalCost;

    @OneToMany
    private Set<Ticket> tickets;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "paymentCard_id")
    private PaymentCard paymentCard;




}
