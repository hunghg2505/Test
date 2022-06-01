import useDocument from 'hooks/redux/document/useDocument';
import React, { Fragment, useEffect } from 'react';

interface Props {
  title?: string;
  children?: any;
}

export default function ContainerLayout({
  children,
  title = process.env.REACT_APP_NAME || 'ABD-PDPA'
}: Props) {
  const { setTitle } = useDocument();
  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
  return <Fragment>{children}</Fragment>;
}
