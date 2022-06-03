import ContainerLayout from 'libraries/layouts/container.layout';
import Button from 'libraries/UI/Button';
import React from 'react';

function Profile() {
  return (
    <ContainerLayout title="Profile">
      <h1>Hello Profile</h1>
      <Button className={'AAA'} type="secondary">
        Button
      </Button>
    </ContainerLayout>
  );
}

export default Profile;
