import { siteMap } from '@/consts';
import { useAppSelector } from '@/store';
import { Box } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { SigninForm } from './form';

export const SigninPage = () => {
  const userIsLoaded = useAppSelector(state => state.auth.userIsLoaded);
  if (userIsLoaded) return <Navigate to={siteMap.dashboard.path} replace />;

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Box pt="30vh" width={['90%', '350px']}>
        <SigninForm />
      </Box>
    </Box>
  );
};
