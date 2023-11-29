package com.uga.moviebooking.model.dto;


import com.uga.moviebooking.model.payment.PaymentAddress;
import com.uga.moviebooking.model.payment.PaymentCard;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;


@Data
@AllArgsConstructor

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private boolean promotionEnrolled;
    private Set<PaymentCard> paymentCards;
    private PaymentAddress paymentAddress;
    private boolean enabled;
}
