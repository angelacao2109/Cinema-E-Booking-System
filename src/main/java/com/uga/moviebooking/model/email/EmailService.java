package com.uga.moviebooking.model.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String content) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        try {
            // Set the recipient email address, subject, and email content
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true); // 'true' indicates that the content is HTML

            // Send the email
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Handle the exception or log the error
            e.printStackTrace();
            // You might want to throw a custom exception here or handle errors in your own way
        }
    }
}

