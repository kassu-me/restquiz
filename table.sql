-- Lisää uusi tietokanta
CREATE DATABASE IF NOT EXISTS quizdb;

-- Ottaa tietokannan käyttöön
USE quizdb;

-- Luodaan taulu kysymyksille ja vastauksille
CREATE TABLE quiz (
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL
);

-- Lisätään kysymyksiä ja vastauksia
INSERT INTO quiz (question, answer)
    VALUES
    (
        'Mikä on maailman pienin valtio?', 'Vatikaani'
    ),
    (
        'Mikä on Ruotsin pääkaupunki?', 'Tukholma'
    ),
    (
        'Paljon on 7 x 6?', '42'
    )

