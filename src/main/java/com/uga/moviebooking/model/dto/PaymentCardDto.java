package com.uga.moviebooking.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PaymentCardDto {
    @NotBlank(message = "firstName cannot be blank!")
    private String firstName;
    @NotBlank(message = "lastName cannot be blank!")
    private String lastName;
    @NotBlank(message = "expDate cannot be blank!")
    @Size(min = 4,max = 4, message = "expDate must be 4 characters in format mmYY") //STORE CARDS LIKE mmYY
    private String expDate;
    @NotBlank(message = "cardNumber cannot be blank!")
    @Size(min = 16,max = 16, message = "cardNumber must be 16 characters!")
    private String cardNumber;
    @NotBlank(message = "cvv cannot be blank!")
    @Size(min = 3,max = 3, message = "cvv must be 3 characters!")
    private String cvv;
}