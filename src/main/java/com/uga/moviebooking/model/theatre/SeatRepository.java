package com.uga.moviebooking.model.theatre;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    @Query(value = "SELECT s FROM Seat s WHERE s.theatre.id = ?1 and s.seat_row = ?2 and s.seat_col = ?3")
    Optional<Seat> findByTheatreIdAndPosition(long id, int row, int col);
}