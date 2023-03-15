import express from 'express';
import bodyParser  from 'body-parser';
import cors from   'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path'; 
import { fileURLToPath } from 'url';
import {register} from './controllers/auth.js'
import  {loginRoutes} from './routes/loginRoutes.js';
import  {userRoutes} from './routes/usersRoutes';

//  CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit : '30mb' , extended : true}));
app.use(bodyParser.urlencoded({ limit : '30mb', extended : true}));
app.use(cors());

//storage locally (img etc.)
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
    destination : function(req, file,cb){
        cb(null, "public/assets");
    },
    filename : function(req,file,cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage});

// ROUTES WITH FILES
app.post("/auth/register", upload.single("avatar"), register)

// ROUTES
app.use("/auth", loginRoutes);
app.use("/user", userRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch((err) => console.log(`${err} is not connected`));
