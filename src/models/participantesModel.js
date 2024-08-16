import conn from "../config/conn.js";

const tableParticipante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS participantes(
        participante_Id int auto_increment primary key,
        nome varchar(250) not null,
        email varchar(250) not null,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(tableParticipante, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`[participantes] table created`);
});
