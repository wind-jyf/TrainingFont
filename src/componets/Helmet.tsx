import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetTemplate = ({ title, keywords, description } : {title:string, keywords:string, description:string}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="keywords" content={keywords} />
    <meta name="description" content={description} />
  </Helmet>
);

export default HelmetTemplate;
