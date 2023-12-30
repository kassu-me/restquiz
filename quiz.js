require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const nodemon = require('nodemon');

const app = express ();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
})

// Alkusivun ohjeistus

app.get( '/', (req, resp) => {
    resp.send('Welcome to quiz. Go to endpoint /questions to see quiz questions. When you have answered go to /answers to see correct answers')
});

// REST endpointit 


// Hakee kysymykset tietokannasta
app.get('/questions', async (req, resp) => {
    
    try {
        const connection = await pool.getConnection();
        const [questions] = await connection.execute('SELECT question FROM quiz');
        connection.release();
        resp.json(questions);

    } catch (err) {
        resp.status(500).json ({ error: 'Internal server error' });
    }
});

// Hakee kysymykset ja vastaukset tietokannasta
app.get('/answers', async (req, resp) => {
    
    try {
        const connection = await pool.getConnection();
        const [answers] = await connection.execute('SELECT question, answer FROM quiz');
        connection.release();
        resp.json(answers);

    } catch (err) {
        resp.status(500).json ({ error: 'Internal server error' });
    }
});


// Lisää kysymys ja vastaus tietokantaan

app.post ('/questions', async (req, resp) => {
    try {
        const { question, answer } = req.body;

        const connection = await pool.getConnection();

        const [addQuestion] = await connection.execute('INSERT INTO quiz (question, answer) VALUES (?, ?)', [question, answer]);
        connection.release();
        resp.status(201).json ({ message: 'Question added successfully.' });
    } catch (err) {
        console.error(err);
        resp.status(500).json ({ error: 'Internal server error' });
    }
});





