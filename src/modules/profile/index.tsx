import ContainerLayout from 'libraries/layouts/container.layout';
import Input from 'libraries/UI/Input';

import Select from 'libraries/UI/Select';
import React from 'react';

function Profile() {
  return (
    <ContainerLayout title="Profile">
      <h1>Hello Profile</h1>

      <Select
        options={[
          { value: '2', label: 'Option 1' },
          { value: '4', label: 'Option 2' }
        ]}
      />
    </ContainerLayout>
  );
}

export default Profile;
