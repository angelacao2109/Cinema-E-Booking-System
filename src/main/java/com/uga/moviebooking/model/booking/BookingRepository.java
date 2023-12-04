package com.uga.moviebooking.model.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findById(long id);

    @Query("SELECT B from Booking B WHERE B.user.id = ?1")
    List<Booking> findByUserId(long userId);

    @Query("SELECT B from Booking B WHERE B.user.email = ?1")
    List<Booking> findByUserEmail(String email);


}
