

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Release Year: </span>
                <span>{movie.year}</span>
            </div>
            {/* <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div> */}
            <div>
                <span>Rating: </span>
                <span>{movie.rating}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};