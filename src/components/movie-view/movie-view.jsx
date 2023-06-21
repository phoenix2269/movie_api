import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((b) => b.id === movieId);

    return (
        <div>
            <div>
                <img className="w-100" src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Release Year: </span>
                <span>{movie.year}</span>
            </div>
            <div>
                <span>Rating: </span>
                <span>{movie.rating}</span>
            </div>
            <Link to={"/"}>
                <Button className="back=button">Back</Button>
            </Link>
        </div>
    );
};