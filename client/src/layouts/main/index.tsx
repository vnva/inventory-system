import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { MainLayoutHeader } from './header';

export const MainLayout: React.FC = props => {
  return (
    <div>
      <MainLayoutHeader />
      <Container maxW="container.xl">
        <Outlet />
      </Container>
    </div>
  );
};
