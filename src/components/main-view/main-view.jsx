import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-api-cf.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
//                setMovies(movies);
                const moviesFromApi = movies.map((item) => {
                    return {
                    id: item._id,
                    title: item.Title,
                    image: item.ImagePath,
                    year: item.ReleaseYear,
                    rating: item.RottenTomatoes
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView 
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    or
                    <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <div>
                <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div>
                <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                <div>The list is empty!</div>
            </div>
        );
    }

    return (
      <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
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