import conn from "../config/conn.js";

const tableFeedback = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscritos(
        incricao_Id int auto_increment primary key,
        evento_Id int not null,
        participante_Id int not null,
        FOREIGN KEY (evento_Id) REFERENCES eventos(evento_Id),
        FOREIGN KEY (participante_Id) REFERENCES participantes(participante_Id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

conn.query(tableFeedback, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`[inscritos] table created`);
});
