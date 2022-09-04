import express,{Request, Response} from "express";
import bodyParser from "body-parser";
import randomstring from "randomstring";
import {connectToDB} from "./configs/db"
const app = express();
connectToDB();
app.use((req:Request,res:Response,next:any)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.methods === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT');
    }
    next();
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/*handle routes*/
import userRoutes from "./routes/users"
app.use("/users",userRoutes);

app.listen(process.env.PORT || 8000);
