import {connect,connection} from "mongoose"
const url = "mongodb+srv://startupdhabab:srishtinaman0130@cluster0.fs1jnzk.mongodb.net/startupDhaba?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
export async function connectToDB (){
    try {
        await connect(url);
    }catch (e) {
        console.log(e);
    }

    if(connection.readyState >= 1){
        console.log("connected to db");
        return;
    }

    connection.on('error',()=> {console.log("error in connection")});

}
