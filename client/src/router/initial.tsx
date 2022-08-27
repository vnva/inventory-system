import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { setUser, useAppDispatch, useAppSelector } from '@/store';
import { Flex, Spinner } from '@chakra-ui/react';

export const InitialRoute = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { user, userIsLoaded } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!userIsLoaded) {
      dispatch(setUser()).finally(() => setIsLoading(false));
    }
  }, [dispatch, userIsLoaded, user]);

  return isLoading ? (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  ) : (
    <Outlet />
  );
};
