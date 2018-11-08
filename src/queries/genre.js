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
  query($search: String) {
    filterBooks(search: $search) {
      id,
      name,
      genre,
      author,
      year
      averageRating
    }
  }
`;
// const bookFilter = gql`
//   query($name: String, $genre: String) {
//     filterBooks(name: $name, genre: $genre) {
//       id,
//       name,
//       genre,
//       author,
//       year
//     }
//   }
// `;

export {
  getGenres, editGenre, bookFilter
};