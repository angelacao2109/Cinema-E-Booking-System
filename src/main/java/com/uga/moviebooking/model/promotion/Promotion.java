package com.uga.moviebooking.model.promotion;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "promotions")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String promoTitle;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private Date initializationDate;

    @Column(nullable = false)
    private Date expirationDate;

    @Column(nullable = false)
    private String promoCode;

    @Column(nullable = false )
    private Double percentageOff;
}
