import fs from 'fs';
export const getAllrevenues=(req,res,next)=>{
    res.json({msg:JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/revenues.model.json'))})
}

export const revenueOfTrainer=(req,res,next)=>{
    const TrainerList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json'));
    let trainerId=req.body.id;
    let index = TrainerList.findIndex((t)=>t.id==trainerId);
    if(index==-1){
        res.json({msg:"doesn't found"});
    }
    let result =0;
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    memberList.forEach(e => {
        if(e['trainerId']==trainerId){
            result=result+e['membership']['cost'];
        }
    });
    res.json({msg:result})
}