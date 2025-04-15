import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from '../components/StarRating';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import { useGetRestaurantDetailsQuery, useAddReviewMutation, GetRestaurantDetailsDocument } from '../graphql/generated/schema';
import { Review } from '../context/RestaurantsContext';


const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { setSelectedRestaurant } = useContext(RestaurantsContext);

  // Fetch restaurant details
  const { data, loading, error } = useGetRestaurantDetailsQuery({
    variables: { id: id || "" },
    onCompleted: (data) => {
      if (data?.restaurant?.[0]) {
        setSelectedRestaurant({
          ...data.restaurant[0],
          id: parseInt(data.restaurant[0].id, 10),
          count: data.restaurant[0].count ?? 0, // Provide a default value for count
          average_rating: data.restaurant[0].average_rating ?? 0, // Provide a default value for average_rating
          reviews: (data.restaurant[0].reviews ?? []).filter((review): review is Review => review !== null), // Ensure reviews is a non-nullable array
        });
      }
    },
  });

  // Mutation for adding a review
  const [addReview] = useAddReviewMutation({
    refetchQueries: [{ query: GetRestaurantDetailsDocument, variables: { id } }],
  });

  const handleAddReview = async (name: string, review: string, rating: number) => {
    try {
      await addReview({
        variables: {
          restaurant_id: parseInt(id!), 
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

  const selectedRestaurant = data?.restaurant?.[0] ?? null;

  return (
    <div className='my-5'>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.name}
          </h1>
          <div className="text text-center">
            <StarRating rating={selectedRestaurant.average_rating ?? 0}/> 
            <span className="text-warning ml-1">
              {selectedRestaurant.count ? `(${selectedRestaurant.count})` : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews id={parseInt(selectedRestaurant.id)} name={selectedRestaurant.name} location={selectedRestaurant.location} price_range={selectedRestaurant.price_range} count={selectedRestaurant.count ?? 0} average_rating={selectedRestaurant.average_rating ?? 0} reviews={(selectedRestaurant.reviews ?? []).filter((review): review is Review => review !== null)} />
          </div>
          <AddReview onAddReview={handleAddReview}/>
        </>
      )}
    </div>
  )
}

export default RestaurantDetailPage