import * as dotenv from 'dotenv';

dotenv.config({path: './system.env'});
import express from 'express';
import cors from 'cors';
import model from './models/index.js';
import router from './routes/index.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
router(app);

mongoose.connect('mongodb://localhost:27017/logitodb');

export default app;