import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddAddminModal extends Component {
  render() {
    const { handleInputChange, addAmin } = this.props;
    return (
      <div className="admin-panel">
        <div className="modal fade" id="AddAdminModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Add Admin</h5>
                <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="add-admin-form">
                  <div className="form-group">
                    <label htmlFor="admin-email" className="bmd-label-floating">User Email</label>
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
                <button type="button" className="btn btn-default btn-raised cancel-button" data-dismiss="modal">Close</button>
                <button
                  type="button"
                  className="btn btn-primary btn-raised text-case add-admin"
                  onClick={addAmin('add')}
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddAddminModal.propTypes = {
  handleInputChange: PropTypes.func,
  addAmin: PropTypes.func,
};

AddAddminModal.defaultProps = {
  handleInputChange: () => { },
  addAmin: () => { },
};

export default AddAddminModal;
