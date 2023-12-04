package com.uga.moviebooking.controller;

import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.dto.PromotionRequestDto;
import com.uga.moviebooking.model.promotion.Promotion;
import com.uga.moviebooking.model.promotion.PromotionService;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<String> addPromotion(@RequestBody PromotionDto promo) {
        long id = promotionService.createPromotion(promo).getId();
        return ResponseEntity.ok("Promotion ID " + id + " Created!");
    }

    @PostMapping("/apply")
    public ResponseEntity<String> applyPromotion(@RequestBody PromotionRequestDto promotionRequestDto){
        if(promotionService.modifyPriceAfterPromotion(promotionRequestDto.getPromotionID(), promotionRequestDto.getTicketID())){
            return ResponseEntity.ok("Promotion applied successfully");
        }
        return ResponseEntity.ok("Promotion was unable to be applied");


    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePromotion(@RequestBody PromotionDto promo) {
        if (promotionService.removePromotion(promo.getId())) {
            return ResponseEntity.ok("Promotion successfully removed");
        }
        return ResponseEntity.ok("Promotion could not be removed or does not exist.");
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<String> updatePromotion(@RequestBody PromotionDto promo) {
        if (promotionService.updatePromotion(promo.getId(), promo)) {
            return ResponseEntity.ok("Promotion successfully updated");
        }
        return ResponseEntity.ok("Promotion could not be updated or does not exist.");
    }

    @GetMapping()
    public ResponseEntity<?> getPromotion(@RequestParam String code) {
        Promotion promotion = promotionService.getPromotion(code);
        if (promotion == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new PromotionDto(promotion));
    }


    @GetMapping("/all")
    public ResponseEntity<?> activePromotions() {
        Date day = new Date(System.currentTimeMillis());
        List<Promotion> list = promotionService.findActivePromotions(day);
        List<PromotionDto> dtoList = new ArrayList<>();
        if (list == null || list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        for(Promotion p : list)
            dtoList.add(new PromotionDto(p));
        return ResponseEntity.ok(dtoList);

    }

    //Send promo via email endpoint
   /* @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    }*/
//only send to users who subscribed for promo
    @PostMapping("/send-promotion-email")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> sendPromotionEmail(@RequestBody long promotionId) {
        Promotion promotion = promotionService.retrievePromotion(promotionId);
        if (promotion != null) {
            List<User> subscribedUsers = userRepository.findByPromotionEnrolledIsTrue();
            promotionService.sendPromotionEmail(promotion, subscribedUsers);
            return ResponseEntity.ok("Promotion emails sent successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Permission denied.");
        }
    }
}