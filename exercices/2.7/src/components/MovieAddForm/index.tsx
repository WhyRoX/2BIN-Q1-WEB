import './MovieAddForm.css';
import { SyntheticEvent, useState } from 'react';
import { Movie } from '../types';

export interface MovieAddFormProps {
  onMovieAdd: (movie: Movie) => void;
}

export const MovieAddForm = ({ onMovieAdd }: MovieAddFormProps) => { 
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const newMovie = {
            title: title,
            director: director,
            description: description
        }
        onMovieAdd(newMovie);

        setTitle("");
        setDirector("");
        setDescription("");
    };

    return (
        <form className='movie-add-form' onSubmit={handleSubmit}>
            <h2>Ajouter un film</h2>
            <label>Titre: </label>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label>Réalisateur: </label>
            <input
                type='text'
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
            />
            <label>Description: </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type='submit'>Ajouter</button>
        </form>
    )
};
