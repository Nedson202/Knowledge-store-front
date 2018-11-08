import { gql } from 'apollo-boost';

const addUser = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

const verifyEmail = gql`
  mutation($id: String!) {
    verifyEmail(id: $id) {
      token,
      message
    }
  }
`;

const sendVerificationEmail = gql`
  query($email: String!) {
    sendVerificationEmail(email: $email) {
      message
    }
  }
`;

const forgotPassword = gql`
  query($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

const loginUser = gql`
mutation($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    username,
    email,
    token
  }
}
`;

const getBooks = gql`
  {
    books {
      name,
      author,
      genre,
      year
    }
  }
`;

export {
  addUser, loginUser, getBooks, verifyEmail, sendVerificationEmail, forgotPassword
};