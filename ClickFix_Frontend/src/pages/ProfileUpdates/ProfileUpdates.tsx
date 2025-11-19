import React from 'react';
import { Container } from 'react-bootstrap';
import ProfileUpdateCard from '../../components/CustomCard/ProfileUpdateCard/ProfileUpdateCard';

const ProfileUpdates: React.FC = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Manage Your Profile</h2>
      <ProfileUpdateCard />
    </Container>
  );
};

export default ProfileUpdates;
