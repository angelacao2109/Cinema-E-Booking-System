
-- init.sql

use db_main; -- We use this line so that we select the main database we are using

INSERT INTO db_main.movies ( cast, category, director, producer, synopsis, title, trailer_picture_url, trailer_video_url, rating, status, release_date ) VALUES


(
    'Tom Hanks, Tim Allen, Joan Cusack',
    'Animation',
    'John Lasseter',
    'Pixar Animation Studios',
    'When Woody is stolen by a toy collector, Buzz Lightyear and his friends set out on a mission to rescue him.',
    'Toy Story 2',
    'https://c7.alamy.com/comp/B3KY5N/toy-story-2-1999-buena-vistawalt-disney-film-B3KY5N.jpg',
    'https://www.youtube.com/watch?v=t0bxljESZ5U',
    'G',
    'CURRENTLY_SHOWING',
    '1999-11-24'
),

(   'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
    'Sci-Fi',
    'Christopher Nolan',
    'Syncopy',
    'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    'Inception',
    'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    'https://www.youtube.com/watch?v=Jvurpf91omw',
    'R',
    'CURRENTLY_SHOWING',
    '2010-07-16'
),

(
    'Emma Stone, Ryan Gosling, John Legend',
    'Musical',
    'Damien Chazelle',
    'Summit Entertainment',
    'In modern-day Los Angeles, a jazz pianist falls for an aspiring actress in this musical romantic comedy-drama.',
    'La La Land',
    'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png',
    'https://www.youtube.com/watch?v=0pdqf4P9MB8',
    'PG-13',
    'CURRENTLY_SHOWING',
    '2016-12-09'
),

(
    'Robert Downey Jr., Chris Evans, Scarlett Johansson',
    'Action, Adventure',
    'Anthony and Joe Russo',
    'Marvel Studios',
    'The Avengers join forces to stop the evil Thanos from destroying the universe with the power of the Infinity Stones.',
    'Avengers: Infinity War',
    'https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg',
    'https://www.youtube.com/watch?v=6ZfuNTqbHE8',
    'PG-13',
    'CURRENTLY_SHOWING',
    '2018-04-27'
),

(
    'Johnny Depp, Orlando Bloom, Keira Knightley',
    'Action, Adventure, Fantasy',
    'Gore Verbinski',
    'Walt Disney Pictures',
    'Captain Jack Sparrow tries to retrieve his stolen ship, the Black Pearl, and battles the cursed crew led by the undead Captain Hector Barbossa.',
    'Pirates of the Caribbean: The Curse of the Black Pearl',
    'https://resizing.flixster.com/53B9VUV-d33Gpd1MQ-Z13pU-NO0=/fit-in/180x240/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p159655_p_v8_av.jpg',
    'https://www.youtube.com/watch?v=naQr0uTrH_s',
    'PG-13',
    'ARCHIVED',
    '2003-07-09'
),

(
    'Jennifer Lawrence, Josh Hutcherson, Liam Hemsworth',
    'Action, Adventure, Sci-Fi',
    'Francis Lawrence',
    'Lionsgate',
    'Katniss Everdeen becomes the symbol of a rebellion against the Capitol as she fights to save Peeta and a nation moved by her courage.',
    'The Hunger Games: Mockingjay - Part 2',
    'https://upload.wikimedia.org/wikipedia/en/9/9d/Mockingjay_Part_2_Poster.jpg',
    'https://www.youtube.com/watch?v=n-7K_OjsDCQ',
    'PG-13',
    'COMING_SOON',
    '2015-11-20'
);




