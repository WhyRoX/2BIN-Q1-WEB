import path from 'node:path';
import { Film, NewFilm } from '../types';
import { parse, serialize } from '../utils/json';
const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms: Film[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        duration: 142,
        budget: 25000000,
        description: "Two imprisoned",
    },
    {
        id: 2,
        title: "The Godfather",
        director: "Francis Ford Coppola",
        duration: 175,
        budget: 6000000,
        description: "The aging patriarch",
        imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        title: "Not The Dark Knight",
        director: "Christopher Nolan",
        duration: 152,
        budget: 185000000,
        description: "When the menace",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5fc28a8d8fbfcf634c11b69c/1612823532797-R575JX5GED8FR6AHXYCW/91KkWf50SoL._SL1500_.jpg?format=1000w",
    },
];

function readAllFilms(minDuration: number): Film[] {
    const films = parse(jsonDbPath, defaultFilms);
    if (!minDuration) {
        return films;
    }

    const minDurationNumber = Number(minDuration);

    const filteredFilms = films.filter((film) => {
        return film.duration >= minDurationNumber;
    });
    return filteredFilms;
}

function searchFilm(title: string): Film[] {
    const films = parse(jsonDbPath, defaultFilms);
    if (!title) {
        return films;
    }

    const filteredFilms = films.filter((film) => {
        return film.title.startsWith(title);
    });
    return filteredFilms;
}

function readOneFilm(id: number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    return films.find((film) => film.id === id);
}

function createOneFilm(newFilm: NewFilm): Film {
    const films = parse(jsonDbPath, defaultFilms);

    const nextId =
        films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) +
        1;

    const createdFilm = {
        id: nextId,
        ...newFilm,
    
    };

    films.push(createdFilm);
    serialize(jsonDbPath, films);

    return createdFilm;
}

function deleteOneFilm(filmId: number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((film) => film.id === filmId);
    if (index === -1) {
        return undefined;
    }

    const deletedFilm = films.splice(index, 1)[0];
    serialize(jsonDbPath, films);

    return deletedFilm;
}

function updateOneFilm(filmId: number, newFilm: Partial<Film>): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find((film) => film.id === filmId);
    if (!film) {
        return undefined;
    }

    if (newFilm.title) {
        film.title = newFilm.title;
    }
    if (newFilm.director) {
        film.director = newFilm.director;
    }
    if (newFilm.duration) {
        film.duration = newFilm.duration;
    }
    if (newFilm.budget) {
        film.budget = newFilm.budget;
    }
    if (newFilm.description) {
        film.description = newFilm.description;
    }
    if (newFilm.imageUrl) {
        film.imageUrl = newFilm.imageUrl;
    }

    serialize(jsonDbPath, films);
    return film;
}

export {
    readAllFilms,
    searchFilm,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
};
