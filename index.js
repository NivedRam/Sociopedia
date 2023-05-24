//---------------- Imports -------------------------------------------
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";
import auth from "./Routes/auth.js";
import { register } from "./Controllers/Auth.js";
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/users.js";
import postRoutes from "./Routes/posts.js";
import { verifyToken } from "./Controllers/middleware/auth.js";
import { createPost } from "./Controllers/posts.js";
import User from "./models/User.js"
import Post from "./models/posts.js";
import {users,posts} from "./Data/index.js"
//---------------- CONFIGURATIONS ---------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("assets", express.static(path.join(__dirname, "public/assets")));

//--------------File Storage---------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("here")
    let des = path.join(__dirname, "../client/public/Assets")
    cb(null, des);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const aa=(req,res,next)=>{
  console.log("hi")
  next()
}

//-----------------ROUTES WITH FILES
// 
app.use("/auth/register",aa, upload.single("picture"), register);
app.post("/posts", upload.single("picture"), createPost);

//------------------------ROUTES-----------------------------

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


//---------------- MONGOOSE SETUP -------------------------------------
const port = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`server port:${port}`));
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
