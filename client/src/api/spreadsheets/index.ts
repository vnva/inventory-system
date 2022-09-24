import client from '../client';

export const spreadsheets = {
  get: () => client.get('/spreadsheets'),
  getById: (id: string) => client.get(`/spreadsheets/${id}`),
};
