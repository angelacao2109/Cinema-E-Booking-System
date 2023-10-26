package com.uga.moviebooking.model.payment;

import com.uga.moviebooking.model.dto.PaymentAddressDto;
import jakarta.persistence.*;

@Entity
public class PaymentAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String zipCode;

    public PaymentAddress(PaymentAddressDto paymentAddress) {
        this.address = paymentAddress.getAddress();
        this.city = paymentAddress.getCity();
        this.state = paymentAddress.getState();
        this.zipCode = paymentAddress.getZipCode();
    }

    public PaymentAddress() {

    }
}
