import React, { useContext, useState } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext';
import { gql, useMutation } from '@apollo/client';

const ADD_RESTAURANT = gql`
    mutation AddRestaurant($name: String!, $location: String!, $price_range: Int!) {
        addRestaurant(name: $name, location: $location, price_range: $price_range) {
            id,
            name,
            location, 
            price_range
        }
    }
`;

const AddRestaurant = () => {
    const {setRestaurants} = useContext(RestaurantsContext);
    const [name, setName] =  useState("");
    const [location, setLocation] =  useState("");
    const [priceRange, setPriceRange] =  useState<number>("Price Range" as unknown as number);

    const [addRestaurant] = useMutation(ADD_RESTAURANT, {
        onCompleted: (data) => {
            setRestaurants((prev: any) => [...prev, data.addRestaurant]);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addRestaurant({variables: {name: name, location: location, price_range: priceRange}});
        window.location.reload();
    };

    return (
        <div className="mb-4 my-5">
        <form action="">
            <div className="form-row d-flex">
                <div className="col">
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Restaurant Name"/>
                </div>
                <div className="col mx-2">
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location"/>
                </div>
                <div className="col mx-2">
                    <select value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))} className="form-select mr-sm-2 align-self-center">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button 
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary ml-2"
                >
                    Add
                    </button>
            </div>
        </form>
    </div>
    )
}

export default AddRestaurant