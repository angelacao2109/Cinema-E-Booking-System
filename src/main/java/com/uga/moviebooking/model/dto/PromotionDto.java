package com.uga.moviebooking.model.dto;

import com.uga.moviebooking.model.promotion.Promotion;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor

public class PromotionDto {
    private Long id;


    private String promoTitle;


    private String message;


    private Date initializationDate;


    private Date expirationDate;

    private String promoCode;

    private Double percentageOff;


    public PromotionDto(Promotion promo) {
        this.id = promo.getId();
        this.promoTitle = promo.getPromoTitle();
        this.message = promo.getMessage();
        this.initializationDate = promo.getInitializationDate();
        this.expirationDate = promo.getExpirationDate();
        this.promoCode = promo.getPromoCode();
        this.percentageOff = promo.getPercentageOff();

    }
}
