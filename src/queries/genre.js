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

const bookFilter = gql`
  query($search: String, $from: ID, $size: ID) {
    searchBooks(searchQuery: $search, from: $from, size: $size) {
      id
      name
      genre
      authors
      averageRating
      googleAverageRating
      year
      image
      userId
      downloadable
    }
  }
`;

export {
  getGenres, editGenre, bookFilter
};