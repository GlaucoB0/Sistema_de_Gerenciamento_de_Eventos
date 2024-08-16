import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const postParticipante = (req, res) => {
  const { nome, email } = req.body;

  //validacoes
  if (!nome) {
    res.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!email) {
    res.status(400).json({ message: "O email é obrigatório" });
    return;
  }

  const checkEmailExistsSql = /*sql*/ `
        SELECT * FROM participantes
        WHERE ?? = ?
    `;
  const checkEmailExistsData = ["email", email];

  conn.query(checkEmailExistsSql, checkEmailExistsData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os participantes" });
      return console.log(err);
    }

    if (data.length > 0) {
      res
        .status(409)
        .json({ message: "participante já existe no banco de dados" });
      return console.log(err);
    }
  });

  const insertSql = /*sql*/ `
    INSERT INTO participantes
    ( ??, ??)
    VALUES
    ( ?, ?)
    `;
  const insertSqlData = ["nome", "email", nome, email];

  conn.query(insertSql, insertSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao cadastrar participante" });
      return console.log(err);
    }

    res.status(201).json({ message: "participante cadastrado" });
  });
};

export const inscreverParticipante = (req, res) => {
  const { participante_Id, evento_Id } = req.body;

  // { "participanteId": 2, "eventoId": 1 }

  // Validacoes
  if (!participante_Id) {
    res.status(400).json({ message: "O participante_Id é obrigatório" });
    return;
  }
  if (!evento_Id) {
    res.status(400).json({ message: "O evento_Id é obrigatório" });
    return;
  }

  const checkEmailExistsSql = /*sql*/ `
        SELECT * FROM inscritos
        WHERE ?? = ? AND ?? = ?
    `;
  const checkEmailExistsData = ["evento_Id", evento_Id, "participante_Id", participante_Id];

  conn.query(checkEmailExistsSql, checkEmailExistsData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao inscrever o participante" });
      return console.log(err);
    }

    if (data.length > 0) {
      res
        .status(409)
        .json({ message: "inscrição já existe no banco de dados" });
      return console.log(err);
    }
  });

  const insertSql = /*sql*/ `
    INSERT INTO inscritos
    ( ??, ??)
    VALUES
    ( ?, ?)
    `;
  const insertSqlData = ["participante_Id", "evento_Id", participante_Id, evento_Id];

  conn.query(insertSql, insertSqlData, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao inscrever participante" });
      return console.log(err);
    }

    res.status(201).json({ message: "participante inscrito" });
  });
};

export const getMaisPopular = (req, res) => {
    const sql = /*sql*/ `
    select count(participante_Id) as "Inscrições", eventoId from inscricao group by evento_Id
    `

    conn.query(sql, (err, data)=>{
        if(err){
            res.status(500).json({message: "Erro ao verificar inscrições"})
            return console.log(err)
        }

         res.status(200).json(data)
    })
}

