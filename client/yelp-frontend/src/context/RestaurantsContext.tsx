import React, { createContext, useState } from 'react';

export interface Restaurant {
    id: number;
    location: string;
    name: string;
    price_range: number;
    count: number;
    average_rating: number;
    reviews: Review[];
}

export interface Review {
    id: number;
    restaurant_id: number;
    name: string;
    review: string;
    rating: number;
}


export const RestaurantsContext = createContext<RestaurantsContextType>({
    restaurants: [],
    setRestaurants: () => {},
    addRestaurants: () => {},
    selectedRestaurant: { id: 0, name: '', location: '', price_range: 0, count: 0, average_rating: 0, reviews: [] },
    setSelectedRestaurant: () => {}
});

interface RestaurantsContextType {
    restaurants: any[]; 
    setRestaurants: React.Dispatch<React.SetStateAction<any[]>>; 
    addRestaurants: (restaurant: any) => void; 
    selectedRestaurant: Restaurant;
    setSelectedRestaurant: React.Dispatch<React.SetStateAction<Restaurant>>;

}

interface RestaurantsContextProviderProps {
    children: React.ReactNode;
}

export const RestaurantsContextProvider = (props: RestaurantsContextProviderProps) => {
    const [restaurants, setRestaurants] = useState<any[]>([]); 
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>({
        id: 0,
        name: '',
        location: '',
        price_range: 0,
        count: 0,
        average_rating: 0,
        reviews: []
    });
    const addRestaurants = (restaurant: any) => {
        setRestaurants([...restaurants, restaurant]);
    }

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant } satisfies RestaurantsContextType}>
            {props.children}
        </RestaurantsContext.Provider>
    );
}