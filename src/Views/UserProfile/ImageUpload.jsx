import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../Components/Spinner';

const ImageUpload = (props) => {
  const {
    imagePreviewUrl, handleImageChange, cancelPreview,
    uploadingImage
  } = props;

  const renderDropzone = () => (
    <Fragment>
      <label
        className="btn btn-primary bt-raised rounded-circle"
        id="image-upload"
      >
        <div>
          <div id="dropzone">
            <ion-icon name="image" class="text-center" />
            <p>Select image</p>
          </div>
        </div>
        <input
          hidden
          name="image"
          onChange={handleImageChange}
          type="file"
        />
      </label>
    </Fragment>
  );

  const renderPreview = () => (
    <div className="image-previewer">
      <img
        alt="Avatar"
        className="rounded-circle"
        id="show-image"
        src={imagePreviewUrl}
      />
      {uploadingImage && <Spinner />}
      <button
        className="btn btn-raised"
        onClick={cancelPreview}
        type="button"
      >
        cancel preview
      </button>
    </div>
  );

  return (
    <Fragment>
      {imagePreviewUrl && renderPreview()}
      {!imagePreviewUrl && renderDropzone()}
    </Fragment>
  );
};

ImageUpload.propTypes = {
  handleImageChange: PropTypes.func,
  imagePreviewUrl: PropTypes.string,
  cancelPreview: PropTypes.func,
  uploadingImage: PropTypes.bool,
};

ImageUpload.defaultProps = {
  handleImageChange: () => { },
  imagePreviewUrl: '',
  cancelPreview: () => { },
  uploadingImage: false,
};

export default ImageUpload;
