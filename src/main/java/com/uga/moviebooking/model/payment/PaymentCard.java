package com.uga.moviebooking.model.payment;

import jakarta.persistence.*;

@Entity
public class PaymentCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String CVV;

    @Column(nullable = false)
    private String expDate;

    @Column(nullable = false)
    private String billingAddress;

}
