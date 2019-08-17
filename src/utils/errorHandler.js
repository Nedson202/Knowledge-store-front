const errorParser = (message) => {
  try {
    if (JSON.parse(message)) return true;
  } catch (error) {
    return false;
  }
};

const errorHandler = (response) => {
  const errorResponse = JSON.stringify(response);
  const gqlErrors = JSON.parse(errorResponse).graphQLErrors[0];

  if (gqlErrors) {
    const { message } = gqlErrors;
    const formatMessage = JSON.stringify(message);
    const newMessage = JSON.parse(formatMessage);
    const errorParsedStatus = errorParser(newMessage);
    return errorParsedStatus ? Object.values(JSON.parse(newMessage)) : [newMessage];
  }
  return ['There\'s an issue with the server, please try again'];
};

export default errorHandler;
