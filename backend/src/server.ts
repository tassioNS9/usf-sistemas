import "express-async-errors";
import  Express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import router from "./routes";


const app = Express();


const PORT = 3333;

app.use(Express.json())
app.use(cors())
app.use(router)


app.use((error: Error, request: Request, response: Response, next:NextFunction)=>{
    return response.json({
        status: "Error",
        message: error.message
    });
})

app.listen(PORT, ()=> console.log(`server listen on PORT ${PORT}`) );