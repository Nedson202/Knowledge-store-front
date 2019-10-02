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
          type="file"
          name="image"
          onChange={handleImageChange}
          hidden
        />
      </label>
    </Fragment>
  );

  const renderPreview = () => (
    <div className="image-previewer">
      <img
        src={imagePreviewUrl}
        id="show-image"
        className="rounded-circle"
        alt="Avatar"
      />
      {uploadingImage && <Spinner />}
      <button
        type="button"
        className="btn btn-raised"
        onClick={cancelPreview}
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
