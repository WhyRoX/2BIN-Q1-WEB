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
        title: "The Dark Knight",
        director: "Christopher Nolan",
        duration: 152,
        budget: 185000000,
        description: "When the menace",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5fc28a8d8fbfcf634c11b69c/1612823532797-R575JX5GED8FR6AHXYCW/91KkWf50SoL._SL1500_.jpg?format=1000w",
    },
];

const router = Router();

router.get("/", (_req, res) => {
    return res.json(films);
});

export default router;