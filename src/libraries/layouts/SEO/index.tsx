/* eslint-disable @typescript-eslint/ban-ts-comment */
import useDocument from 'hooks/redux/document/useDocument';
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  const { document } = useDocument();

  return (
    // @ts-ignore
    <Helmet>
      <title>{document.title}</title>
    </Helmet>
  );
};

export default SEO;
