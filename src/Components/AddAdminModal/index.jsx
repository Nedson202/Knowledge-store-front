import React from 'react';
import PropTypes from 'prop-types';

import {
  ADD, USER_EMAIL, CLOSE, ADD_ADMIN
} from '../../settings';

const AddAddminModal = (props) => {
  const { handleInputChange, addAmin } = props;

  return (
    <div className="admin-panel">
      <div
        className="modal fade"
        id="AddAdminModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="Add admin modal"
        aria-hidden="true"
        data-testid="add-admin-modal"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {ADD_ADMIN}
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                id="close-user"
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="add-admin-form">
                <div className="form-group">
                  <label
                    htmlFor="admin-email"
                    className="bmd-label-floating"
                  >
                    {USER_EMAIL}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="admin-email"
                    onChange={handleInputChange}
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
                className="btn btn-primary btn-raised text-case add-admin"
                data-testid="add-admin-button"
                onClick={addAmin(ADD)}
                type="button"
              >
                {ADD_ADMIN}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddAddminModal.propTypes = {
  handleInputChange: PropTypes.func,
  addAmin: PropTypes.func,
};

AddAddminModal.defaultProps = {
  handleInputChange: () => { },
  addAmin: () => { },
};

export default AddAddminModal;
