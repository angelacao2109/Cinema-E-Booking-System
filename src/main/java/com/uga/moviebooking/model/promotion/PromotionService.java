package com.uga.moviebooking.model.promotion;

import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {
    PromotionRepository promotionRepository;

    @Autowired
    public PromotionService(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
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

}
