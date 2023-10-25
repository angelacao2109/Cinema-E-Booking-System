package com.uga.moviebooking.model.promotion;

import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.email.EmailService;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.Context;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {
    PromotionRepository promotionRepository;
    EmailService emailService;
    @Autowired
    public PromotionService(PromotionRepository promotionRepository, EmailService emailService) {
        this.promotionRepository = promotionRepository;
        this.emailService = emailService;
    }
    public Promotion createPromotion(PromotionDto promotionDto){
        Promotion promotion = new Promotion();
        promotion.setPromoTitle(promotionDto.getPromoTitle());
        promotion.setMessage(promotionDto.getMessage());
        promotion.setInitializationDate(promotionDto.getInitializationDate());
        promotion.setExpirationDate(promotionDto.getExpirationDate());
        promotion.setPromoCode(promotionDto.getPromoCode());
        return promotionRepository.save(promotion);
    }


    //get

    public Promotion retrievePromotion(Long ID){
        Optional<Promotion> promotionBox = promotionRepository.findById(ID);
        if(promotionBox.isPresent()){
            return promotionBox.get();
        }else{
            return null;
        }

    }

    //update

    public boolean updatePromotion(Long Id, PromotionDto promotionDto){
        Optional<Promotion> promotionBox = promotionRepository.findById(Id);

        if(promotionBox.isPresent()){
            Promotion promotion = promotionBox.get();
            if(!promotion.getPromoTitle().equals(promotionDto.getPromoTitle())){
                promotion.setPromoTitle(promotionDto.getPromoTitle());

            }

            if(!promotion.getInitializationDate().equals(promotionDto.getInitializationDate())){
                promotion.setInitializationDate(promotionDto.getInitializationDate());
            }

            if(!promotion.getExpirationDate().equals(promotionDto.getExpirationDate())){
                promotion.setExpirationDate(promotionDto.getExpirationDate());
            }
            if(!promotion.getMessage().equals(promotionDto.getMessage())){
                promotion.setMessage(promotionDto.getMessage());
            }
            if(!promotion.getPromoCode().equals(promotionDto.getPromoCode())){
                promotion.setPromoCode(promotionDto.getPromoCode());
            }

            promotionRepository.save(promotion);
            return true;
        }
        return false;
    }

    //delete

    public boolean removePromotion(Long Id){
        Optional<Promotion> promotion = promotionRepository.findById(Id);

        if(promotion.isPresent()) {
            promotionRepository.delete(promotion.get());
            return true;

        }

        return false;

    }

    public List<Promotion> findActivePromotions(Date givenDate) {
        return promotionRepository.findByInitializationDateBeforeAndExpirationDateAfter(givenDate, givenDate);
    }

    //Send Promo Via Email


    public void sendPromotionEmail(Promotion promotion, List<User> userElement) {
        // 1. Prepare the email content using your email template.
        String emailContent = promotion.getMessage() + " CODE: " + promotion.getPromoCode();

        // 2. Send the email to each user in the list.
        for (int i = 0; i < userElement.size(); i++) {
            String to = userElement.get(i).getUsername();

            emailService.sendEmail(to, "New Promotion Alert", emailContent);
        }
    }




}
