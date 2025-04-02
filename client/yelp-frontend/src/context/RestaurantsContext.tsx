import React, { createContext, useState } from 'react';

export const RestaurantsContext = createContext<RestaurantsContextType>({
    restaurants: [],
    setRestaurants: () => {},
    addRestaurants: () => {}
});

interface RestaurantsContextType {
    restaurants: any[]; // Replace `any` with a more specific type if known
    setRestaurants: React.Dispatch<React.SetStateAction<any[]>>; // Replace `any` with a more specific type if known
    addRestaurants: (restaurant: any) => void; // Replace `any` with a more specific type if known
}

interface RestaurantsContextProviderProps {
    children: React.ReactNode;
}

export const RestaurantsContextProvider = (props: RestaurantsContextProviderProps) => {
    const [restaurants, setRestaurants] = useState<any[]>([]); // Replace `any` with a more specific type if known
    const addRestaurants = (restaurant: any) => {
        setRestaurants([...restaurants, restaurant]);
    }

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants } satisfies RestaurantsContextType}>
            {props.children}
        </RestaurantsContext.Provider>
    );
}