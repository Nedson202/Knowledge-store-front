import { gql } from 'apollo-boost';

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

const toggleLikeOnReply = gql`
  mutation($replyId: String!) {
    toggleLikeOnReply(replyId: $replyId) {
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
  addReply, editReply, deleteReply, toggleLikeOnReply
};
