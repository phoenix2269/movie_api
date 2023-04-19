import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
      fetch("https://imdb-api.com/en/API/MostPopularMovies/k_vfofrs3q")
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.items.map((item) => {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              year: item.year,
              rank: item.rank
            };
          });
          setMovies(moviesFromApi);
        });
    }, []);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>
    }

    return (
      <div>
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
}