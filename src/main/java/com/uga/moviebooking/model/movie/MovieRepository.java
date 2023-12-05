package com.uga.moviebooking.model.movie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<List<Movie>> findByTitleLike(String title);

   
    
    Page<Movie> findAll(Pageable pageable);

    List<Movie> findByStatus(MovieStatus status);

    List<Movie> findByTitleLikeAndCategoryLikeAndDirectorLike(String title, String category, String director);
}
