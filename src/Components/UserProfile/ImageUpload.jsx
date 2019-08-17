import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_ImageUpload.scss';
import Spinner from '../Spinner';

class ImageUpload extends Component {
  renderDropzone() {
    const { handleImageChange } = this.props;
    return (
      <Fragment>
        <label
          className="btn btn-primary bt-raised rounded-circle"
          id="image-upload"
        >
          <div>
            <div id="dropzone">
              <i className="far fa-image text-center" aria-hidden="true" />
              <p>choose image</p>
            </div>
          </div>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            hidden
          />
        </label>
      </Fragment>
    );
  }

  renderPreview(imagePreviewUrl) {
    const { cancelPreview } = this.props;
    return (
      <div className="image-previewer">
        <img
          src={imagePreviewUrl}
          id="show-image"
          className="rounded-circle"
          alt="Avatar"
        />
        <Spinner />
        <button
          type="button"
          className="btn btn-raised"
          onClick={cancelPreview}
        >
          cancel preview
        </button>
      </div>
    );
  }

  render() {
    const { imagePreviewUrl } = this.props;
    return (
      <Fragment>
        {imagePreviewUrl && this.renderPreview(imagePreviewUrl)}
        {!imagePreviewUrl && this.renderDropzone()}
      </Fragment>
    );
  }
}

ImageUpload.propTypes = {
  handleImageChange: PropTypes.func,
  imagePreviewUrl: PropTypes.string,
  cancelPreview: PropTypes.func,
};

ImageUpload.defaultProps = {
  handleImageChange: () => { },
  imagePreviewUrl: '',
  cancelPreview: () => { },
};

export default ImageUpload;
