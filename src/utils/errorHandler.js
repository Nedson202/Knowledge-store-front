const errorParser = (message) => {
  try {
    if (JSON.parse(message)) return true;
  } catch (error) {
    return false;
  }
};

const errorHandler = (response) => {
  const errorResponse = JSON.stringify(response);
  const { message } = JSON.parse(errorResponse).graphQLErrors[0];

  const formatMessage = JSON.stringify(message);
  const newMessage = JSON.parse(formatMessage);
  const errorParsedStatus = errorParser(newMessage);
  return errorParsedStatus ? Object.values(JSON.parse(newMessage)) : [newMessage];
};

export default errorHandler;
