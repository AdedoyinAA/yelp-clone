import { ApolloServer, gql } from 'apollo-server';
import { config } from 'dotenv';
import { typeDefs } from './schema';

config();
// const app = express();
const db = require('./db');

const resolvers = {
    Query: {
        restaurants: async () => {
            const results = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
            return results.rows;
        },
        restaurant: async (_: any, { id }: { id: number }) => {
            const result = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1;", [id]);
            const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [id]);
            return result.rows.map((restaurant: any) => {
                return {
                    id: restaurant.id,
                    location: restaurant.location,
                    name: restaurant.name,
                    price_range: restaurant.price_range,
                    count: restaurant.count,
                    average_rating: restaurant.average_rating,
                    reviews: reviews.rows
                }
            });
        },
    },
    Mutation: {
        addRestaurant: async (_: any, { name, location, price_range }: { name: string, location: string, price_range: number }) => {
            const result = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [name, location, price_range]);
            return result.rows;
        },
        addReview: async (_: any, { name, review, rating, restaurant_id }: { name: string, review: string, rating: number, restaurant_id: number }) => {
            const result = await db.query("INSERT INTO reviews (name, review, rating, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *", [name, review, rating, restaurant_id]);
            return result.rows[0];
        },
        updateRestaurant: async (_: any, { id, name, location, price_range }: { id: number, name: string, location: string, price_range: number }) => {
            const result = await db.query("UPDATE restaurants  SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [name, location, price_range, id]);
            return result.rows[0];
        },
        deleteRestaurant: async (_: any, { id }: { id: number }) => {
            const result = await db.query("DELETE FROM restaurants WHERE id = $1 RETURNING *", [id]);
            return result.rows;
        }
    }
}



const server = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
})



