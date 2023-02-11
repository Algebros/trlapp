import Express from "express";
import * as RowService from "./row.service";
import authMiddleware from "../../middleware/authMiddleware";

const router = Express.Router();

router.post("/createRow", authMiddleware, async (req, res, next) => {
  try {
    const result = await RowService.createRow(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/rows", authMiddleware, async (req, res, next) => {
  try {
    const data = await RowService.getAllRows(req.body);
    res.json({data});
  } catch (error) {
    next(error);
  }
});

router.patch("/", authMiddleware, async (req, res, next) => {
  try {
    const updColumn = await RowService.update(req.body);
    res.json(updColumn);
  } catch (error) {
    next(error);
  }
});

router.delete("/", authMiddleware, async (req, res, next) => {
  try {
    const column = await RowService.remove(req.body);
    res.json(column);
  } catch (error) {
    next(error);
  }
});

export default router;