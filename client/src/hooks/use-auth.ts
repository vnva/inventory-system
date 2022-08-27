import { siteMap } from '@/consts';
import { cleanAuth, useAppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';

export interface IToknes {
  accessToken: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signin = (tokens: IToknes) => {
    localStorage.setItem('access-token', tokens.accessToken);
  };

  const signout = () => {
    localStorage.removeItem('access-token');
    dispatch(cleanAuth());
    navigate(siteMap.signin.path);
  };

  return { signin, signout };
};
