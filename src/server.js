// Importação de dependencias
import "dotenv/config";
import express from "express";
import cors from "cors";

// Importação das rotas
import palestrantesRoutes from "./routes/palestrantesRoutes.js"
import eventosRoutes from "./routes/eventosRoutes.js"

// Porta da aplicação
const PORT = process.env.PORT;

// Inicialização do express
const app = express();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Criação das Tabelas
import "./models/palestrantesModel.js"
import "./models/participantesModel.js"
import "./models/eventosModel.js"


// Utilização das Rotas
app.use("/eventos/palestrantes", palestrantesRoutes)
app.use("/eventos", eventosRoutes)


// Rota não encontrada
app.use((request, response) => {
  response.status(404).json({ message: "Recurso não encontrado" });
});

// Conexão com a porta PORT do .env
app.listen(PORT, () => {
  console.log(`Servidor on PORT ${PORT}`);
});
