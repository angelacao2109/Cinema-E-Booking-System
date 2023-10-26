package com.uga.moviebooking.model.dto;

import lombok.Data;

@Data
public class PaymentAddressDto {
    private String address;
    private String city;
    private String state;
    private String zipCode;
}
