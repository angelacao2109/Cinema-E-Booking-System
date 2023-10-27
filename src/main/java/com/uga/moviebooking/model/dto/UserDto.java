package com.uga.moviebooking.model.dto;


import com.uga.moviebooking.model.payment.PaymentAddress;
import com.uga.moviebooking.model.payment.PaymentCard;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;


@Data
@AllArgsConstructor

public class UserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phoneNumber;
    private Set<PaymentCard> paymentCards;
    private PaymentAddress paymentAddress;
}
