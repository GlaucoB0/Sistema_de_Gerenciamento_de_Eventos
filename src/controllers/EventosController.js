import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getAllEventos = (req, res) => {
    res.status(500).json({error: "Serviço indisponivel no momento, tente novamente mais tarde!"})
//   const checkSql = /*sql*/ `SELECT * FROM eventos`;

//   conn.query(checkSql, (err, dataEventos) => {
//     if (err) {
//       res.status(500).json({ message: "Erro ao buscar eventos" });
//       return console.log(err);
//     }

//     if (dataEventos.length == 0) {
//       res.status(404).json({ message: "Nenhum evento cadastrado" });
//       return;
//     }
//     const infoPalestrante = [];
//     const AllEventos = []
//     dataEventos.map((evento) => {
//       evento.palestrantes_Id.split(",").map((id) => {
//         const checkSql = /*sql*/ `SELECT nome, expertise FROM palestrantes where palestrante_id = "${id}"`;

//         conn.query(checkSql, (err, dataPalestrantes) => {
//           if (err) {
//             res.status(500).json({ message: "Erro ao buscar palestrantes" });
//             return console.log(err);
//           }

//           if (dataPalestrantes.length == 0) {
//             console.log("palestrante", id, "não existe");
//             return;
//           }
//           infoPalestrante.push(dataPalestrantes[0]);
//        
//         });
//         const body = {
//             titulo: evento.titulo,
//             data: evento.data,
//             palestrantes: infoPalestrante,
//           };
//           console.log(infoPalestrante)
//       });
//     });
//   });
};

export const postEvento = (req, res) => {
  const { titulo, data, palestrantes_Id } = req.body;

  //validacoes
  if (!titulo) {
    res.status(400).json({ message: "O titulo é obrigatório" });
    return;
  }
  if (!data) {
    res.status(400).json({ message: "O data é obrigatório" });
    return;
  }
  if (!palestrantes_Id) {
    res.status(400).json({ message: "O palestrantes_Id é obrigatório" });
    return;
  }

  const checkNomeExistsSql = /*sql*/ `
        SELECT * FROM eventos
        WHERE ?? = ? AND ?? = ?
    `;
  const checkNomeExistsData = ["titulo", titulo, "data", data];

  conn.query(checkNomeExistsSql, checkNomeExistsData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os eventos" });
      return console.log(err);
    }

    if (data.length > 0) {
      res.status(409).json({ message: "evento já existe no banco de dados" });
      return console.log(err);
    }
  });

  const evento_id = uuidv4();
  const insertSql = /*sql*/ `
    INSERT INTO eventos
    (??, ??, ??, ??)
    VALUES
    (?, ?, ?, ?)
    `;
  const insertSqlData = [
    "evento_id",
    "titulo",
    "data",
    "palestrantes_Id",
    evento_id,
    titulo,
    data,
    palestrantes_Id,
  ];

  conn.query(insertSql, insertSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao cadastrar evento" });
      return console.log(err);
    }

    res.status(201).json({ message: "evento cadastrado" });
  });
};