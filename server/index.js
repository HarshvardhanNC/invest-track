import express from 'express';
import mongoose from 'mongoose';
import authRouter from './route/auth.route.js'; // Adjust the path as necessary
import investmentRouter from './route/investments.route.js'
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

app.get("/api/nifty", async (req, res) => {
  try {
    const response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/^NSEI");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch NIFTY data" });
  }
});

// BANKNIFTY API
app.get("/api/banknifty", async (req, res) => {
  try {
    const response = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/^NSEBANK");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch BankNifty data" });
  }
});

app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/investments',investmentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);