import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import router from './routes/task.routes.js';



const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)

app.use((err, req, res, next) => {
    return res.json({
        message:  err.message
    })
})

app.listen(5000);
console.log('Server on port', 5000);
