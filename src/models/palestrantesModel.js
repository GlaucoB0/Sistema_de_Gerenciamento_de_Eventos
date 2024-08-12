import conn from '../config/conn.js'

const tablePalestrante = /*sql*/`
    CREATE TABLE IF NOT EXISTS palestrantes(
        palestrante_id varchar(60) primary key,
        nome varchar(60) not null,
        expertise varchar(255) not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tablePalestrante, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[palestrantes] table created`)
})