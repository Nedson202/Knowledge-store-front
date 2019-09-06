import React, { Component, Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddBookModal from './AddBookModal';
import { getGenres } from '../../queries/genre';
import { addBook, fetchUsersBooks } from '../../queries/books';
import modalCloser from '../../utils/modalCloser';
import toaster from '../../utils/toast';
import {
  FILE, FOLDER, UPLOAD_PRESET, BOOK_STORE, AUTHORS, CLOSE_BOOK,
  SUCCESS, ADD_BOOK_QUERY
} from '../../defaults';

class AddBook extends Component {
  state = {
    previewUrl: '',
    values: {
      genre: [],
      name: '',
      description: '',
      year: '',
      image: '',
      authors: '',
      imageUploadStatus: false
    },
    genre: [],
    authors: [],
  }

  imageChange = async (event) => {
    const { files } = event.target;
    const file = files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ previewUrl: reader.result, imageUploadStatus: true });
    };

    reader.readAsDataURL(file);

    const data = new FormData();
    data.append(FILE, file);
    data.append(FOLDER, BOOK_STORE);
    data.append(UPLOAD_PRESET, process.env.UPLOAD_PRESET);

    try {
      const response = await axios.post(process.env.CLOUDINARY_URL, data);

      const { values } = this.state;
      const { secure_url: picture } = response.data;

      values.image = picture;
      this.setState({ values, imageUploadStatus: false });
    } catch (error) {
      console.error(error);
    }
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    const { values, authors } = this.state;
    values[name] = value;

    if (name === AUTHORS) {
      authors.push(value);
      values[name] = authors;
      this.setState({ authors });
    }
    this.setState({ values });
  }

  handleGenreChange = (value) => {
    const { genre } = this.state;
    genre.push(value);
    this.setState({ genre });
  }

  dateChange = (date, dateString) => {
    const { values } = this.state;
    values.year = dateString;
    this.setState({ values });
  }

  handleBookSubmission = async () => {
    const { addBookQuery } = this.props;
    const { values, genre, values: { authors } } = this.state;
    values.genre = genre[genre.length - 1] || [];
    values.authors = authors[authors.length - 1].split(',');

    try {
      const response = await addBookQuery({
        variables: {
          ...values,
        },
        refetchQueries: this.refetchQuery()
      });

      const { addBook: { message } } = response.data;
      modalCloser(CLOSE_BOOK);
      toaster(SUCCESS, message);
    } catch (error) {
      console.error(error);
    }
  }

  refetchQuery() {
    return [
      {
        query: fetchUsersBooks,
      }
    ];
  }

  render() {
    const {
      state: { previewUrl, imageUploadStatus },
      handleBookSubmission
    } = this;
    const { data, editingBook, bookToEdit } = this.props;
    return (
      <Fragment>
        <AddBookModal
          imagePreviewUrl={(bookToEdit && bookToEdit.image) || previewUrl}
          imageChange={this.imageChange}
          genres={data && data.getGenres}
          handleInputChange={this.onInputChange}
          handleGenreChange={this.handleGenreChange}
          dateChange={this.dateChange}
          imageUploadStatus={imageUploadStatus}
          handleBookSubmission={handleBookSubmission}
          editingBook={editingBook}
          bookToEdit={bookToEdit}
        />
      </Fragment>
    );
  }
}

AddBook.propTypes = {
  data: PropTypes.object,
  editingBook: PropTypes.bool,
  bookToEdit: PropTypes.object,
  addBookQuery: PropTypes.func
};

AddBook.defaultProps = {
  data: {},
  editingBook: false,
  bookToEdit: {},
  addBookQuery: () => { }
};

export default compose(
  graphql(getGenres),
  graphql(addBook, { name: ADD_BOOK_QUERY, })
)(AddBook);
