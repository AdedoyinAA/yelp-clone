import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_RESTAURANT = gql`
    query GetRestaurant($id: ID!) {
        restaurant(id: $id) {
            id,
            name,
            location,
            price_range
        }
    }
`;

const UPDATE_RESTAURANT = gql`
    mutation UpdateRestaurant($id: ID!, $name: String!, $location: String!, $price_range: Int!) {
        updateRestaurant(id: $id, name: $name, location: $location, price_range: $price_range) {
            id, 
            name, 
            location,
            price_range
        }    
    }  
`;


const UpdateRestaurant: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState(0);

    // Fetch restaurant details
    const { loading, error } = useQuery(GET_RESTAURANT, {
        variables: { id },
        onCompleted: (data) => {
            setName(data.restaurant[0].name);
            setLocation(data.restaurant[0].location);
            setPriceRange(data.restaurant[0].price_range);
        }
    });

    const [updateRestaurant] = useMutation(UPDATE_RESTAURANT);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateRestaurant({
                variables: {
                    id, 
                    name, 
                    location,
                    price_range: priceRange,
                }
            })
            navigate("/");
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div className="my-5">
            <form>
                <div className="mb-3 form-group">
                    <label htmlFor="name" className="form-label">Restaurant Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" id="location" />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="price_range" className="form-label">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))} type="number" className="form-control" id="price_range" />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant