import Validator from 'validatorjs';

const rules = {
  username: 'required|min:3|max:30',
  email: 'required|email|min:6|max:30',
  password: 'required|min:6|max:30',
};

export const singleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (rules[key]) {
    const validation = new Validator({ [key]: value }, { [key]: rules[key] });
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const allFieldsValidation = (data, exclude) => {
  if (exclude) exclude.map(item => delete (rules[item]));
  const validation = new Validator(data, rules);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};

export const handleSingleFieldValidation = (formErrors, { name, value }) => {
  const { isValid, errors } = singleFieldValidation({ key: name, value });
  let computeFormErrors = {
    formErrors: {
      ...formErrors,
      [name]: null
    },
    isValid,
  };
  if (!isValid) {
    computeFormErrors = {
      formErrors: {
        ...formErrors,
        [name]: errors[name]
      },
      isValid,
    };
  }

  return computeFormErrors;
};
