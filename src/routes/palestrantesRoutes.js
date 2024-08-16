import { Router } from "express";
import {
  deletePalestrante,
  getAllPalestrantes,
  getPalestrante,
  postPalestrante,
  putPalestrante,
  getPalestranteMaisAtivo
} from "../controllers/palestrantesController.js";

const router = Router();

router.get("/palestrante-mais-ativo", getPalestranteMaisAtivo);
router.get("/", getAllPalestrantes);
router.get("/:palestrante_id", getPalestrante);
router.post("/", postPalestrante);

router.put("/:palestrante_id", putPalestrante);
router.delete("/:palestrante_id", deletePalestrante);

export default router;
