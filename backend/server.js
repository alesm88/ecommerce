import 'dotenv/config'
// ou import dotenv from 'dotenv';
// dotenv.config();
import express from 'express'
import userRoutes from './routes/userRoute.js'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import authLimiter from './middlewares/rateLimiter.js'
import helmet from 'helmet';
import cors from './middlewares/cors.js';

const app = express()
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('public/uploads'));

app.use(helmet());
app.use(cors);
app.use(authLimiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use('/api/user', userRoutes)

/*
app.get('/', (req, res) => {
    res.render('home')
})
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});