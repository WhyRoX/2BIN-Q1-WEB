import { Router } from 'express';
import { Text, NewText } from '../types';
import {
    createOneText,
    deleteText,
    readOneText,
    searchText,
    updateText,
} from '../services/texts';

const router = Router();



router.get("/", (req, res) => {
    const level = req.query["level"] as string;
    const texts = searchText(level);
    return res.json(texts);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const text = readOneText(id);
    if (!text) {
        return res.sendStatus(404);
    }
    return res.json(text);
});

router.post("/", (req, res) => {
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("content" in body) ||
        !("level" in body) ||
        typeof body.content !== "string" ||
        typeof body.level !== "string" ||
        !body.content.trim() ||
        !body.level.trim()
    ) {
        return res.sendStatus(400);
    }
    const { content, level } = body as NewText;
    const newText = createOneText({ content, level });
    return res.json(newText);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    deleteText(id);
    return res.sendStatus(204);
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("content" in body) ||
        !("level" in body) ||
        typeof body.content !== "string" ||
        typeof body.level !== "string" ||
        !body.content.trim() ||
        !body.level.trim()
    ) {
        return res.sendStatus(400);
    }
    const { content, level } = body as Text;
    const updatedText = updateText(id, { content, level });
    if (!updatedText) {
        return res.sendStatus(404);
    }
    return res.json(updatedText);
});

export default router;
