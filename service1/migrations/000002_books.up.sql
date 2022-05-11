CREATE TABLE IF NOT EXISTS book (
    id serial primary key,
    title varchar(255),
    author varchar(255),
    year integer,
    description text
);

INSERT INTO book VALUES (default, 'It', 'Stephen King', 1986, 'Horror');
INSERT INTO book VALUES (default, 'The green mile', 'Stephen King', 1996, 'Drama');
INSERT INTO book VALUES (default, 'Pet sematary', 'Stephen King', 1983, 'Horror novel');
INSERT INTO book VALUES (default, 'Kobzar', 'Taras Shevchenko', 1840, 'Book of poems');
INSERT INTO book VALUES (default, 'Zapovit', 'Taras Shevchenko', 1845, 'Poem');
