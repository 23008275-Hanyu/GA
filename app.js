const express = require('express');
const mysql = require('mysql2');
const app = express();
// Create MySQL connection
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'event'
});
connection.connect((err) => {
if (err) {
console.error('Error connecting to MySQL:', err);
return;
}
console.log('Connected to MySQL database');
});
// Set up view engine
app.set('view engine', 'ejs');
// enable static files
app.use(express.static('public'));
// enable from processing 
app.use(express.urlencoded({
    extended: false
}));
// Define routes
app.get('/',(req, res) => {
    const sql = 'SELECT * FROM events';
    // fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving events');
        }   
        //render HTML page with data
        res.render('index', {events: results});
    });
});
app.get('/quotation/:id', (req,res) => {
    //Extract the product ID from the request parameters
    const eventId = req.params.id;
    const sql = 'SELECT * FROM events WHERE eventId = ?';
    const sqlc = 'SELECT * FROM comments WHERE eventId = ?'
    // fetch data from MySQL based on the product ID
    connection.query(sql, [eventId], (error, results) => {
        if (error){
            console.error('Database query error :', error.message);
            return res.status(500).send('Error Retrieving event by ID');
        }
        if (results.length > 0) {
            const event = results[0];
            connection.query(sqlc, [eventId], (error, comments) => {
                if (error){
                    console.error('Database query error :', error.message);
                    return res.status(500).send('Error Retrieving comments');
                }
                res.render('quotation', {event, comments});
            });
        } else {
            res.status(404).send('Event not found');
        }
    });
});
app.get('/addquotation', (req,res) => {
    res.render('addquotation');
});
app.post('/addquotation', (req,res) => {
    console.log(req.body);
    // extract product data from the request body
    const {title, description, date, price, phone_number, image} = req.body;
    const sql  = "INSERT INTO events (title, description, date, price, phone_number, image) VALUES (?, ?, ?, ?, ?, ?)";
    // insert the new product into the database
    connection.query(sql, [title, description, date, price, phone_number, image], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding quotation:", error);
            res.status(500).send('Error adding quotation');
        } else {
            //send a success response 
            res.redirect('/');
        }
    });
});

app.get('/editquotation/:id', (req,res) => {
    const eventId = req.params.id;
    const sql = 'SELECT * FROM events WHERE eventId = ?';
    // fetch data from MySQL based on the product ID
    connection.query(sql, [eventId], (error, results) => {
        if (error){
            console.error('Database query error :', error.message);
            return res.status(500).send('Error Retrieving event by ID');
        }
        //check if any product with the gievn ID was found
        if (results.length > 0) {
            //render HTML page with the product data
            res.render('editquotation', {event: results[0]});
        } else {
            // if no product with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Quotation not found');
        }
    });
})

app.post('/editquotation/:id', (req,res) => {
    const eventId = req.params.id;
    // extract product data from the request body
    const {title, description, date, price, phone_number} = req.body;
    const sql  = "UPDATE events SET title = ?, description = ?, date = ?, price = ?, phone_number = ?  WHERE eventId = ?";
    // insert the new product into the database
    connection.query(sql, [title, description, date, price, phone_number, eventId], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error edit quotation:", error);
            res.status(500).send('Error edit quotation');
        } else {
            //send a success response 
            res.redirect('/');
        }
    });
});

app.get('/deletequotation/:id', (req,res) => {
    const eventId = req.params.id;
    const sql  = "DELETE FROM events WHERE eventId = ?";
    // insert the new product into the database
    connection.query(sql, [eventId], (error, results) =>{
        if (error) {
            //handle any error that occurs during the database operation
            console.error("Error adding quotation:", error);
            res.status(500).send('Error adding quotation');
        } else {
            //send a success response 
            res.redirect('/');
        }
    })
})

app.get('/Login', (req, res) => {
    res.render('Login');
});

app.post('/login', (req, res) => { 
    const { username, password } = req.body; 
    const query = 'SELECT * FROM registration WHERE username =? AND password =?'; 
    connection.query(query, [username, password], (error, results) => { 
      if (error) { 
        console.error('Error verifying account:', error); 
        res.status(500).render('login', { error: 'Internal Server Error' }); 
      } else if (results.length === 0) { 
        res.status(401).render('login', { error: 'Invalid username or password' }); 
      } else { 
        console.log('Log In Successfully'); 
        res.render('homepage', { username }); //Render homepage with username 
      } 
    }); 
  });

app.get('/Registration', (req,res) => {
    res.render('register');
});

app.post('/register', (req,res) =>{ 
    const {username, email,password} = req.body; 
    const query = "INSERT INTO registration (username, email, password) VALUES (?, ?, ?)" 
    connection.query(query, [username,email,password], (error, results) => { 
      if(error) { 
        console.error("Error inserting data:", error); 
        res.status(500).render('register', {error:'Internal Server error'}) 
      } else { 
        console.log('Data added successfully!'); 
        res.redirect('/login'); 
      } 
    }); 
  });

  app.post('/quotation/:id/comment', (req, res) => {
    const eventId = req.params.id;
    const {comment} = req.body;
    const sql = 'INSERT INTO comments (eventId, comment) VALUES (?, ?)';

    connection.query(sql, [eventId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).send('Error adding comment');
        }
        res.redirect(`/quotation/${eventId}`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));