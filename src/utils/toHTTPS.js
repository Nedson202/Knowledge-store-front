const toHTTPS = (resource) => {
  const newResource = resource && resource.replace('http://', 'https://');

  const stripEdge = newResource && newResource.replace('&edge=curl', '');
  return stripEdge;
};

export default toHTTPS;
