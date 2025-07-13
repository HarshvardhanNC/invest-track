import express from 'express';
import mongoose from 'mongoose';
import authRouter from './route/auth.route.js'; // Adjust the path as necessary
import expenseRouter from './route/expense.route.js'; // Adjust the path as necessary
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URI 
).then(() => {console.log('MONGOBD CONNECTED')}).catch((error)=>{console.log(error)})


app.get('/', (req, res) => {
  res.send('Hello, World!');
}
);

app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/expense', expenseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);