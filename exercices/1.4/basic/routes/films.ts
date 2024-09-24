import { Router } from 'express';
import { Film } from '../types';

const films: Film[] = [
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
    console.log("test1");
    
    if (!req.query["minimum-duration"]) {
        return res.json(films);
    }
    const minDuration = Number(req.query["minimum-duration"]);
    const filteredFilms = films.filter((film) => {
        return film.duration >= minDuration;
    });
    return res.json(filteredFilms);
});

//Mettre avant le /:id sinon, il va prendre "search" comme un id et ne pas rentrer dans la fonction de search
router.get("/search", (req, res) => {
    console.log("test2");
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
    const id = Number(req.params.id);
    const film = films.find((film) => film.id === id);

    if (!film) {
        return res.sendStatus(404);
    }

    return res.json(film);
});



router.post("/", (req, res) => {
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
    return res.json(newFilm);
});



export default router;