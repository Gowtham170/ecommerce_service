import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import chechAuth from './util/checkAuth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import uploadRoutes from './routes/uploadRoutes.js';

/* middlewares configuration */
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.static("public"));
app.use(morgan('tiny'));
app.use(express.json());
// app.use('/', express.static('uploads'));

/* routes */
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', chechAuth, userRoutes);
app.use('/api', chechAuth, orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/', express.static('uploads'));

app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
}));

// const _dirname = path.resolve();
// app.use('./uploads', express.static(path.join(_dirname, './uploads')));


/* server and db configuration  */
const PORT = process.env.PORT || 6000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_DB_URL, {  
    useNewUrlParser: true,  
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on the http://localhost:${PORT}`));
}).catch((err) => console.log(`${err} did not connect`));