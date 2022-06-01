import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  size?: number;
}
export default function Loading({ size = 24 }: Props) {
  const icons = <LoadingOutlined style={{ fontSize: size }} spin />;

  return <Spin indicator={icons} />;
}
