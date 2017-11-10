import React from 'react';
import { Router, Route, Switch , HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppContainer from '../container/AppContainer';
import NoMatch from '../components/NoMatch';

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <Router history={props.history}>
        <Switch>
          <Route exact path="" component={AppContainer}/>
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Root;

