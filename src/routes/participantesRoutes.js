import { Router } from "express";
import {
  postParticipante,
  inscreverParticipante,
  getMaisPopular
} from "../controllers/participantesController.js";

const router = Router();

router.post("/registrar", postParticipante);
router.post("/inscrever", inscreverParticipante);
router.post("/mais-popular", getMaisPopular);

export default router;
