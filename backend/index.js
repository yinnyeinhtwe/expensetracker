require("dotenv").config();// to load environment variable

const express = require("express"); //to create server,routes, APIs
const passport = require("passport"); //for authentication purpose
const session = require("express-session"); //session management
const googleStrategy = require("passport-google-oauth20").Strategy; 
const verifyToken = require("./middleware/authMiddleware");
const jwt = require("jsonwebtoken");

const app = express(); //initialize express app
const pool = require("./config/db");
const bcrypt = require("bcrypt");
const cors = require("cors");

const { createExpense, findExpensesByUserId } = require('./models/expenseModel');

app.use(
     cors({
          origin: "http://localhost:5173",
          credentials: true,
     })
);

app.use(
     session({
          secret: "secret",
          resave: false,
          saveUninitialized: true,
     })
); //create session

//initialize passport and it manages authentication 
app.use(passport.initialize()); //passport initialize
app.use(passport.session()); //make sure it integrates with Express session, so users can stay logged in as they browse site
app.use(express.json());

passport.use(
     new googleStrategy(
          {
               clientID: process.env.GOOGLE_CLIENT_ID,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET,
               callbackURL:
                    "http://localhost:3000/auth/google/callback",
          },

          async (accessToken, refreshToken, profile, done) => {

               try {

                    const email =
                         profile.emails[0].value;

                    const existingUser =
                         await pool.query(
                              "SELECT * FROM users WHERE email=$1",
                              [email]
                         );

                    let user;

                    if (existingUser.rows.length > 0) {

                         user = existingUser.rows[0];

                    } else {

                         const newUser =
                              await pool.query(
                                   `
                                   INSERT INTO users
                                   (
                                        google_id,
                                        email,
                                        display_name,
                                        provider
                                   )
                                   VALUES($1,$2,$3,$4)
                                   RETURNING *
                                   `,
                                   [
                                        profile.id,
                                        email,
                                        profile.displayName,
                                        "google"
                                   ]
                              );

                         user = newUser.rows[0];
                    }

                    return done(null, user);

               } catch (error) {

                    return done(error, null);

               }
          }
     )
);

//tell passport how to serialize and deserialize users which is necessary for session management
// serialize = saving user data in the session
//deserialize = retriving user data when needed
passport.serializeUser((user,done) => done(null,user));
passport.deserializeUser((user,done) => done(null,user));

//define some routes to handle login and display user information
app.get("/", (req,res) => {
     res.send("<a href= '/auth/google'>Login with Google</a>")
});

app.get(
     "/auth/google", 
     passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
     "/auth/google/callback",
     passport.authenticate('google',
          {
               failureRedirect: "/"
          }
     ), (req,res) => {
          const token = jwt.sign({
               id: req.user.id,
               email: req.user.email
          },
          process.env.JWT_SECRET,{
               expiresIn: "1d"
          }
     )
          res.redirect(
            `http://localhost:5173/google-success?token=${token}`
          );
     }
);

app.get("/profile", verifyToken, (req, res) => {
        if(!req.isAuthenticated()){
           return res.status(401).send(
                "Please login first"
          );
     }
        res.json({
            user: req.user
        });
    }
);

app.get("/logout", (req,res) => {
     req.logOut();
     res.redirect("/");
});

app.get('/api/expenses', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Pulled from your verifyToken middleware

        // Call your Postgres helper function
        const userExpenses = await findExpensesByUserId(userId);
        
        res.json(userExpenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
     try {
          const { email, password } = req.body;
          const existingUser =
               await pool.query(
                    "SELECT * FROM users WHERE email=$1",
                    [email]
               );
          if(existingUser.rows.length > 0){
               return res.status(400).json({
                    message: "User already exists"
               });
          }
          const hashedPassword =
               await bcrypt.hash(password, 10);
          const newUser =
               await pool.query(
                    `
                    INSERT INTO users
                    (
                         email,
                         password,
                         provider
                    )
                    VALUES($1,$2,$3)
                    RETURNING *
                    `,
                    [
                         email,
                         hashedPassword,
                         "local"
                    ]
               );
          res.status(201).json({
               message: "Registration successful",
               user: newUser.rows[0]
          });
     } catch(error){
          res.status(500).json({
               error: error.message
          });
     }
});

app.post("/login", async (req, res) => {
     try {
          const { email, password } = req.body;
          const result =
               await pool.query(
                    "SELECT * FROM users WHERE email=$1",
                    [email]
               );
          const user = result.rows[0];
          if(!user){
               return res.status(404).json({
                    message: "User not found"
               });
          }
          const match =
               await bcrypt.compare(
                    password,
                    user.password
               );
          if(!match){
               return res.status(401).json({
                    message: "Incorrect password"
               });
          }
          req.login(user, (err) => {
               const jwt = require("jsonwebtoken");
               const token = jwt.sign({
                    id: user.id,
                    email: user.email
               },
               process.env.JWT_SECRET,{
                    expiresIn: "1d"
               }
          );
               if(err){
                    return res.status(500).json(err);
               }
               res.json({
                    message: "Login successful",
                    token
               });
          });
     } catch(error){
          res.status(500).json({
               error: error.message
          });
     }
});

//  CORRECT APPROACH
app.post('/api/expenses', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // This is number 6
        const { description, amount, type, date, category } = req.body;

        // Pass each item clearly separated by commas, NOT as one giant object!
        const newExpense = await createExpense(
            userId, 
            description, 
            amount, 
            type, 
            date, 
            category
        );
        
        res.status(201).json(newExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(3000, () => {
     console.log("Server is running at port 3000");
});

app.use(express.json());