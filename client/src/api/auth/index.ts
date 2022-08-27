import client from '../client';

export interface SigninDTO {
  username: string;
  password: string;
}

export const auth = {
  signin: (data: SigninDTO) => client.post('/auth/signin', data),
};
