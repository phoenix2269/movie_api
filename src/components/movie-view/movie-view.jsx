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
            <div>
                <span>Rank: </span>
                <span>{movie.rank}</span>
            </div>
{/*             <div>
                <span>author: </span>
                <span>{movie.author}</span>
            </div> */}
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};