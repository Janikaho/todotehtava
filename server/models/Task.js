import { pool } from '../helpers/db.js'


const insertTask=async(description)=>{
    return await pool.query('insert into task (description) values ($1) returning *', [description])
}
const selectAllTasks = async () => {
 return await pool.query('SELECT * FROM task')
}
export { selectAllTasks,insertTask }