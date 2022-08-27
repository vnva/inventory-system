import { config } from '@/config';
import axios from 'axios';

const client = axios.create({ baseURL: config.baseURL });

client.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access-token');

  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

export default client;
