import express from "express";
import {config} from "dotenv";

config();
const app = express();
const db = require("./db");
const morgan = require("morgan");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Get all restaurants
app.get("/api/v1/restaurants", async (req: express.Request, res: express.Response) => {    
    try {
        const restaurantRatingsData = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
    
    
        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req: express.Request, res: express.Response) => {
    try {
        const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1;", [req.params.id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                id: restaurant.rows[0].id,
                location: restaurant.rows[0].location,
                name: restaurant.rows[0].name,
                price_range: restaurant.rows[0].price_range,
                count: restaurant.rows[0].count,
                average_rating: restaurant.rows[0].average_rating,
                reviews: reviews.rows
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
    } catch (error) {
        console.log(error);
    }
});

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req: express.Request, res: express.Response) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
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
    } catch (error) {
        console.log(error);
    }
    res.status(204).send();
});

// Add a review
app.post("/api/v1/restaurants/:id/addReview", async (req: express.Request, res: express.Response) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            }
        })
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});
