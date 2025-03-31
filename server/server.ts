import express from "express";
import {config} from "dotenv";

config();
const app = express();

// Get all restaurants
app.get("/api/v1/restaurants", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["greggs", "kfc", "capeesh"]
        }
    });
    // return;
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    res.status(200).json({
        status: "success",
        data: {
            restaurant: `Restaurant with ID: ${id}`
        }
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});