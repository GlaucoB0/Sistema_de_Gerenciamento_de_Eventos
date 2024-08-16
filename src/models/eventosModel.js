import conn from "../config/conn.js";

const tableEvento = /*sql*/ `
    CREATE TABLE IF NOT EXISTS eventos(
        evento_Id int auto_increment primary key,
        titulo varchar(250) not null, 
        data date not null, 
        palestrantes_Id varchar(255),
        feedbacks_Id text(16380),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(tableEvento, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`[eventos] table created`);
});
