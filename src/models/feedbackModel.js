import conn from '../config/conn.js'

// ESTRUTURA
// { "participante_Id": 2, "evento_Id": 1, "nota": 5, "comentario": "Excelente evento!" }

const tableFeedback = /*sql*/`
    CREATE TABLE IF NOT EXISTS feedback(
        feedback_Id varchar(60) primary key,
        evento_Id int not null,
        participante_Id int not null,
        nota int not null,
        comentario varchar(255),
        FOREIGN KEY (evento_Id) REFERENCES eventos(evento_Id),
        FOREIGN KEY (participante_Id) REFERENCES participantes(participante_Id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`

conn.query(tableFeedback, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[feedback] table created`)
})