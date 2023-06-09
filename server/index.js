import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Importing routes
import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
// console.log(CONNECTION_URL, PORT);

// MongoDB database connection
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
// mongoose.set("useFindAndModify", false); This option has been deprecated and is no longer supported in Mongoose version 6.0 or higher.
