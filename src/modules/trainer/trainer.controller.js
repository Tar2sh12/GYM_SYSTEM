import exp from 'constants';
import fs from 'fs';
//add member
export const addTrainer =(req,res,next)=>{
    const TrainerList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json'));
        TrainerList.push(req.body);
        fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json',JSON.stringify(TrainerList))
        res.json({message:TrainerList});
};

//get all
export const getAllTrainers=(req,res,next)=>{
    const TrainerList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json'));
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    let result=[]
    TrainerList.forEach(t=>{
        t = Object.assign(t,  {members:memberList.filter((e)=>{
            return t.id==e.trainerId;
       })});
       result.push(t)
    })
    res.json({message:result})
}


//put update
export const updateTrainer=(req,res,next)=>{
    const TrainerList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json'));
    let listOfKeys=Object.keys(req.body);
    let id=listOfKeys.findIndex(e=>{
        return e=='id'
    });
    if(id==-1){
        res.json({msg:"please enter id"});
    }
    else{
        let index = TrainerList.findIndex((t)=>t.id==req.body['id']);
        if(index==-1){
            res.json({message:"not found"});
        }
        listOfKeys.forEach((trainKey,i) => {
            if(i!=id){
                if(trainKey=="membership"){
                    let keysOfMembership=Object.keys(req.body["membership"]);
                    keysOfMembership.forEach(e=>{
                        TrainerList[index][trainKey][e]=req.body[trainKey][e];
                    })
                }
                else{
                    TrainerList[index][trainKey]=req.body[trainKey];
                }
            }
        });
        fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json',JSON.stringify(TrainerList))
        res.json({msg:TrainerList});
    }
}


//delete 
export const deleteTrainer=(req,res,next)=>{
    const TrainerList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json'));
    let trainerId=req.body.id;
    let index = TrainerList.findIndex((t)=>t.id==trainerId);
    if(index==-1){
        res.json({msg:"doesn't found"});
    }
    TrainerList.splice(index,1);
    fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json',JSON.stringify(TrainerList))
    res.json({msg:TrainerList});
}

//get specific
export const getspecificTrainer=(req,res,next)=>{
    const TrainerList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json'));
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    let trainerId=req.body.id;
    let index = TrainerList.findIndex((t)=>t.id==trainerId);
    if(index==-1){
        res.json({msg:"doesn't found"});
    }
    let result=[]
    TrainerList[index] = Object.assign(TrainerList[index],  {members:memberList.filter((e)=>{
            return trainerId==e.trainerId;
       })});
       result.push(TrainerList[index])
    res.json({message:result})
}
