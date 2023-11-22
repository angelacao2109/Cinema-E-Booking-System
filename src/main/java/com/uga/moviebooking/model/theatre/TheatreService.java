package com.uga.moviebooking.model.theatre;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class TheatreService {

    private final TheatreRepository theatreRepository;
    private final SeatRepository seatRepository;

    public TheatreService(TheatreRepository theatreRepository, SeatRepository seatRepository) {
        this.theatreRepository = theatreRepository;
        this.seatRepository = seatRepository;
    }

    private final int defaultRows = 10;
    private final int defaultCols = 20;

    public boolean createTheatre(int theatreNumber) {
        if(theatreRepository.findByNumber(theatreNumber).isPresent())
            return false;
        Theatre theatre = new Theatre(theatreNumber, defaultRows, defaultCols);
        theatreRepository.save(theatre);
        createSeats(theatre);
        return true;
    }
    private void createSeats(Theatre theatre) {
        ArrayList<Seat> seatList = new ArrayList<>();
        for(int i = 1; i < theatre.getNumRows() + 1; i++) {
            for(int j = 1; j < theatre.getNumCols() + 1; j++) {
                seatList.add(new Seat(i,j, theatre));
            }
        }
        seatRepository.saveAll(seatList);
    }

    public Seat getSeat(Long id, int seatCol, int seatRow) {
        return seatRepository.findByTheatreIdAndPosition(id,seatCol,seatRow).orElse(null);

    }
}
