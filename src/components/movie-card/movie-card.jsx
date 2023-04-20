// Adding a comment to make sure things are fixed
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        year: PropTypes.string,
        rating: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
