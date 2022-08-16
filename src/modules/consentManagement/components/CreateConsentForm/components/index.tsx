import { useDebounceFn } from 'ahooks';
import Select from 'libraries/UI/Select';
import { useState } from 'react';

export const NormalSelectDropdown = ({ placeholder, data, allowClear, value, onChange }: any) => {
  const [visible, setVisible] = useState(false);

  const { run } = useDebounceFn(
    () => {
      setVisible(!visible);
    },
    {
      wait: 300,
    },
  );

  return (
    <Select
      value={value}
      placeholder={placeholder}
      showSearch
      onSelect={onChange}
      open={visible}
      onMouseDown={run}
    >
      {data?.map((item: any) => (
        <Select.Option value={Number(item?.id)} key={item?.id} allowClear={allowClear}>
          {item?.name}
        </Select.Option>
      ))}
    </Select>
  );
};
