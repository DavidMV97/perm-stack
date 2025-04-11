import pkg from 'pg';
import db from './config.js';



const { Pool } = pkg;


const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    database: db.database,
    ssl: {
        rejectUnauthorized: false,
    },
})

export default pool; 

