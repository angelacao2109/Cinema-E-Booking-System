package com.uga.moviebooking.model.promotion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    @Override
    Optional<Promotion> findById(Long aLong);

    Page<Promotion> findAll(Pageable pageable);
    //this checks for active promotions
    List<Promotion> findByInitializationDateBeforeAndExpirationDateAfter(Date startDate, Date endDate);


}
