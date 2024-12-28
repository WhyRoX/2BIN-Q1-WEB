import { Router } from "express";
import { Comment } from "../types";
import { readAll, createOne, deleteOne } from "../services/comments";
import { authorize } from "../utils/auths";
const router = Router();

router.get("/", (req, res) => {
  const filmId = req.query["filmId"] as string;
  const comments = readAll(filmId ? Number(filmId) : undefined);
  return res.json(comments);
});

router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("comment" in body) ||
    !("filmId" in body) ||
    typeof body.comment !== "string" ||
    typeof body.filmId !== "number" ||
    !Number.isInteger(body.filmId) ||
    body.filmId <= 0 ||
    !body.comment.trim() ||
    !("user" in req) ||
    typeof req.user !== "object" ||
    !req.user ||
    !("username" in req.user) ||
    typeof req.user.username !== "string"
  ) {
    return res.sendStatus(400);
  }

  const containsOnlyExpectedKeys = (
    obj: object,
    expectedKeys: string[]
  ): boolean => {
    return Object.keys(obj).every((key) => expectedKeys.includes(key));
  };

  const expectedKeys = ["comment", "filmId"];
  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const newComment: Comment = {
    filmId: body.filmId,
    username: req.user.username,
    comment: body.comment,
  };

  try {
    createOne(newComment);
    return res.send(newComment);
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.sendStatus(500);
    }

    if (error.message === "Not found") {
      return res.sendStatus(404);
    }

    if (error.message === "Conflict") {
      return res.sendStatus(409);
    }

    return res.sendStatus(500);
  }
});

router.delete("/films/:filmsId", authorize, (req, res) => {
    const filmId = Number(req.params.filmsId);
    if (
        isNaN(filmId) ||
        filmId <= 0 ||
        !("user" in req) ||
        typeof req.user !== "object" ||
        !req.user ||
        !("username" in req.user) ||
        typeof req.user.username !== "string"
      ) {
        return res.sendStatus(400);
      }

    const username = req.user.username;
    
    try {
        deleteOne(filmId, username);
        return res.sendStatus(204);
    } catch (error) {
        if (!(error instanceof Error)) {
        return res.sendStatus(500);
        }
    
        if (error.message === "Not found") {
        return res.sendStatus(404);
        }
    
        return res.sendStatus(500);
    }
});

export default router;