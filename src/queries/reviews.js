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

const addLikeOnReview = gql`
  mutation($reviewId: String!, $like: Int) {
    editReview(reviewId: $reviewId, like: $like) {
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
  addReview, editReview, addLikeOnReview, deleteReview,
};
