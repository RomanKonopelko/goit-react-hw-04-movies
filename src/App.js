import { Component, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import routes from './routes';
import NavBar from './Components/NavBar';
import './app.css';

const MovieSearchView = lazy(() => import('./views/MovieSearchView'));
const MovieDetailView = lazy(() => import('./views/MovieDetailView'));
const MovieView = lazy(() => import('./views/MovieView'));

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Redirect exact from="/goit-react-hw-04-movies" to={routes.home} />
            <Route exact path={routes.home} component={MovieView} />
            <Route path={routes.movieDetail} component={MovieDetailView} />
            <Route path={routes.movies} component={MovieSearchView} />
          </Switch>
        </Suspense>
      </>
    );
  }
}
export default App;
