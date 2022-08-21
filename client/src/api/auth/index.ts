import client from '../client';

const auth = {
  signin: () => client.post('/auth/signin'),
};

export default auth;
