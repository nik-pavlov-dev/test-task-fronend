import { success, error } from '@redux-requests/core';

import { FETCH_USERS } from './types';

const initialState = {
  data: [],
  total: 0,
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, loading: true };

    case success(FETCH_USERS):
      return {
        data: action.response.data.data.map((item) => {
          if (typeof item === 'string') return item;
          const o = { ...item };
          if (item.id) o.key = item.id;
          return o;
        }),
        total: action.response.data.total,
        loading: false,
      };

    case error(FETCH_USERS):
      return { ...state, loading: false };

    default: return state;
  }
};

export default reducer;
