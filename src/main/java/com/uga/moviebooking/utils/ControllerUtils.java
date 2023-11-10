package com.uga.moviebooking.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.List;

public final class ControllerUtils {

    public static ResponseEntity<Object> validationErrorResponse(BindingResult bind) {
        List<String> errors = bind.getAllErrors().stream().map(e -> e.getDefaultMessage()).toList();
        return ResponseEntity.badRequest().body(new ErrorResponse("Validation failure",errors));
    }
    private record ErrorResponse(String message, List<String> errors) {}
}
