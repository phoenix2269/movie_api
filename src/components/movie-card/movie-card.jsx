import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * MovieCard - /movies/${encodeURIComponent(movie.id)}
 * @param - movie
 * @return - movie card data
 */
export const MovieCard = ({ movie }) => {
    return (
        <Card>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
                <Link to={`/profile`}>
                    <Button variant="link">Favorite</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        year: PropTypes.string,
        rating: PropTypes.string
    }).isRequired
};
