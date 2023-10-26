package com.uga.moviebooking.model.dto;

import lombok.Data;

@Data
public class PaymentCardDto {
    private String firstName;
    private String lastName;
    private String expDate;
    private String cardNumber;
    private String cvv;


}
