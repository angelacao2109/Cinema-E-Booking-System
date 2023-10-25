package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.MovieDto;
import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.movie.MovieService;
import com.uga.moviebooking.model.promotion.Promotion;
import com.uga.moviebooking.model.promotion.PromotionService;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api/promotion")
@RestController
public class PromotionController {

    UserRepository userRepository;


    PromotionService promotionService;
    @Autowired
    public PromotionController(PromotionService promotionService, UserRepository userRepository) {
        this.promotionService = promotionService;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<String> addPromotion(@RequestBody PromotionDto promo) {
        long id = promotionService.createPromotion(promo).getId();
        return ResponseEntity.ok("Promotion ID " + id + " Created!");
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/delete")
    public ResponseEntity<String> deletePromotion(@RequestBody PromotionDto promo) {
        if (promotionService.removePromotion(promo.getId())) {
            return ResponseEntity.ok("Promotion successfully removed");
        }
        return ResponseEntity.ok("Promotion could not be removed or does not exist.");
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/update")
    public ResponseEntity<String> updatePromotion(@RequestBody PromotionDto promo) {
        if (promotionService.updatePromotion(promo.getId(), promo)) {
            return ResponseEntity.ok("Promotion successfully updated");
        }
        return ResponseEntity.ok("Promotion could not be updated or does not exist.");
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getpromotion")
    public ResponseEntity<Promotion> getPromotion(@RequestBody long ID) {
        Promotion promotion = promotionService.retrievePromotion(ID);
        if (promotion != null) {
            return ResponseEntity.ok(promotion);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //may need to check this method
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getActivePromotions")
    public ResponseEntity<List<Promotion>> activePromotions() {
        Date day = new Date(System.currentTimeMillis());
        List<Promotion> list = promotionService.findActivePromotions(day);
        if (list == null || list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(list);

    }

    //Send promo via email endpoint
    @CrossOrigin(origins = "http://localhost:5173")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/send-promotion-email")
    public ResponseEntity<String> sendPromotionEmail(@RequestBody long ID) {
        // Validate admin permissions.

        Promotion promotion = promotionService.retrievePromotion(ID);
        if (promotion != null) {
            List<User> userEmails = userRepository.findByRolesIn(Arrays.asList("USER_ROLE"));
            promotionService.sendPromotionEmail(promotion, userEmails);
            return ResponseEntity.ok("Promotion emails sent successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Permission denied.");
        }

    }
}



