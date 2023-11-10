package com.uga.moviebooking.model.dto;

import com.uga.moviebooking.model.payment.PaymentAddress;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class PaymentAddressDto {
    @NotEmpty(message = "address cannot be blank!")
    private String address;
    @NotEmpty(message = "city cannot be blank!")
    private String city;
    @NotEmpty(message = "state cannot be blank!")
    private String state;
    @NotEmpty(message = "zipCode cannot be blank!")
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
