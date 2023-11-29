package com.uga.moviebooking.model.user;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    User findByVerificationCode(String code);

    List<User> findByRolesIn(Collection<String> names);

   @Query("SELECT u from User u WHERE u.passwordResetToken = ?1")
         User findByPasswordResetToken(String code);

    List<User> findByPromotionEnrolledIsTrue();
}
