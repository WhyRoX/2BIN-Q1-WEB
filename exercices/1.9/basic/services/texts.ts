/*
URI	Méthode	Méthode
texts	GET	READ ALL : Lire toutes les ressources de la collection
texts?level=value	GET	READ ALL FILTERED : Lire toutes les ressources de la collection selon le filtre donné
texts/:id	GET	READ ONE : Lire la ressource identifiée
texts	POST	CREATE ONE : Créer une ressource basée sur les données de la requête
texts/:id	DELETE	DELETE ONE : Effacer la ressource identifiée
texts/:id	PUT	UPDATE ONE : Remplacer l'entièreté de la ressource par les données de la requête
*/

import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Text, NewText } from '../types';
import { parse, serialize } from '../utils/json';
const jsonDbPath = path.join(__dirname, '/../data/texts.json');

const defaultTexts: Text[] = [
    {
        id: "5a346858-4dc4-40cc-bf7d-b68e4fb98f59",
        content: "The Shawshank Redemption",
        level: "easy",
    },
    {
        id: "fe52c746-c754-4177-9ac0-2fbc807de9de",
        content: "The Godfather",
        level: "medium",
    },
    {
        id: "45f40bfa-7812-4836-be72-f858f4a23825",
        content: "The Dark Knight",
        level: "hard",
    },
];


function searchText(level: string): Text[] {
    const texts = parse(jsonDbPath, defaultTexts);
    if (!level) {
        return texts;
    }

    const filteredTexts = texts.filter((text) => {
        return text.level === level;
    });
    return filteredTexts;
}

function readOneText(id: string): Text | undefined {
    const texts = parse(jsonDbPath, defaultTexts);
    return texts.find((text) => text.id.toString() === id);
}

function createOneText(newText: NewText): Text {
    const texts = parse(jsonDbPath, defaultTexts);
    const text: Text = {
        id: uuidv4(),
        ...newText,
    };
    texts.push(text);
    serialize(jsonDbPath, texts);
    return text;
}

function deleteText(id: string): void {
    const texts = parse(jsonDbPath, defaultTexts);
    const filteredTexts = texts.filter((text) => text.id.toString() !== id);
    serialize(jsonDbPath, filteredTexts);
}

function updateText(id: string, newText: NewText): Text | undefined {
    const texts = parse(jsonDbPath, defaultTexts);
    const textIndex = texts.findIndex((text) => text.id.toString() === id);
    if (textIndex < 0) {
        return;
    }
    const updatedText: Text = {
        id: uuidv4(),
        ...newText,
    };
    texts[textIndex] = updatedText;
    serialize(jsonDbPath, texts);
    return updatedText;
}

export {
    searchText,
    readOneText,
    createOneText,
    deleteText,
    updateText
};

