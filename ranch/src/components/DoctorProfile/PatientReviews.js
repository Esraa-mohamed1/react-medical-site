import React, { useState } from 'react';
import { Card, Button, Pagination, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUserCircle, FaStar, FaComment } from 'react-icons/fa';

const PatientReviews = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [activePage, setActivePage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ patientName: '', comment: '', rating: 0 });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const paginatedReviews = reviews.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = () => {
    if (!newReview.patientName || !newReview.comment || newReview.rating === 0) return;

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    setReviews([
      { ...newReview, date: formattedDate, response: null },
      ...reviews
    ]);
    setNewReview({ patientName: '', comment: '', rating: 0 });
    setShowForm(false);
    setActivePage(1); // Go to first page to see the new review
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      dir="rtl"
    >
      <Card className="border-0 shadow-sm mb-4 text-end">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-row-reverse">
            <h4 className="section-title mb-0">Patient Reviews</h4>
            <Button variant="outline-primary" size="sm" onClick={() => setShowForm(!showForm)}>
              <FaComment className="ms-2" />
              {showForm ? 'Cancel' : 'Add Review'}
            </Button>
          </div>

          {showForm && (
            <div className="mb-4 p-3 border rounded bg-light">
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newReview.patientName} 
                  onChange={e => setNewReview({ ...newReview, patientName: e.target.value })} 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Review</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={newReview.comment} 
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })} 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <div className="d-flex justify-content-end">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="ms-1"
                      size={20}
                      style={{ cursor: 'pointer' }}
                      color={i < newReview.rating ? '#ffc107' : '#e4e5e9'}
                      onClick={() => handleStarClick(i + 1)}
                    />
                  ))}
                </div>
              </Form.Group>

              <Button onClick={handleSubmit} variant="primary">
                Publish Review
              </Button>
            </div>
          )}

          {paginatedReviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card p-3 mb-3"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="d-flex align-items-center mb-2 flex-row-reverse">
                <div className="ms-3">
                  <FaUserCircle size={32} style={{ color: 'var(--primary-purple)' }} />
                </div>
                <div>
                  <h6 className="mb-0">{review.patientName}</h6>
                  <div className="d-flex align-items-center flex-row-reverse">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < review.rating ? "text-warning ms-1" : "text-muted ms-1"} 
                        size={14}
                      />
                    ))}
                    <small className="text-muted me-2">{review.date}</small>
                  </div>
                </div>
              </div>
              <p className="mb-2 text-end">{review.comment}</p>
              {review.response && (
                <div className="bg-light p-2 rounded mt-2 text-end">
                  <small className="text-muted d-block mb-1">Clinic Response:</small>
                  <p className="mb-0 small">{review.response}</p>
                </div>
              )}
            </motion.div>
          ))}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination dir="ltr">
                <Pagination.Prev 
                  onClick={() => setActivePage(p => Math.max(p - 1, 1))} 
                  disabled={activePage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === activePage}
                    onClick={() => setActivePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  onClick={() => setActivePage(p => Math.min(p + 1, totalPages))} 
                  disabled={activePage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default PatientReviews;
