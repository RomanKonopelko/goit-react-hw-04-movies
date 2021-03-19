import { Component } from 'react';

import MoviesApi from './servises/moviesAPI';

MoviesApi.getMovieCredits().then(console.log);

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  render() {
    return <></>;
  }
}
export default App;
