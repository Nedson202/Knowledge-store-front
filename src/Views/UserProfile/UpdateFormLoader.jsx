import React from 'react';
import ContentLoader from 'react-content-loader';

const UpdateForm = () => (
  <ContentLoader rtl height={160} width={400} speed={2} primaryColor="#f3f3f3">
    <rect x="50" y="10" rx="4" ry="4" width="145" height="6.4" />
    <rect x="50" y="50" rx="3" ry="3" width="270" height="6.4" />
    <rect x="50" y="70" rx="3" ry="3" width="290" height="6.4" />
    <rect x="50" y="90" rx="3" ry="3" width="171" height="6.4" />
    <circle cx="17" cy="17" r="17" />
  </ContentLoader>
);

export default UpdateForm;
