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

const addReply = gql`
  mutation($reviewId: String!, $reply: String!) {
    addReply(reviewId: $reviewId, reply: $reply) {
      reply
    }
  }
`;

const editReply = gql`
  mutation($replyId: String!, $replyEdit: String!) {
    editReply(replyId: $replyId, reply: $replyEdit) {
      reply
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

const deleteReply = gql`
  mutation($replyId: String!) {
    deleteReply(replyId: $replyId) {
      id
    }
  }
`;

export {
  addReview, editReview, addReply,
  editReply, addLikeOnReview, deleteReview,
  deleteReply
};