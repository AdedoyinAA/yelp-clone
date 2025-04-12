import React, { useState } from 'react'

const AddReview: React.FC<{ onAddReview: (name: string, review: string, rating: number) => void }> = ({ onAddReview, }) => {
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddReview(name, reviewText, rating);
        setName("");
        setReviewText("");
        setRating(1);
    };

    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row d-flex">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 mx-2">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(parseInt(e.target.value))} className="form-select" id="rating">
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
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview