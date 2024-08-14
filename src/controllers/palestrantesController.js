import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPalestrantes = (req, res) => {
  const checkSql = /*sql*/ `SELECT * FROM palestrantes`;

  conn.query(checkSql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar palestrantes" });
      return console.log(err);
    }

    if (data.length == 0) {
      res.status(404).json({ message: "Nenhum palestrante cadastrado" });
    }
    
    res.status(200).json(data);
  });
};

export const postPalestrante = (req, res) => {
  const { nome, expertise } = req.body;

  //validacoes
  if (!nome) {
    res.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!expertise) {
    res.status(400).json({ message: "O expertise é obrigatório" });
    return;
  }

  const checkNomeExistsSql = /*sql*/ `
        SELECT * FROM palestrantes
        WHERE ?? = ?
    `;
  const checkNomeExistsData = ["nome", nome];

  conn.query(checkNomeExistsSql, checkNomeExistsData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os palestrantes" });
      return console.log(err);
    }

    if (data.length > 0) {
      res
        .status(409)
        .json({ message: "palestrante já existe no banco de dados" });
      return console.log(err);
    }
  });

  const palestrante_id = uuidv4();
  const insertSql = /*sql*/ `
    INSERT INTO palestrantes
    ( ??, ??)
    VALUES
    ( ?, ?)
    `;
  const insertSqlData = [

    "nome",
    "expertise",

    nome,
    expertise,
  ];

  conn.query(insertSql, insertSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao cadastrar palestrante" });
      return console.log(err);
    }

    res.status(201).json({ message: "palestrante cadastrado" });
  });
};

export const getPalestrante = (req, res) => {
  const { palestrante_id } = req.params;

  const checkSql = /*sql*/ `
        SELECT * FROM palestrantes
        WHERE ?? = ?
    `;
  const checkData = ["palestrante_id", palestrante_id];

  conn.query(checkSql, checkData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar palestrante" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: "palestrante não encontrado" });
      return;
    }

    res.status(200).json(data);
  });
};

export const putPalestrante = (req, res) => {
  const { palestrante_id } = req.params;
  const { nome, expertise } = req.body;

  if (!nome) {
    res.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!expertise) {
    res.status(400).json({ message: "O expertise é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
    SELECT * FROM palestrantes 
    WHERE ?? = ?
    `;
  const checkData = ["palestrante_id", palestrante_id];

  conn.query(checkSql, checkData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar palestrante" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ message: "palestrante não encontrado" });
      return
    }

    const updateSql = /*sql*/ `UPDATE palestrantes SET
        ?? = ?, ?? = ?
        WHERE ?? = ?
        `;
    const updateData = [
      "nome",
      nome,
      "expertise",
      expertise,
      "palestrante_id",
      palestrante_id
    ];

    conn.query(updateSql, updateData, (err) => {
      if (err) {
        res.status(500).json({ message: "Erro ao atualizar palestrante" });
        return;
      }

      res.status(200).json({ message: "palestrante atualizado" });
    });
  });
};

export const deletePalestrante = (req, res) => {
  const { palestrante_id } = req.params;

  const deleteSql = /*sql*/ `
    DELETE FROM palestrantes WHERE ?? = ?`;
  const deleteData = ["palestrante_id", palestrante_id];

  conn.query(deleteSql, deleteData, (err, info) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar palestrante" });
      return;
    }
    if (info.affectedRows === 0) {
      res.status(404).json({ message: "palestrante não encontrado" });
      return;
    }

    res.status(200).json({ message: "palestrante deletado" });
  });
};
