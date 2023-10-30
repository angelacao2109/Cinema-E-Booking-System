package com.uga.moviebooking.model.dto;
// needed this PasswordDTO for resetpassword because when i was changing the password it would be {"password":"pass"} instead of pass
// I think it is something about the JSON 
public class PasswordDto {
    private String password;

  
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
