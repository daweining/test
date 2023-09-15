import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
// import Home from '@/pages/index';
import PageOne from '@/pages/PageOne';
import NotFound from '@/pages/NotFound';
import Child from '@/pages/Child';
import withRoute from '@/hoc/withRoute';
import store from './store';

import './App.less';

const routes = [
  {
    key: 'main',
    path: '/',
    redirect: '/page1',
  },
  {
    key: 'page1',
    path: '/page1',
    component: withRoute()(PageOne),
    children: [
      {
        key: 'id',
        path: '/page1/test/:test?',
        component: withRoute()(Child),
      },
    ],
  },
  {
    key: 'none',
    path: '*',
    component: NotFound,
  },
];

function App() {
  const renderRoute = routes => routes?.map(item => (
    <Route
      key={item.key}
      path={item.path}
      exact
      element={
        item.redirect ? (
          <Navigate test="1" to={item.redirect} />
        ) : (
          <item.component dd="2" />
        )
      }
    >
      {renderRoute(item.children)}
    </Route>
  ));
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {renderRoute(routes)}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
