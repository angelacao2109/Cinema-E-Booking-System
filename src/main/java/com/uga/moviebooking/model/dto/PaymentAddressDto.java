package com.uga.moviebooking.model.dto;

import com.uga.moviebooking.model.payment.PaymentAddress;
import lombok.Data;

@Data
public class PaymentAddressDto {
    private String address;
    private String city;
    private String state;
    private String zipCode;

    public PaymentAddressDto(PaymentAddress address) {
        if(address == null)
            return;
        this.address = address.getAddress();
        this.city = address.getCity();
        this.state = address.getState();
        this.zipCode = address.getZipCode();

    }

    public PaymentAddressDto() {

    }
}
