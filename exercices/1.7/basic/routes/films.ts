import { Router } from 'express';
import { Film } from '../types';
import path from 'node:path';
import { parse, serialize } from '../utils/json';

const jsonDbPath = path.join(__dirname, "/../data/films.json");
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

const router = Router();


router.get("/", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    if (!req.query["minimum-duration"]) {
        return res.json(films);
    }
    const minDuration = Number(req.query["minimum-duration"]);
    if (isNaN(minDuration) || minDuration < 0) {
        return res.sendStatus(400);
    }
    const filteredFilms = films.filter((film) => {
        return film.duration >= minDuration;
    });
    return res.json(filteredFilms);
});

//Mettre avant le /:id sinon, il va prendre "search" comme un id et ne pas rentrer dans la fonction de search
router.get("/search", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    if (!req.query["title"] || typeof req.query["title"] !== "string") {
        return res.sendStatus(400);
    }
    const title: string = req.query["title"];
    const filteredFilms = films.filter((film) => {
        return film.title.startsWith(title);
    });
    const page = Number(req.query["page"]) || 1;
    const limit = Number(req.query["limit"]) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedFilms = filteredFilms.slice(startIndex, endIndex);

    return res.json(paginatedFilms);
});



//Garder le /:id après le /search sinon, il va prendre "search" comme un id et ne pas rentrer dans la fonction de search
router.get("/:id", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    const id = Number(req.params.id);
    if (isNaN(id) || id < 0) {
        return res.sendStatus(400);
    }
    const film = films.find((film) => film.id === id);

    if (!film) {
        return res.sendStatus(404);
    }

    return res.json(film);
});

router.post("/", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.sendStatus(400);
    }

    const { title, director, duration, budget, description, imageUrl } = body as Film;

    if (films.some((film) => film.title === title && film.director === director)) {
        return res.sendStatus(409).json({ message: "Film already exists" });
    }

    const nextId =
        films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) +
        1;

    const newFilm: Film = {
        id: nextId,
        title,
        director,
        duration,
        budget,
        description,
        imageUrl,
    };

    films.push(newFilm);
    serialize(jsonDbPath, films);
    return res.json(newFilm);
});

//films/{id}	DELETE	DELETE ONE : Effacer la ressource identifiée
router.delete("/:id", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    const id = Number(req.params.id);
    const index = films.findIndex((film) => film.id === id);
    if (index === -1) {
        return res.sendStatus(404);
    }
    const deletedElements = films.splice(index, 1); // splice() returns an array of the deleted elements
    serialize(jsonDbPath, films);
    return res.json(deletedElements[0]);
});

//films/{id}	PATCH	UPDATE ONE : Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés
router.patch("/:id", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    const id = Number(req.params.id);
    const index = films.findIndex((film) => film.id === id);
    if (index === -1) {
        return res.sendStatus(404);
    }
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.sendStatus(400);
    }
    const film = films[index];
    const { title, director, duration, budget, description, imageUrl } = body as Film;
    Object.assign(film, { title, director, duration, budget, description, imageUrl });
    serialize(jsonDbPath, films);
    return res.json(film);
});

//films/{id}	PUT	UPDATE ONE or CREATE ONE : Remplacer la ressource par une ressource reprenant les valeurs données dans la requête, seulement si toutes les propriétés non optionnelles de la ressource sont données ! Si la ressource n'existe pas, créer cette ressource seulement si l'id donné n'est pas déjà existant.
router.put("/:id", (req, res) => {
    const films = parse(jsonDbPath, defaultFilms);
    const id = Number(req.params.id);
    const index = films.findIndex((film) => film.id === id);
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.sendStatus(400);
    }
    const { title, director, duration, budget, description, imageUrl } = body as Film;
    if (index === -1) {
        if (films.some((film) => film.title === title && film.director === director)) {
            return res.sendStatus(409).json({ message: "Film already exists" });
        }
        const nextId =
            films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) +
            1;
        const newFilm: Film = {
            id: nextId,
            title,
            director,
            duration,
            budget,
            description,
            imageUrl,
        };
        films.push(newFilm);
        serialize(jsonDbPath, films);
        return res.json(newFilm);
    }
    const film = films[index];
    film.title = title;
    film.director = director;
    film.duration = duration;
    film.budget = budget;
    film.description = description;
    film.imageUrl = imageUrl;
    serialize(jsonDbPath, films);
    return res.json(film);
});

export default router;