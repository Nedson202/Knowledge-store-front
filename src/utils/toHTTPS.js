const stripEdge = resource => resource.replace('&edge=curl', '');

const toHTTPS = (resource) => {
  const newResource = resource && resource.replace('http://', 'https://');
  return stripEdge(newResource);
};

export default toHTTPS;
