import React, { Component, Fragment } from 'react';
import './_ImageUpload.scss';

class ImageUpload extends Component {
  render() {
    const uploading = false;
    return (
      <Fragment>
        <label
          className="btn btn-primary bt-raised rounded-circle"
          id="image-upload"
        >
          { uploading
            ? (
              <div
                className="progress form-progress-bar"
                id="progress"
              >
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: '100%' }}
                />
              </div>
            ) : null }
          <div>
            <img
              src=""
              className="hide"
              id="show-image"
              height="200px"
              alt="Avatar"
            />
            <div id="dropzone">
              <i className="far fa-image text-center" aria-hidden="true" />
              <p>choose image</p>
            </div>
          </div>
          <input
            type="file"
            name="image"
            // onChange={onImageChange}
            hidden
          />
        </label>
      </Fragment>
    );
  }
}

export default ImageUpload;
