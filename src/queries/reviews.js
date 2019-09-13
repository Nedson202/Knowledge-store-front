import { gql } from 'apollo-boost';

const addReview = gql`
  mutation($bookId: String!, $review: String!, $rating: Float!) {
    addReview(bookId: $bookId, review: $review, rating: $rating) {
      review
    }
  }
`;

const editReview = gql`
  mutation($reviewId: String!, $reviewEdit: String!, $rating: Float!) {
    editReview(reviewId: $reviewId, review: $reviewEdit, rating: $rating) {
      review
    }
  }
`;

const toggleLikeOnReview = gql`
  mutation($reviewId: String!) {
    toggleLikeOnReview(reviewId: $reviewId) {
      review
    }
  }
`;

const deleteReview = gql`
  mutation($reviewId: String!) {
    deleteReview(reviewId: $reviewId) {
      id
    }
  }
`;

export {
  addReview, editReview, toggleLikeOnReview, deleteReview,
};
