/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Routes from '../../../config/routes';
import { signedUserSelector } from '../../../store/auth/selectors';
import { fetchSignedUser } from '../../../store/auth/actions';

const AuthorizedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user] = useSelector(signedUserSelector);

  useEffect(() => {
    if (!user) dispatch(fetchSignedUser()).then(({ error }) => error && history.replace(Routes.LOGIN));
  }, [dispatch, user]);

  return (
    <>
      { children }
    </>
  );
};

export default AuthorizedLayout;
