package com.uga.moviebooking.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterDto {
    @NotEmpty private String firstName;
    @NotEmpty private String lastName;
    @NotEmpty private String email;
    @NotEmpty private String password;
    @NotEmpty private String phoneNumber;
    @NotNull private boolean promotionEnrolled;
    private PaymentCardDto paymentCard;
    private PaymentAddressDto paymentAddress;

}
