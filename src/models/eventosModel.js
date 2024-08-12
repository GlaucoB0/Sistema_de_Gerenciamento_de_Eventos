import conn from '../config/conn.js'

const tableEvento = /*sql*/`
    CREATE TABLE IF NOT EXISTS eventos(
        evento_id varchar(60) primary key,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableEvento, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[eventos] table created`)
})