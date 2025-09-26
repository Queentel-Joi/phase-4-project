import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function BookDetail({ user }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/books/${id}`)
      .then(r => r.json())
      .then(setBook);
    fetch('/reviews')
      .then(r => r.json())
      .then(data => setReviews(data.filter(r => r.book_id === parseInt(id))));
  }, [id]);

  const handleReviewSubmit = (values) => {
    fetch('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, user_id: user.id, book_id: parseInt(id) }),
    })
      .then(r => r.json())
      .then(review => setReviews([...reviews, review]));
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <div className="card">
        <h2>{book.title}</h2>
        <p>by {book.author}</p>
        <p>{book.description}</p>
      </div>
      <h3>Reviews</h3>
      {reviews.map(review => (
        <div key={review.id} className="review">
          <p><strong>Rating:</strong> {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
      {user && (
        <div className="card">
          <h3>Add Review</h3>
          <Formik
            initialValues={{ rating: 5, comment: '' }}
            validationSchema={Yup.object({
              rating: Yup.number().min(1).max(5).required(),
              comment: Yup.string(),
            })}
            onSubmit={handleReviewSubmit}
          >
            <Form>
              <div className="form-group">
                <label>Rating</label>
                <Field name="rating" as="select">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Field>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <Field name="comment" as="textarea" />
              </div>
              <button type="submit" className="btn">Submit Review</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default BookDetail;