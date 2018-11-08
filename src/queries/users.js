import { gql } from 'apollo-boost';

const getGenres = gql`
  {
    getGenres {
      id,
      genre
    }
  }
`;

const editGenre = gql`
  mutation($reviewId: String!, $reviewEdit: String!, $rating: Float!) {
    editReview(reviewId: $reviewId, review: $reviewEdit, rating: $rating) {
      review
    }
  }
`;

const filterUsers = gql`
  query($type: String!) {
    fetchUsers(type: $type) {
      id
      username
      email
      role
    }
  }
`;

const toggleAdmin = gql`
  mutation($email: String!, $adminAction: String!) {
    toggleAdmin(email: $email, adminAction: $adminAction) {
      message
    }
  }
`;

export {
  getGenres, editGenre, toggleAdmin, filterUsers
};