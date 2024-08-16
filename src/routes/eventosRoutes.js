import { Router } from "express";
import {
  getAllEventos,
  postEvento,
  feedbackEvento,
  editarEvento,
  deleteEvento
} from "../controllers/EventosController.js";

const router = Router();

router.get("/agenda", getAllEventos);
router.post("/criar", postEvento);
router.post("/editar/:id", editarEvento);
router.delete("/cancelar", deleteEvento);
router.post("/feedback", feedbackEvento);

export default router;
