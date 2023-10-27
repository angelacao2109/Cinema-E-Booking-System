package com.uga.moviebooking;

import com.uga.moviebooking.model.role.Role;
import com.uga.moviebooking.model.role.RoleRepository;
import com.uga.moviebooking.model.user.User;
import com.uga.moviebooking.model.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieBookingApplication implements CommandLineRunner{

	@Autowired
	UserService userService;
	@Autowired
	RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(MovieBookingApplication.class, args);
	}


	@Override //will only populate if not already there
	public void run(String... args) throws Exception {
		if(roleRepository.findByName("ROLE_USER") == null)
			roleRepository.save(new Role("ROLE_USER"));
		if(roleRepository.findByName("ROLE_ADMIN") == null)
			roleRepository.save(new Role("ROLE_ADMIN"));
		if(userService.isTaken("admin"))
			return;
		User admin = new User();
		admin.setFirstname("Admin");
		admin.setLastname("Account");
		admin.setPhoneNumber("4040000000");
		admin.setEmail("admin");
		admin.setPassword("password");
		userService.registerAdmin(admin);
	}
}

