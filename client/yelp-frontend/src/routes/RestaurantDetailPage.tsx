import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    }
    fetchData();
  }, [id, setSelectedRestaurant]);


  return (
    <div>{selectedRestaurant && (
      <>
      <h1 className="text-center display-1">
        {selectedRestaurant.name}
      </h1>
      <div className="text text-center">
        <StarRating rating={selectedRestaurant.average_rating}/> 
        <span className="text-warning ml-1">
          {selectedRestaurant.count ? `(${selectedRestaurant.count})` : "(0)"}
        </span>
      </div>
      <div className="mt-3">
        <Reviews id={selectedRestaurant.id} name={selectedRestaurant.name} location={selectedRestaurant.location} price_range={selectedRestaurant.price_range} count={selectedRestaurant.count} average_rating={selectedRestaurant.average_rating} reviews={selectedRestaurant.reviews} />
      </div>
      <AddReview/>
      </>
    )}</div>
  )
}

export default RestaurantDetailPage