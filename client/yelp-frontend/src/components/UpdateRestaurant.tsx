import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

interface UpdateRestaurantProps {}


const UpdateRestaurant: React.FC<UpdateRestaurantProps> = (props) => {
        const {id} = useParams();
        let navigate = useNavigate();
        const [name, setName] = useState('');
        const [location, setLocation] = useState('');
        const [priceRange, setPriceRange] = useState("");

        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await RestaurantFinder.get(`/${id}`);
                    setName(response.data.data.restaurant.name);
                    setLocation(response.data.data.restaurant.location);
                    setPriceRange(response.data.data.restaurant.price_range);
                } catch (error) {
                    console.error("Error fetching restaurant details:", error);
                }
            }
            fetchData();
        }, [id])

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const response = await RestaurantFinder.put(`/${id}`, {
                    name: name,
                    location: location,
                    price_range: priceRange
                });
                navigate("/");
                console.log(response)
            } catch (error) {
                console.error("Error updating restaurant:", error);
            }
        }

        return (
            <div>
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
                                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} type="number" className="form-control" id="price_range" />
                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Update</button>
                    </form>
            </div>
        )
}

export default UpdateRestaurant