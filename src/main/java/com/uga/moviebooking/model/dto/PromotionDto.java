package com.uga.moviebooking.model.dto;

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
}
