package com.uga.moviebooking.model.payment;

import com.uga.moviebooking.model.dto.PaymentCardDto;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PaymentCard {
    public PaymentCard(PaymentCardDto card) {
        this.firstname = card.getFirstName();
        this.lastname = card.getLastName();
        this.cardNumber = card.getCardNumber();
        this.CVV = card.getCvv();
        this.expDate = card.getExpDate();
        this.billingAddress = card.getBillingAddress();
    }
    public PaymentCard() {

    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false, length = 3)
    private String CVV;

    @Column(nullable = false)
    private String expDate;

    @Column(nullable = false)
    private String billingAddress;

}
