import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getAllEventos = (req, res) => {
  res.status(500).json({
    error: "Serviço indisponivel no momento, tente novamente mais tarde!",
  });
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

export const feedbackEvento = (req, res) => {
  const { participante_Id, evento_Id, nota, comentario } = req.body;
  // { "participante_Id": 2, "eventoId": 1, "nota": 5, "comentario": "Excelente evento!" }

  // Validações
  if (!evento_Id) {
    res.status(400).json({ message: "O evento_Id é obrigatório" });
    return;
  }
  if (!nota) {
    res.status(400).json({ message: "O nota é obrigatório" });
    return;
  }
  if (!comentario) {
    res.status(400).json({ message: "O comentario é obrigatório" });
    return;
  }
  if (!participante_Id) {
    res.status(400).json({ message: "O participante_Id é obrigatório" });
    return;
  }
  if(nota > 5){
    res.status(400).json({ message: "A nota tem que ser menor que 5" });
    return;
  }
  const feedback_Id = uuidv4();

  const insertSql = /*sql*/ `
    INSERT INTO feedback
    (??, ??, ??, ??, ??)
    VALUES
    (?, ?, ?, ?, ?)
    `;
  const insertSqlData = [
    "feedback_Id",
    "evento_Id",
    "comentario",
    "nota",
    "participante_Id",
    feedback_Id,
    evento_Id,
    comentario,
    nota,
    participante_Id,
  ];

  conn.query(insertSql, insertSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao cadastrar feedback" });
      return console.log(err);
    }
    res.status(201).json({ message: "feedback cadastrado" });
  });
};

export const postEvento = (req, res) => {
  const { titulo, data, palestrantes_Id } = req.body;

  // Validacoes
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
        WHERE ?? = ?
    `;
  const checkNomeExistsData = ["titulo", titulo];

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

  const insertSql = /*sql*/ `
    INSERT INTO eventos
    ( ??, ??, ??)
    VALUES
    (?, ?, ?)
    `;
  const insertSqlData = [
    "titulo",
    "data",
    "palestrantes_Id",
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

export const editarEvento = (req, res) => {
  const { titulo, dataEvento, palestrantes_Id } = req.body;
  const id = req.params;

  if (!titulo) {
    res.status(400).json({ message: "O titulo é obrigatório" });
    return;
  }
  if (!dataEvento) {
    res.status(400).json({ message: "O data é obrigatório" });
    return;
  }
  if (!palestrantes_Id) {
    res.status(400).json({ message: "O palestrantes_Id é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
    SELECT * FROM eventos 
    WHERE ?? = ?
    `;
  const checkData = ["evento_Id", id];

  conn.query(checkSql, checkData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar eventos" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ message: "evento não encontrado" });
      return;
    }

    const updateSql = /*sql*/ `UPDATE eventos SET
        ?? = ?, ?? = ?
        WHERE ?? = ?
        `;
    const updateData = [
      "titulo",
      titulo,
      "data",
      dataEvento,
      "palestrantes_Id",
      palestrantes_Id,
    ];

    conn.query(updateSql, updateData, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro ao atualizar evento" });
        return;
      }

      res.status(200).json({ message: "evento atualizado" });
    });
  });
};

export const deleteEvento = (req, res) => {
  const { evento_Id } = req.body;

  const deleteFeedbacksSql = /*sql*/ `
    DELETE FROM eventos WHERE ?? = ?`;
  const deleteFeedbacksData = ["evento_Id", evento_Id];

  conn.query(deleteFeedbacksSql, deleteFeedbacksData, (err, info) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar feedbacks" });
      return;
    }
  });

  const deleteSql = /*sql*/ `
    DELETE FROM eventos WHERE ?? = ?`;
  const deleteData = ["evento_Id", evento_Id];

  conn.query(deleteSql, deleteData, (err, info) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar evento" });
      return;
    }
    if (info.affectedRows === 0) {
      res.status(404).json({ message: "evento não encontrado" });
      return;
    }

    res.status(200).json({ message: "evento e comentarios deletados" });
  });
};
