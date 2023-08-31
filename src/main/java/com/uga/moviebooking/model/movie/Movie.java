package com.uga.moviebooking.model.movie;

import com.uga.moviebooking.model.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String category;

    private String cast;

    private String director;

    private String producer;

    @Column(columnDefinition = "TEXT")
    private String synopsis;

    // You might want to create a separate entity for reviews and establish a relationship
    // For simplicity, let's assume a list of strings to store reviews
    @ElementCollection
    private List<String> reviews;

    private String trailerPictureUrl;

    private String trailerVideoUrl;



}
