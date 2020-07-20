import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client'
import client from './config/graphql'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Movies from './pages/Movies'
import Home from './pages/Home'
import tvSeries from './pages/tvSeries'
import movieDetail from './pages/movieDetail';
import addMovie from './pages/addMovie';
import AddFav from './pages/addFav';

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App container mx-auto px-4">
          <Switch>
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/tv-series" component={tvSeries} />
            <Route exact path="/movies/favMovies" component={AddFav} />
            <Route exact path="/movies/addMovie" component={addMovie} />
            <Route exact path="/movies/:id" component={movieDetail} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
