import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from '../components/StarRating';
import { gql, useMutation, useQuery } from '@apollo/client';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';

const GET_RESTAURANT_DETAILS = gql`
  query GetRestaurantDetails($id: ID!) {
    restaurant(id: $id) {
      id,
      name, 
      location,
      price_range,
      count,
      average_rating,
      reviews {
        id, 
        restaurant_id,
        name,
        review,
        rating
      }
    }
  }
`;

const ADD_REVIEW = gql`
  mutation AddReview($restaurant_id: Int!, $name: String!, $review: String!, $rating: Int!) {
    addReview(restaurant_id: $restaurant_id, name: $name, review: $review, rating: $rating) {
      id, 
      name, 
      review,
      rating
    }
  }
`;

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { setSelectedRestaurant } = useContext(RestaurantsContext);

  // Fetch restaurant details
  const { data, loading, error } = useQuery(GET_RESTAURANT_DETAILS, {
    variables: { id },
    onCompleted: (data) => {
      setSelectedRestaurant(data.restaurant[0]);
    },
  });

  // Mutation for adding a review
  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_RESTAURANT_DETAILS, variables: { id } }],
  });

  const handleAddReview = async (name: string, review: string, rating: number) => {
    try {
      await addReview({
        variables: {
          restaurant_id: parseInt(id!), // Ensure id is a number
          name,
          review,
          rating,
        },
      });
    } catch (error) {
      console.log("Error adding review:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const selectedRestaurant = data?.restaurant[0];

  return (
    <div className='my-5'>
      {selectedRestaurant && (
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
          <AddReview onAddReview={handleAddReview}/>
        </>
      )}
    </div>
  )
}

export default RestaurantDetailPage