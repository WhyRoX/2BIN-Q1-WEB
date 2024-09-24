import express from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import drinkRouter from "./routes/drinks";
import filmRouter from "./routes/films";

import { ErrorRequestHandler } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Counter of number of get requests
let counter = 0;
let counterPizzas = 0;
let counterPOST = 0; 
let counterDELETE = 0;
const requestCounter: express.RequestHandler = (_req, _res, next) => {
    if (_req.method === "GET") {
        if (_req.url === "/") {
            counter++;
        }
        if (_req.url === "/pizzas") {
            counterPizzas++;
        }
    }
    if (_req.method === "POST") {
        counterPOST++;
    }
    if (_req.method === "DELETE") {
        counterDELETE++;
    }
    console.log(`Request counter : 
     - GET / : ${counter}
     - GET /pizzas : ${counterPizzas}
     - POST / : ${counterPOST}
     - DELETE / : ${counterDELETE}`);
    next();
};
    
app.use(requestCounter);

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinkRouter);
app.use("/films", filmRouter);

// Error handler
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    return res.status(500).send("Something broke!");
};

app.use(errorHandler);


  

export default app;
