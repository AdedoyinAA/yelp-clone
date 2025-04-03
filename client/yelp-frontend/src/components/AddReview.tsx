import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';

const AddReview = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");


    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating,
            });
            window.location.reload();
        } catch (error) {
            console.log(error);   
        }
    }
    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row d-flex">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 mx-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} className="form-select" id="rating">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="review">Review</label>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id="review" className="form-control"></textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview