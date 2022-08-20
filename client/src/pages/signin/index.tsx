import { Box } from '@chakra-ui/react';

import SignInForm from './form';

const SignInPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      background="gray.100"
    >
      <Box pt="30vh" width={['90%', '350px']}>
        <SignInForm />
      </Box>
    </Box>
  );
};

export default SignInPage;
