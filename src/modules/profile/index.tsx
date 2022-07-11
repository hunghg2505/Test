import useAuth from 'hooks/redux/auth/useAuth';
import ContainerLayout from 'libraries/layouts/container.layout';
import React from 'react';

function Profile() {
  const { auth } = useAuth();

  return (
    <ContainerLayout title='Profile'>
      <h1>Hello Profile</h1>
    </ContainerLayout>
  );
}

export default Profile;
