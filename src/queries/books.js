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

const fetchBook = gql`
  query($bookId: String!) {
    book(id: $bookId){
      id
      name
      genre
      author
      averageRating
      reviews{
      id,
      review,
      reviewer,
      rating,
      picture
      likes
      userId
      bookId
      createdAt
      updatedAt
      replies {
        id
        reply
        replier
        picture
        likes
        userId
        reviewId
        createdAt
        updatedAt
      }
      }
    }
  }
`;

const fetchAllBooks = gql`
  {
    books{
      id
      name
      genre
      author
      averageRating
      year
      reviews{
      id,
      review,
      reviewer,
      rating,
      picture
      likes
      createdAt
      updatedAt
      replies {
        id
        reply
        replier
        picture
        likes
        createdAt
        updatedAt
      }
      }
    }
  }
`;

export {
  getGenres, editGenre, fetchBook, fetchAllBooks
};