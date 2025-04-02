import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] =  useState("");
    const [location, setLocation] =  useState("");
    const [priceRange, setPriceRange] =  useState("Price Range");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurant);
        } catch (error) {
            console.error("Error adding restaurant:", error);
        }
    }
    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row d-flex">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Restaurant Name"/>
                    </div>
                    <div className="col mx-2">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Address"/>
                    </div>
                    <div className="col mx-2">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select mr-sm-2 align-self-center">
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