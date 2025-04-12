import { ApolloServer, gql } from 'apollo-server';

// Schema
export const typeDefs = `#graphql
    type Restaurant {
        id: ID!
        name: String!
        location: String!
        price_range: Int!
        count: Int
        average_rating: Float
        reviews: [Review]
    }

    type Review {
        id: ID!
        restaurant_id: Int!
        name: String!
        review: String!
        rating: Int!
    }

    type Query {
        restaurants: [Restaurant] 
        restaurant(id: ID!): [Restaurant]
    }

    type Mutation {
        addRestaurant(name: String!, location: String!, price_range: Int!): [Restaurant]
        addReview(name: String!, review: String!, rating: Int!, restaurant_id: Int!): Review
        updateRestaurant(id: ID!, name: String!, location: String!, price_range: Int!): Restaurant
        deleteRestaurant(id: ID!): [Restaurant]  
    }
`;




