import React, { Component, Fragment } from 'react';
import './_AddBook.scss';
import { DatePicker } from 'antd';

class AddBook extends Component {
  render() {
    return (
      <Fragment>
        <div className="modal fade" id="AddBookModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Add a Book</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="add-book-form">
                  <div className="form-group">
                    <label htmlFor="book-title" className="bmd-label-floating">Book title</label>
                    <input type="text" className="form-control" id="book-title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author" className="bmd-label-floating">Author</label>
                    <input type="text" className="form-control" id="author" />
                  </div>
                  <div className="form-group is-filled">
                    <label htmlFor="year" className="bmd-label-floating">Year</label>
                    <DatePicker placeholder={false} />
                    {/* <input type="text" className="form-control" id="year" /> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="genre" className="bmd-label-floating">Genre</label>
                    <input type="text" className="form-control" id="genre" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-book" className="bmd-label-floating">Author Email</label>
                    <input type="email" className="form-control" id="email-book" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default btn-raised cancel-button" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary btn-raised text-case save-button">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddBook;
