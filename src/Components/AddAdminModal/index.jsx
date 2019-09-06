import React from 'react';
import PropTypes from 'prop-types';
import {
  ADD, USER_EMAIL, CLOSE, ADD_ADMIN
} from '../../defaults';

const AddAddminModal = (props) => {
  const { handleInputChange, addAmin } = props;

  return (
    <div className="admin-panel">
      <div
        className="modal fade"
        id="AddAdminModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {ADD_ADMIN}
              </h5>
              <button
                type="button"
                id="close-user"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
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
                type="button"
                className="btn btn-default btn-raised cancel-button"
                data-dismiss="modal"
              >
                {CLOSE}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-raised text-case add-admin"
                onClick={addAmin(ADD)}
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
