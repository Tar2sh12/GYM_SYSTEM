//express 
import express, { json } from 'express';
const app = express();
import memberRouter from './src/modules/member/member.routes.js'
import trainerRouter from './src/modules/trainer/trainer.routes.js'
import statsRouter from './src/modules/Statistics/statistics.routes.js'
app.use(json())
app.use('/member',memberRouter)
app.use('/trainer',trainerRouter)
app.use('/stat',statsRouter)
app.listen(3004,()=>{
    console.log('runing on port 3004');
})



