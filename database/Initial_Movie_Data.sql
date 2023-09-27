-- init.sql

use db_main; -- We use this line so that we select the main database we are using

INSERT INTO movies (cast, category, director, producer, title, trailer_picture_url, trailer_video_url,rating ) VALUES
    ('Nia Vardalos,John Corbett, Louis Mandylor', 'Comedy', 'Nia Vardalos', 'Nia Vardalos' , 'My Big fat Greek Wedding 3', 'https://hollywoodlife.com/wp-content/uploads/2022/07/My-Big-Fat-Greek-Wedding-ss-embed.jpg', 'https://www.youtube.com/watch?v=URp_YATOtb0', 'PG-13'), -- add a comma to cont

    ('Margot Robbie, Ryan Gosling, Issa Rae', 'Fantasy', 'Greta Gerwig', 'Margot Robbie, Tom Ackerley, David Heyman, Robbie Brenner' , 'Barbie', 'https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg', 'https://www.youtube.com/watch?v=pBk4NYhWNMM', 'PG-13'),

    (' John David Washington, Madeleine Yuna Voyles, Gemma Chan ', 'Action', 'Gareth Edwards', 'Chris Weitz' , 'The Creator', 'https://lumiere-a.akamaihd.net/v1/images/p_20cs_thecreator_v1_2004_a32efdb4.jpeg', 'https://www.youtube.com/watch?v=ex3C1-5Dhb8', 'PG-13'),

     ('Jennifer Netteles, Ellen Burstyn, Ann Dowd','Horror','David Gordon Green','Petter Sattler,David Gordon Green','The Exorcist: Believer','https://m.media-amazon.com/images/M/MV5BMzVjZWUzNDUtZTQxMi00N2QzLWJjMzQtZTc4ZTU2YWEzNDA3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg','https://www.youtube.com/watch?v=rSGeC880CYw','R'),

     ('Cillian Murphy, Emily Blunt, Matt Damon','Biography','Christopher Nolan','Christopher Nolan,Kai Bird, Martin Sherwin','Oppenheimer','https://cdn.dribbble.com/userupload/3832494/file/original-5351697deba3aa3a068ead8efae515b6.png','https://www.youtube.com/watch?v=uYPbbksJxIg', 'R'),

     ('Taissa Farmiga, Jonas Bloquet, Storm Reid','Horror','Michael Chaves','Ian Goldberg,Richard Naing, Akela Cooper','The Nun: II','https://sportshub.cbsistatic.com/i/2023/07/06/928234b4-1059-4965-8dfd-adfdbdae0864/the-nun-ii-2-poster.jpg','https://www.youtube.com/watch?v=CAeeIdD4KQU','R'),

     ('Denzel Washington, Dakota Fanning, Eugenio Mastrandrea','Action','Antoine Fuqua','Richard, Wenk, Michael Sloan, Richard Lindheim','The Equalizer 3','https://static.wikia.nocookie.net/viacom4633/images/8/82/The_Equalizer_film.png','https://www.youtube.com/watch?v=19ikl8vy4zs','R'),

     ('Jason Statham, 50 Cent, Megan Fox','Action','Scott Waugh','Kurt Wimmer, Tad Daggerhart, Max Adams','Expend4bles','https://static.wikia.nocookie.net/filmguide/images/e/ee/Expendables_4_official_poster.jpg','https://www.youtube.com/watch?v=DhlaBO-SwVE','R');


