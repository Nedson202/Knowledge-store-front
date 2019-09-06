import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import './_UserProfile.scss';
import UpdateForm from './UpdateForm';
import { singleFieldValidation } from '../../utils/validator/validator';
import UpdatePassword from './UpdatePassword';
import UserDetails from './UserDetails';
import { editProfile, changePassword } from '../../queries/auth';
import toaster from '../../utils/toast';
import { setCurrentUser } from '../../redux/actions/userActions';
import tokenDecoder from '../../utils/tokenDecoder';
import errorHandler from '../../utils/errorHandler';
import {
  FILE, FOLDER, BOOK_STORE, UPLOAD_PRESET, SUCCESS, TOKEN,
  CHANGE_PASSWORD_QUERY, EDIT_PROFILE_QUERY, TOASTR_ERROR
} from '../../defaults';

class UserProfile extends Component {
  debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { formErrors } = this.state;
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (!isValid) {
      this.setState({ formErrors: { ...formErrors, [name]: errors[name] } });
    } else {
      this.setState({ formErrors: { ...formErrors, [name]: null } });
    }
  }, 1000);

  constructor(props) {
    super(props);

    const { user: { username, email } } = this.props;
    this.state = {
      values: {
        username: username || '',
        email: email || '',
        oldPassword: '',
        newPassword: '',
        picture: ''
      },
      imagePreviewUrl: '',
      formErrors: {},
      uploadingImage: false,
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    const { values } = this.state;
    values[name] = value.trim();
    this.setState({ values });
    this.debounceSingleFieldValidation({ name, value });
  }

  onImageChange = async (event) => {
    const { files } = event.target;
    const file = files[0];

    if (file && /\.(jpe?g|png)$/i.test(file.name) === false) {
      return toaster('error', 'Only a jpeg, jpg or png image is supported');
    }

    if (file && file.size > 4000000) {
      return toaster('error', 'Image size cannot be more than 4mb');
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result,
          uploadingImage: true,
        });
      };

      reader.readAsDataURL(file);

      const data = new FormData();
      data.append(FILE, file);
      data.append(FOLDER, BOOK_STORE);
      data.append(UPLOAD_PRESET, process.env.REACT_APP_UPLOAD_PRESET);

      try {
        const uploadHandler = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);

        const { values } = this.state;
        const { secure_url: picture } = uploadHandler.data;

        values.picture = picture;
        this.setState({ values, uploadingImage: false, });

        await this.updateProfile('upload');
      } catch (error) {
        console.error(error);
      }
    }
  }

  cancelPreview = () => {
    this.setState({
      imagePreviewUrl: ''
    });
  }

  updateProfile = async (type) => {
    const { editProfileQuery, dispatch, user } = this.props;
    const { values } = this.state;
    const newUser = {
      username: values.username,
      email: values.email,
    };

    const oldUser = {
      username: user.username,
      email: user.email,
    };

    if (JSON.stringify(newUser) === JSON.stringify(oldUser) && type !== 'upload') {
      return;
    }

    try {
      const editProfileHandler = await editProfileQuery({
        variables: {
          ...values
        }
      });

      const { editProfile: { token, message }, } = editProfileHandler.data;

      localStorage.setItem(TOKEN, token);
      toaster(SUCCESS, message);

      this.setState({
        imagePreviewUrl: '',
      });
      return dispatch(setCurrentUser(tokenDecoder(token)));
    } catch (error) {
      console.error(error);
    }
  }

  updatePassword = async () => {
    const { values, values: { oldPassword, newPassword } } = this.state;
    const { changePasswordQuery } = this.props;

    if (!oldPassword || !newPassword) {
      return toaster.error('Fill the password fields to continue');
    }

    try {
      const changePasswordHandler = await changePasswordQuery({
        variables: {
          ...values
        }
      });

      const { changePassword: { message } } = changePasswordHandler.data;

      toaster(SUCCESS, message);
      values.newPassword = '';
      values.oldPassword = '';

      this.setState({ values });
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  render() {
    const {
      values, formErrors, imagePreviewUrl,
      uploadingImage,
    } = this.state;
    const { user } = this.props;
    return (
      <div className="profile-update" id="main">
        <UserDetails
          user={user}
        />
        <UpdateForm
          user={user}
          imagePreviewUrl={imagePreviewUrl}
          formValues={values}
          handleInputChange={this.onInputChange}
          handleImageChange={this.onImageChange}
          updateProfile={this.updateProfile}
          formErrors={formErrors}
          cancelPreview={this.cancelPreview}
          uploadingImage={uploadingImage}
        />
        <UpdatePassword
          handleInputChange={this.onInputChange}
          updatePassword={this.updatePassword}
          formErrors={formErrors}
          formValues={values}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

UserProfile.propTypes = {
  editProfileQuery: PropTypes.func,
  changePasswordQuery: PropTypes.func,
  dispatch: PropTypes.func,
  user: PropTypes.object,
};

UserProfile.defaultProps = {
  editProfileQuery: () => { },
  changePasswordQuery: () => { },
  dispatch: () => { },
  user: {},
};

export default compose(
  graphql(editProfile, { name: EDIT_PROFILE_QUERY }),
  graphql(changePassword, { name: CHANGE_PASSWORD_QUERY }),
  connect(mapStateToProps)
)(UserProfile);
