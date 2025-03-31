import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import './utils/connect.js';
import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);