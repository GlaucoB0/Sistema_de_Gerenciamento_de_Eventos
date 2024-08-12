import conn from '../config/conn.js'

const tableParticipante = /*sql*/`
    CREATE TABLE IF NOT EXISTS participantes(
        participante_id varchar(60) primary key,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableParticipante, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[participantes] table created`)
})