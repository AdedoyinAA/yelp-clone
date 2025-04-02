import express from "express";
import {config} from "dotenv";

config();
const app = express();
const db = require("./db");
const morgan = require("morgan");

// Middleware
app.use(express.json()); // Parse JSON bodies

// Get all restaurants
app.get("/api/v1/restaurants", async (req: express.Request, res: express.Response) => {    
    try {
        const results = await db.query("SELECT * FROM restaurants")
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req: express.Request, res: express.Response) => {
    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req: express.Request, res: express.Response) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
        console.log(results);
    } catch (error) {
        console.log(error);
    }
});

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req: express.Request, res: express.Response) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req: express.Request, res: express.Response) => { 
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        console.log(results)
    } catch (error) {
        console.log(error);
    }
    res.status(204).send();
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});