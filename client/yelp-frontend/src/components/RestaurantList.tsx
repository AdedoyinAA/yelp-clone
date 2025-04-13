import React, {useContext} from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_RESTAURANTS = gql`
    query GetRestaurants {
        restaurants {
            id,
            name,
            location,
            price_range,
            count,
            average_rating
        }
    }
`;

const DELETE_RESTAURANT = gql`
  mutation DeleteRestaurant($id: ID!) {
    deleteRestaurant(id: $id) {
      id
    }
  }
`;

const RestaurantList = () => {
    const [deleteRestaurant] = useMutation(DELETE_RESTAURANT);
    const {setRestaurants} = useContext(RestaurantsContext);
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_RESTAURANTS, {
        onCompleted: (data) => {
            setRestaurants(data.restaurants);
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleRestaurantSelect = (id: number) => {
        navigate(`/restaurants/${id}`);
    };
    
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        window.location.reload();
        try {
            const response = await deleteRestaurant({ variables: { id } });
            setRestaurants((prevRestaurants: any) =>
                prevRestaurants.filter((restaurant: any) => restaurant.id !== id)
            );
            console.log(response);
        } catch (error) {
            console.log("Error deleting restaurant:", error);
        }
    };

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    };

    const renderRating = (restaurant: any) => {
        if (!restaurant.count) {
          return <span className="text-warning">0 reviews</span>;
        }
        return (
          <>
            <StarRating rating={restaurant.average_rating} />
            <span className="text-warning ml-1">({restaurant.count})</span>
          </>
        );
      };

    return (
        <div className="div list-group">
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
                    {data.restaurants && data.restaurants.map((restaurant: any) => (
                        <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>
                                {renderRating(restaurant)}
                            </td>
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
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList