import { Component } from 'react';
import { Route, Switch } from 'react-router';
import HomeView from './views/HomeView';
import MovieView from './views/MovieView';
import MovieDetailView from './views/MovieDetailView';

import MoviesApi from './servises/moviesAPI';
import { Link, NavLink } from 'react-router-dom';

const App = () => (
  <>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/movies">Movies</NavLink>
      </li>
    </ul>

    <Switch>
      <Route exact path="/" component={MovieView} />
      <Route path="/movies/:movieId" component={MovieDetailView} />
    </Switch>
  </>
);
export default App;
