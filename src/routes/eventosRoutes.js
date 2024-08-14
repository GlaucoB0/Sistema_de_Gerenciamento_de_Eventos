import { Router } from "express";
import {
  getAllEventos,
  postEvento,
} from "../controllers/EventosController.js";

const router = Router();

router.get("/agenda", getAllEventos);
router.post("/criar", postEvento);

export default router;
