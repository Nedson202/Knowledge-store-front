import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './_AddBookModal.scss';
import { DatePicker, Select } from 'antd';
import Spinner from '../Spinner/Spinner';

const { Option } = Select;

class AddBookModal extends Component {
  renderChildren(genres) {
    if (genres) {
      return genres.map(genre => <Option key={genre.genre}>{genre.genre}</Option>);
    }
  }

  renderDropzone() {
    const { imageChange } = this.props;
    return (
      <Fragment>
        <label
          className="btn btn-primary bt-raised"
          id="image-upload"
        >
          <div>
            <div id="dropzone">
              <i className="far fa-image text-center" aria-hidden="true" />
              <p>add book cover</p>
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
          src={imagePreviewUrl}
          id="image-upload"
          height="220px"
          width="180px"
          alt="Avatar"
        />
        <span style={{ marginTop: '15px' }}>{imageUploadStatus && <Spinner />}</span>
        <button
          type="button"
          className="btn btn-raised"
          // onClick={cancelPreview}
        >
          cancel preview
        </button>
      </div>
    );
  }

  render() {
    const {
      imagePreviewUrl, genres, handleInputChange, handleGenreChange,
      dateChange, handleBookSubmission, editingBook,
      bookToEdit: {
        name, authors, year
      }
    } = this.props;

    // const defaultValue = editingBook ? moment('2015-11-24', 'YYYY-MM-DD') : '';
    return (
      <Fragment>
        <div
          className="modal fade"
          id="AddBookModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-keyboard="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{editingBook ? 'Edit book' : 'Add a Book'}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" id="close">&times;</span>
                </button>
              </div>
              <div className="modal-body add-book-form">
                <div>
                  {!imagePreviewUrl.length && this.renderDropzone()}
                  {imagePreviewUrl.length !== 0 && this.renderPreview(imagePreviewUrl)}
                </div>
                <form className="form-fields">
                  <div className="form-group">
                    <label htmlFor="book-title">Book title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="book-title"
                      name="name"
                      onChange={handleInputChange}
                      value={editingBook && name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Author(s)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="author"
                      name="authors"
                      placeholder="e.g paul max, smith mill..."
                      onChange={handleInputChange}
                      value={editingBook && authors}
                    />
                  </div>
                  <div className="form-group is-filled">
                    <label htmlFor="year" name="year">Published Year</label>
                    <DatePicker
                      placeholder=""
                      onChange={dateChange}
                      defaultValue={editingBook && year ? moment(year, 'YYYY-MM-DD') : null}
                      // defaultValue={moment('2015-12-24'.replace(/[-]/g, '/'), 'YYYY-MM-DD')}
                      // moment('2015-12-24'.replace(/[-]/g, '/'), 'YYYY/MM/DD')
                      format="YYYY-MM-DD"
                      // value={editingBook && year}
                    />
                    {/* <input type="text" className="form-control" id="year" /> */}
                  </div>
                  <div className="form-group is-filled">
                    <label htmlFor="genre">Genre</label>
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      onChange={handleGenreChange}
                      // value={editingBook && genre}
                    >
                      {this.renderChildren(genres)}
                    </Select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="download">Download Url</label>
                    <input
                      type="text"
                      className="form-control"
                      id="download"
                      name="downloadUrl"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      rows="3"
                      type="email"
                      className="form-control"
                      id="description"
                      name="description"
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default btn-raised cancel-button"
                  data-dismiss="modal"
                >
                Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-raised text-case save-button"
                  onClick={handleBookSubmission}
                >
                Save changes
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
  imageChange: () => {},
  handleInputChange: () => {},
  handleGenreChange: () => {},
  handleBookSubmission: () => {},
  dateChange: () => {},
  genres: [],
  editingBook: false,
  bookToEdit: {},
};

export default AddBookModal;
