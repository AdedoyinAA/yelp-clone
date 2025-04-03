import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating';

interface Restaurant {
    id: number;
    name: string;
    location: string;
    price_range: number;
    count: number;
    average_rating: number;
}



interface RestaurantListProps {}

const RestaurantList: React.FC<RestaurantListProps> = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get('/');
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }
        fetchData();
    }, [setRestaurants]);

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter((restaurant: Restaurant) => {
                return restaurant.id !== id
            }));
            console.log(response);
        } catch (error) {
            console.error("Error deleting restaurant:", error);
        }
    }

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation()

        navigate(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (id: number) => {
        navigate(`/restaurants/${id}`);
    }


    const renderRating = (restaurant: Restaurant) => {
        if (!restaurant.count) {
            return (
                <span className="text-warning">0 reviews</span>
            )
        }
        return (
            <>
            <StarRating rating={restaurant.average_rating}/>
            <span className="text-warning ml-1">
                ({restaurant.count})
            </span>
        </> 
        )
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant: Restaurant) => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td>
                                    <button 
                                        onClick={(e) => handleUpdate(e, restaurant.id)}
                                        className="btn btn-warning"
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        onClick={(e) => handleDelete(e, restaurant.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td>KFC</td>
                        <td>London</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList