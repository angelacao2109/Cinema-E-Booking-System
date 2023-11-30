package com.uga.moviebooking.model.booking.ticket;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TicketService {


    private final TicketRepository ticketRepository;
    private final TicketTypeRepository ticketTypeRepository;

    public TicketService(TicketRepository ticketRepository, TicketTypeRepository ticketTypeRepository) {
        this.ticketRepository = ticketRepository;
        this.ticketTypeRepository = ticketTypeRepository;
    }

    public Map<String, Object> getPrices() {
        HashMap<String, Object> map = new HashMap<>();
        List<TicketType> list = ticketTypeRepository.findAll();
        list.forEach(type -> map.put(type.getType(), type.getCost()));
        return map;
    }
}
