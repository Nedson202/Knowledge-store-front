const toHTTPS = (resource) => {
  const newResource = resource && resource.replace('http://', 'https://');
  return newResource;
};

export default toHTTPS;
