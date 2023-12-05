package com.uga.moviebooking;

import com.uga.moviebooking.model.booking.ticket.TicketType;
import com.uga.moviebooking.model.booking.ticket.TicketTypeRepository;
import com.uga.moviebooking.model.role.Role;
import com.uga.moviebooking.model.role.RoleRepository;
import com.uga.moviebooking.model.theatre.TheatreService;
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
	@Autowired
	TicketTypeRepository ticketTypeRepository;
	@Autowired
	TheatreService theatreService;

	public static void main(String[] args) {
		SpringApplication.run(MovieBookingApplication.class, args);
	}


	@Override //will only populate if not already there
	public void run(String... args) throws Exception {
		//default roles
		if(roleRepository.findByName("ROLE_USER") == null)
			roleRepository.save(new Role("ROLE_USER"));
		if(roleRepository.findByName("ROLE_ADMIN") == null)
			roleRepository.save(new Role("ROLE_ADMIN"));
		//default admin
		if(!userService.isTaken("admin@admin.com")) {
			User admin = new User();
			admin.setFirstname("Admin");
			admin.setLastname("Account");
			admin.setPhoneNumber("4040000000");
			admin.setEmail("admin@admin.com");
			admin.setPassword("password");
			userService.registerAdmin(admin);
		}
		//default ticket types
		if(ticketTypeRepository.findByType("ADULT") == null)
			ticketTypeRepository.save(new TicketType("ADULT",850));
		if(ticketTypeRepository.findByType("CHILD") == null)
			ticketTypeRepository.save(new TicketType("CHILD",650));
		if(ticketTypeRepository.findByType("SENIOR") == null)
			ticketTypeRepository.save(new TicketType("SENIOR",750));
		//default theatre
		theatreService.createTheatre(1);
		theatreService.createTheatre(2);
		theatreService.createTheatre(3);
		theatreService.createTheatre(4);
	}
}

