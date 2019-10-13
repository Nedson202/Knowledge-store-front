import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { DatePicker, Select } from 'antd';

import Spinner from '../Spinner';
import { toHTTPS } from '../../utils';
import {
  ADD_BOOK_COVER, CANCEL_PREVIEW, BOOK_TITLE, YEAR_PUBLISHED,
  DOWNLOAD_URL, DESCRIPTION, CLOSE, SAVE_CHANGES, GENRE, ADD_BOOK,
  EDIT_BOOK, AUTHORS_LABEL
} from '../../settings';

const { Option } = Select;

class AddBookModal extends Component {
  renderChildren(genres) {
    if (genres) {
      return genres.map(genre => (
        <Option key={genre.genre}>
          {genre.genre}
        </Option>
      ));
    }
  }

  renderDropzone() {
    const { imageChange } = this.props;
    return (
      <Fragment>
        <label
          className="btn btn-primary"
          id="image-upload"
        >
          <div>
            <div id="dropzone">
              <ion-icon name="image" class="text-center" />
              <p>{ADD_BOOK_COVER}</p>
            </div>
          </div>
          <input
            type="file"
            name="image"
            onChange={imageChange}
            hidden
          />
        </label>
      </Fragment>
    );
  }

  renderPreview(imagePreviewUrl) {
    const { imageUploadStatus } = this.props;
    return (
      <div className="image-previewer">
        <img
          alt="Avatar"
          height="220px"
          id="image-upload"
          src={toHTTPS(imagePreviewUrl)}
          width="180px"
        />
        <span style={{ marginTop: '15px' }}>
          {imageUploadStatus && <Spinner />}
        </span>
        <button
          className="btn btn-raised"
          type="button"
        >
          {CANCEL_PREVIEW}
        </button>
      </div>
    );
  }

  render() {
    const {
      imagePreviewUrl, genres, handleInputChange, handleGenreChange,
      dateChange, handleBookSubmission, editingBook, bookToEdit,
    } = this.props;
    const {
      name, authors, year, description
    } = bookToEdit;

    return (
      <Fragment>
        <div
          aria-hidden="true"
          aria-labelledby="exampleModalCenterTitle"
          className="modal fade add-book-modal"
          data-keyboard="false"
          id="AddBookModal"
          role="dialog"
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                >
                  {editingBook ? EDIT_BOOK : ADD_BOOK}
                </h5>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true" id="close-book">&times;</span>
                </button>
              </div>
              <div className="modal-body add-book-form">
                <div>
                  {!imagePreviewUrl.length && this.renderDropzone()}
                  {imagePreviewUrl.length !== 0 && this.renderPreview(imagePreviewUrl)}
                </div>
                <form className="form-fields">
                  <div className="form-group">
                    <label htmlFor="book-title">{BOOK_TITLE}</label>
                    <input
                      className="form-control"
                      defaultValue={editingBook ? name : ''}
                      id="book-title"
                      name="name"
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">{AUTHORS_LABEL}</label>
                    <input
                      className="form-control"
                      defaultValue={editingBook ? authors : ''}
                      id="author"
                      name="authors"
                      onChange={handleInputChange}
                      placeholder="e.g paul max, smith mill..."
                      type="text"
                    />
                  </div>
                  <div className="form-group is-filled">
                    <label htmlFor="year" name="year">{YEAR_PUBLISHED}</label>
                    <DatePicker
                      placeholder=""
                      onChange={dateChange}
                      defaultdefaultValue={editingBook
                        && year ? format(new Date(year), 'yyyy/MM/dd') : null}
                      format="YYYY/MM/DD"
                    />
                  </div>
                  <div className="form-group is-filled">
                    <label htmlFor="genre">{GENRE}</label>
                    <Select
                      mode="tags"
                      onChange={handleGenreChange}
                      style={{ width: '100%' }}
                    >
                      {this.renderChildren(genres)}
                    </Select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="download">{DOWNLOAD_URL}</label>
                    <input
                      className="form-control"
                      id="download"
                      name="downloadUrl"
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">{DESCRIPTION}</label>
                    <textarea
                      className="form-control"
                      defaultValue={editingBook ? description : ''}
                      id="description"
                      name="description"
                      onChange={handleInputChange}
                      rows="3"
                      type="email"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-default btn-raised cancel-button"
                  data-dismiss="modal"
                  type="button"
                >
                  {CLOSE}
                </button>
                <button
                  className="btn btn-primary btn-raised text-case save-button"
                  onClick={handleBookSubmission}
                  type="button"
                >
                  {SAVE_CHANGES}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

AddBookModal.propTypes = {
  imagePreviewUrl: PropTypes.string,
  imageUploadStatus: PropTypes.bool,
  imageChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleGenreChange: PropTypes.func,
  dateChange: PropTypes.func,
  handleBookSubmission: PropTypes.func,
  genres: PropTypes.array,
  editingBook: PropTypes.bool,
  bookToEdit: PropTypes.object,
};

AddBookModal.defaultProps = {
  imagePreviewUrl: '',
  imageUploadStatus: false,
  imageChange: () => { },
  handleInputChange: () => { },
  handleGenreChange: () => { },
  handleBookSubmission: () => { },
  dateChange: () => { },
  genres: [],
  editingBook: false,
  bookToEdit: {},
};

export default AddBookModal;
