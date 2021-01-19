import React, { useCallback } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import store from './store';
import Routes from './config/routes';
import AuthorizedLayout from './components/common/Layout/Authorized';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

const ROUTES = {
  PUBLIC: [
    {
      path: Routes.LOGIN,
      component: Login,
      exact: true,
    },
    {
      path: Routes.REGISTER,
      component: Register,
      exact: true,
    },
  ],
  PRIVATE: [
    {
      path: Routes.HOME,
      component: Users,
      exact: true,
    },
  ],
};

const App = () => {
  const renderRoute = useCallback((route, idx) => (
    <Route exact={route.exact} key={idx.toString()} path={route.path} component={route.component} />
  ), []);

  const renderPrivateRoute = useCallback((route, idx) => (
    <Route exact={route.exact} key={idx.toString()} path={route.path}>
      <AuthorizedLayout>
        <route.component />
      </AuthorizedLayout>
    </Route>
  ), [renderRoute]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          { ROUTES.PRIVATE.map(renderPrivateRoute) }
          { ROUTES.PUBLIC.map(renderRoute) }
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
