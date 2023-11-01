const db = require('./config/db');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require ('cookie-parser');
const session = require('express-session');

const app = express();

PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(cors({
    origin: 'https://shiraishorizon.com',
    credentials: true
}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        sameSite: 'None',
        expires: 1000 * 60 * 60 * 24
    }
}));

app.set('trust proxy', 1);

const navRoutes = require('./routes/NavbarRoutes');
const loginRoutes = require('./routes/LoginRoutes');
const formRoutes = require('./routes/FormRoutes');
const portfolioRoutes = require('./routes/PortfolioRoutes');
const viewArtRoutes = require('./routes/viewArtRoutes');

app.use('/logout', navRoutes);
app.use('/login', loginRoutes);
app.use('/form', formRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/update', viewArtRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/testing', (req, res) => res.json("API working"))
app.get('/', (req, res) => {
    res.send(`<html>
        <h1>API WORKING</h1>
    </html>`)
});
