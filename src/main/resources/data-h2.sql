INSERT INTO user VALUES (1, 'Jack', 'Bauer', '(123)-456-7890', 'man', 1, 'admin@admin.ru', '$2a$10$x/Yb2ndLX7aFfwqlalS4J.W6d2uILbOYBiyxgX5qjenbE1jc0E3yW');
INSERT INTO user VALUES (2, 'Chloe', 'OBrian', '(123)-456-7890', 'woman', 1, 'sdfa@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (3, 'Kim', 'Bauer', '(123)-456-7890', 'man', 1, 'sd21f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (4, 'David', 'Palmer', '(123)-456-7890', 'man', 1, 'sd123f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (5, 'Michelle', 'Dessler', '(123)-456-7890', 'woman', 1, 'sd112f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (6, 'Joe', 'Ken', '(123)-456-7890', 'woman', 1, 'sd41f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (7, 'Arnold', 'Ivanov', '(123)-456-7890', 'man', 1, 'sdfsad1@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (8, 'Luck', 'Petrov', '(123)-456-7890', 'man', 1, 'sasdadf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (9, 'Kelly', 'Sun', '(123)-456-7890', 'woman', 1, 'sd12123f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (10, 'Adolf', 'Musterman', '(123)-456-7890', 'man', 1, 'sdasdasf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (11, 'Kelvin', 'Clein', '(123)-456-7890', 'man', 1, 'sd1214324523f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (12, 'Travis', 'Anglin', '(123)-456-7890', 'man', 1, 'sd12f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (13, 'Jack', 'Smirnov', '(123)-456-7890', 'man', 1, 'sd1f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (14, 'Pit', 'Stop', '(123)-456-7890', 'man', 1, 's23123df@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (15, 'Miranda', 'Walsh', '(123)-456-7890', 'woman', 1, 'sd123@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (16, 'Celeste', 'O', '(123)-456-7890', 'woman', 1, 'sdaadf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (17, 'Johnny', 'Depp', '(123)-456-7890', 'man', 1, 'sdfaas@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (18, 'Jack', 'Bauer', '(123)-456-7890', 'man', 1, 'sdasddf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (19, 'Chloe', 'OBrian', '(123)-456-7890', 'woman', 1, 'sdffghgfhe@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (20, 'Kim', 'Bauer', '(123)-456-7890', 'man', 1, 'sdftyh@sytdf.ru', 'sdfssf');
INSERT INTO user VALUES (21, 'David', 'Palmer', '(123)-456-7890', 'man', 1, 'tytsdf@styhdf.ru', 'sdfssf');
INSERT INTO user VALUES (22, 'Michelle', 'Dessler', '(123)-456-7890', 'woman', 1, 'stydf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (23, 'Joe', 'Ken', '(123)-456-7890', 'woman', 1, 'sd345fgf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (24, 'Arnold', 'Ivanov', '(123)-456-7890', 'man', 1, 'h456sdf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (25, 'Luck', 'Petrov', '(123)-456-7890', 'man', 1, 'sd756f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (26, 'Kelly', 'Sun', '(123)-456-7890', 'woman', 1, 'sdfdgf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (27, 'Adolf', 'Musterman', '(123)-456-7890', 'man', 1, 'sd4567f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (28, 'Kelvin', 'Clein', '(123)-456-7890', 'man', 1, 'sd3453f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (29, 'Travis', 'Anglin', '(123)-456-7890', 'man', 1, 'sd43245f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (30, 'Jack', 'Smirnov', '(123)-456-7890', 'man', 1, 'sdfg3@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (31, 'Pit', 'Stop', '(123)-456-7890', 'man', 1, 'sd345f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (32, 'Miranda', 'Walsh', '(123)-456-7890', 'woman', 1, 'sd346675f@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (33, 'Celeste', 'O', '(123)-456-7890', 'woman', 1, 'sdgfghfgf@sdf.ru', 'sdfssf');
INSERT INTO user VALUES (34, 'user', 'user', '(123)-456-7890', 'man', 1, 'user@user.ru', '$2a$10$TKs0Ww9190rs9Yid74k7I.qrD/RHgkzk6feqNJiW42AtBZvcRBpXW');


INSERT INTO role VALUES (1,'ADMIN');
INSERT INTO role VALUES (2,'USER');

INSERT INTO user_role VALUES (1, 1);
INSERT INTO user_role VALUES (34, 2);

INSERT INTO book VALUES (1, 'Pushkin', 200.10);
INSERT INTO book VALUES (2, 'Lermontov', 200.00);
INSERT INTO book VALUES (3, 'Tolstoy', 200.00);

INSERT INTO user_books VALUES (1, 1);