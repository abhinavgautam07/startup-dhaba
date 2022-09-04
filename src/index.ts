import express from "express";
import bodyParser from "body-parser";
import randomstring from "randomstring";
import {connectToDB} from "./configs/db"
const app = express();
connectToDB();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/*handle routes*/
import userRoutes from "./routes/users"
app.use("/users",userRoutes);

app.listen(process.env.PORT || 8000);
