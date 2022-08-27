import client from '../client';

export const users = {
  getMe: () => client.get('/users/me'),
};
