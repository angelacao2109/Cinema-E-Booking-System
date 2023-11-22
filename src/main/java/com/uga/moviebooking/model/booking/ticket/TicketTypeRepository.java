package com.uga.moviebooking.model.booking.ticket;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {
    TicketType findByType(String type);
}
