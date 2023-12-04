package com.uga.moviebooking.model.promotion;

import com.uga.moviebooking.model.booking.ticket.Ticket;
import com.uga.moviebooking.model.booking.ticket.TicketRepository;
import com.uga.moviebooking.model.dto.PromotionDto;
import com.uga.moviebooking.model.dto.TicketDto;
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
    TicketRepository ticketRepository;
    @Autowired
    public PromotionService(PromotionRepository promotionRepository, EmailService emailService,TicketRepository ticketRepository ) {
        this.promotionRepository = promotionRepository;
        this.emailService = emailService;
        this.ticketRepository = ticketRepository;
    }
    public Promotion createPromotion(PromotionDto promotionDto){
        Promotion promotion = new Promotion();
        promotion.setPromoTitle(promotionDto.getPromoTitle());
        promotion.setMessage(promotionDto.getMessage());
        promotion.setInitializationDate(promotionDto.getInitializationDate());
        promotion.setExpirationDate(promotionDto.getExpirationDate());
        promotion.setPromoCode(promotionDto.getPromoCode());
        promotion.setPercentageOff(promotionDto.getPercentageOff());
        return promotionRepository.save(promotion);
    }
    //get

    //Possible additions to modify prices

    /*public boolean modifyPriceAfterPromotion(long promotionID, long ticketID){
        //find ticket and promos by id
        Optional<Ticket> ticketBox = ticketRepository.findById(ticketID);
        Optional<Promotion> promotionBox = promotionRepository.findById(promotionID);
        //verify that ticket is present
        if(ticketBox.isPresent() && promotionBox.isPresent()) {
            //take ticket and promo out of the opt box
            Promotion promotion = promotionBox.get();
            Ticket ticket = ticketBox.get();
            //calculate percent off
            long percentOff =promotion.getPercentageOff();
            long price = ticket.getPrice();
            long priceNew = ((price-percentOff)/price)*100;
            //set the new price
            ticket.setPrice(priceNew);
            //save ticket price into repository
            ticketRepository.save(ticket);
            return true;
        }//if

        return false;

    }*/

    public boolean modifyPriceAfterPromotion(long promotionID, long ticketID) {
        // Find ticket and promotion by ID
        Optional<Ticket> ticketBox = ticketRepository.findById(ticketID);
        Optional<Promotion> promotionBox = promotionRepository.findById(promotionID);

        // Verify that ticket is present
        if (ticketBox.isPresent() && promotionBox.isPresent()) {
            // Take ticket and promotion out of the Optional box
            Promotion promotion = promotionBox.get();
            Ticket ticket = ticketBox.get();

            // Calculate discount
            double discountPercentage = promotion.getPercentageOff();
            double originalPrice = (double) ticket.getPrice();
            double discountAmount = (originalPrice * discountPercentage)/100;
            double discountedPrice = originalPrice - discountAmount;

            // Set the new price
            ticket.setPrice((long) discountedPrice);

            // Save ticket price into repository
            ticketRepository.save(ticket);
            return true;
        }

        return false;
    }



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

            if(promotion.getPercentageOff() != promotionDto.getPercentageOff()){
                promotion.setPercentageOff(promotionDto.getPercentageOff());
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
        int counter = 0;
        // 2. Send the email to each user in the list.
        for (int i = 0; i < userElement.size(); i++) {
            String to = userElement.get(i).getUsername();

                if(emailService.sendEmail(to, "New Promotion Alert", emailContent)){
                    System.out.println("promo email sent to user: " + userElement.get(i).getId());
                    counter++;
                }else{
                    System.out.println("promo email not sent to user: " + userElement.get(i).getId());
                }
                System.out.print("Was able to send " + counter + "emails out of " + userElement.size() + " total users");

        }
    }




}
