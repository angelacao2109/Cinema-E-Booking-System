package com.uga.moviebooking.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ShowtimeDto {
    @Min(1)
    long movieId;
    @Min(1)
    long theatreId;
    @NotNull
    LocalDateTime showDate;
}
