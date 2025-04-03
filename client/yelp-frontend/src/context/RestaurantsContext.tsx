import React, { createContext, useState } from 'react';

interface Restaurant {
    id: number;
    name: string;
    location: string;
    price_range: number;
    // rating: number;
}

export const RestaurantsContext = createContext<RestaurantsContextType>({
    restaurants: [],
    setRestaurants: () => {},
    addRestaurants: () => {},
    selectedRestaurant: { id: 0, name: '', location: '', price_range: 0 },
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
        price_range: 0
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