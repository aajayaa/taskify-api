import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';    
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskify';


// DB Connection
mongoose
  .connect(process.env.DB_URI, {
    dbName: "taskify",
  })
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));
// app.use(authJwt());


// Routes
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});