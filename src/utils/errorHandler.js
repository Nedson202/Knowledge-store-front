/* istanbul ignore file */
const errorParser = (message) => {
  try {
    if (JSON.parse(message)) return true;
  } catch (error) {
    return false;
  }
};

const errorHandler = (response) => {
  try {
    const errorResponse = JSON.stringify(response);
    const gqlErrors = JSON.parse(errorResponse);

    if (Array.isArray(gqlErrors)) {
      const { message } = gqlErrors.graphQLErrors[0];
      const formatMessage = JSON.stringify(message);
      const newMessage = JSON.parse(formatMessage);
      const errorParsedStatus = errorParser(newMessage);

      return errorParsedStatus ? Object.values(JSON.parse(newMessage)) : [newMessage];
    }

    return ['There\'s an issue with the server, please try again'];
  } catch (error) {
    console.warn(error);
  }
};

export default errorHandler;
