import { FETCH_SIGNED_USER, LOGIN, REGISTER } from './types';

export const login = (email, password) => ({
  type: LOGIN,
  request: {
    method: 'POST',
    url: '/login',
    data: {
      email, password,
    },
  },
});

export const signUp = (data) => ({
  type: REGISTER,
  request: {
    method: 'POST',
    url: '/register',
    data,
  },
});

export const fetchSignedUser = () => ({
  type: FETCH_SIGNED_USER,
  request: {
    method: 'GET',
    url: '/user',
  },
});
