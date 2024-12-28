import path from 'node:path';
import { Comment } from '../types';
import { parse, serialize } from '../utils/json';
import { readOneFilm } from './films';
const jsonDbPath = path.join(__dirname, '/../data/comments.json');

// Read all comments and filter then by filmId if provided 
const readAll = (filmId: number | undefined = undefined): Comment[] => {
    const comments = parse<Comment>(jsonDbPath);
  
    return filmId
      ? comments.filter((comment) => comment.filmId === filmId)
      : comments;
};


// Create a new comment
const createOne = (comment: Comment) => {
    const comments = parse<Comment>(jsonDbPath);

    const theFilm = readOneFilm(comment.filmId);
    if (!theFilm) {
        throw new Error(`Film with ID ${comment.filmId} not found`);
    }

    // check if user has already commented on this film
    const existingComment = comments.find(
        (c) => c.filmId === comment.filmId && c.username === comment.username
    );

    if (existingComment) {
        throw new Error(`User ${comment.username} has already commented on this film`);
    }

    comments.push(comment);
    serialize(jsonDbPath, comments);
};

// Delete a comment
const deleteOne = (filmId: number, username: string) => {
    const comments = parse<Comment>(jsonDbPath);

    const index = comments.findIndex(
        (comment) => comment.filmId === filmId && comment.username === username
    );

    if (index === -1) {
        throw new Error(`Comment not found for film ID ${filmId} and user ${username}`);
    }

    const deletedComment = comments.splice(index, 1);
    serialize(jsonDbPath, comments);

    return deletedComment[0];
};


export { readAll, createOne, deleteOne };