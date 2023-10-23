package com.uga.moviebooking.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor

public class UserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
