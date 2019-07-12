import React, { Component, Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddBookModal from './AddBookModal';
import { getGenres } from '../../queries/genre';
import { addBook, fetchUsersBooks } from '../../queries/books';
import modalCloser from '../../utils/modalCloser';
import toaster from '../../utils/toast';

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

  imageChange = (event) => {
    const { files } = event.target;
    const file = files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ previewUrl: reader.result, imageUploadStatus: true });
    };

    reader.readAsDataURL(file);

    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'bookstore');
    data.append('upload_preset', process.env.UPLOAD_PRESET);

    return axios.post(process.env.CLOUDINARY_URL, data)
      .then((response) => {
        const { values } = this.state;
        const { secure_url: picture } = response.data;
        values.image = picture;
        this.setState({ values, imageUploadStatus: false });
      });
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    const { values, authors } = this.state;
    values[name] = value;

    if (name === 'authors') {
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

  handleBookSubmission = () => {
    const { addBookQuery } = this.props;
    const { values, genre, values: { authors } } = this.state;
    values.genre = genre[genre.length - 1] || [];
    values.authors = authors[authors.length - 1].split(',');
    addBookQuery({
      variables: {
        ...values,
      },
      refetchQueries: this.refetchQuery()
    }).then((response) => {
      const { addBook: { message } } = response.data;
      modalCloser();
      toaster('success', message);
    });
  }

  refetchQuery() {
    return [
      {
        query: fetchUsersBooks,
      }
    ];
  }

  render() {
    const { state: { previewUrl, imageUploadStatus }, handleBookSubmission } = this;
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
  graphql(addBook, { name: 'addBookQuery', })
)(AddBook);
